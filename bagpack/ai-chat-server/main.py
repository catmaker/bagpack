import os
import logging
import asyncio
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
import torch

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

# AI 모델 로드 (더 작은 문법 교정 모델)
MODEL_NAME = "vennify/t5-base-grammar-correction"
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model = AutoModelForSeq2SeqLM.from_pretrained(MODEL_NAME).to(device)

logger.info(f"Model loaded on {device}")

class Query(BaseModel):
    message: str

async def process_correction(text: str) -> str:
    try:
        inputs = tokenizer(f"grammar: {text}", return_tensors="pt", truncation=True, max_length=512).to(device)
        outputs = model.generate(**inputs, max_length=512, num_beams=4, early_stopping=True)
        corrected = tokenizer.decode(outputs[0], skip_special_tokens=True)
        return corrected
    except Exception as e:
        logger.error(f"Error in process_correction: {str(e)}")
        return text  # 오류 발생 시 원본 텍스트 반환

@app.post("/ai-chat")
async def ai_chat(query: Query):
    try:
        corrected = await process_correction(query.message)
        has_errors = query.message.lower().strip() != corrected.lower().strip()
        
        return {
            "original": query.message,
            "correction": corrected,
            "has_errors": has_errors
        }
    except Exception as e:
        logger.error(f"Error processing request: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.get("/health")
async def health_check():
    try:
        # 간단한 모델 테스트
        test_input = "This is test sentence."
        corrected = await process_correction(test_input)
        return {"status": "healthy", "model": "operational"}
    except Exception as e:
        logger.error(f"Health check failed: {str(e)}")
        return {"status": "unhealthy", "error": str(e)}

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 10000))
    uvicorn.run(app, host="0.0.0.0", port=port)