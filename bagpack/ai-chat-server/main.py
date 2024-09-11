import os
import logging
import asyncio
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

# 로깅 설정
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 타임아웃 미들웨어
@app.middleware("http")
async def timeout_middleware(request: Request, call_next):
    try:
        return await asyncio.wait_for(call_next(request), timeout=60.0)
    except asyncio.TimeoutError:
        raise HTTPException(status_code=504, detail="Request timeout")

# 요청 로깅 미들웨어
@app.middleware("http")
async def log_requests(request: Request, call_next):
    logger.info(f"Received {request.method} request to {request.url}")
    response = await call_next(request)
    return response

# AI 모델 로드
try:
    tokenizer = AutoTokenizer.from_pretrained("google/flan-t5-base")
    model = AutoModelForSeq2SeqLM.from_pretrained("google/flan-t5-base")
    logger.info("AI model loaded successfully")
except Exception as e:
    logger.error(f"Error loading AI model: {str(e)}")
    raise

class Query(BaseModel):
    message: str

@app.get("/")
async def root():
    return {"message": "Welcome to the AI Chat API"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.post("/ai-chat")
async def ai_chat(query: Query):
    try:
        input_text = query.message
        logger.info(f"Processing input: {input_text}")

        # 비동기로 AI 모델 처리
        correction = await asyncio.to_thread(process_correction, input_text)
        response = await asyncio.to_thread(process_response, input_text)

        logger.info("Request processed successfully")
        return {
            "original": input_text,
            "correction": correction,
            "has_errors": input_text.lower().strip() != correction.lower().strip(),
            "response": response
        }
    except Exception as e:
        logger.error(f"Error processing request: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

def process_correction(text):
    correction_prompt = f"Correct the grammar: {text}"
    correction_input = tokenizer(correction_prompt, return_tensors="pt")
    correction_output = model.generate(**correction_input, max_length=100)
    return tokenizer.decode(correction_output[0], skip_special_tokens=True)

def process_response(text):
    conversation_prompt = f"Respond to this message: {text}"
    conversation_input = tokenizer(conversation_prompt, return_tensors="pt")
    conversation_output = model.generate(**conversation_input, max_length=100)
    return tokenizer.decode(conversation_output[0], skip_special_tokens=True)

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled exception: {str(exc)}")
    return JSONResponse(status_code=500, content={"detail": "Internal server error"})

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 10000))
    uvicorn.run(app, host="0.0.0.0", port=port)