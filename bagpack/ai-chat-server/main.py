from fastapi import FastAPI
from pydantic import BaseModel
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

app = FastAPI()

# AI 모델 로드
tokenizer = AutoTokenizer.from_pretrained("google/flan-t5-base")
model = AutoModelForSeq2SeqLM.from_pretrained("google/flan-t5-base")

class Query(BaseModel):
    message: str

@app.post("/ai-chat")
async def ai_chat(query: Query):
    input_text = query.message

    # 문법 교정
    correction_prompt = f"Correct the grammar: {input_text}"
    correction_input = tokenizer(correction_prompt, return_tensors="pt")
    correction_output = model.generate(**correction_input, max_length=100)
    correction = tokenizer.decode(correction_output[0], skip_special_tokens=True)

    # 오류 확인
    has_errors = input_text.lower().strip() != correction.lower().strip()

    # 대화 응답 생성
    conversation_prompt = f"Respond to this message: {input_text}"
    conversation_input = tokenizer(conversation_prompt, return_tensors="pt")
    conversation_output = model.generate(**conversation_input, max_length=100)
    response = tokenizer.decode(conversation_output[0], skip_special_tokens=True)

    return {
        "original": input_text,
        "correction": correction,
        "has_errors": has_errors,
        "response": response
    }