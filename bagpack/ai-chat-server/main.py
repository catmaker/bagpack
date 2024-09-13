from flask import Flask, request, jsonify
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.model_selection import train_test_split
import numpy as np
import joblib
import os
import logging

app = Flask(__name__)

# 로깅 설정
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# 카테고리 정의
categories = ['업무', '개인', '운동', '학습', '여가']

# 모델 및 벡터라이저 초기화
vectorizer = CountVectorizer()
model = MultinomialNB()

# 데이터 로드 및 전처리 함수
def load_data():
    texts = []
    labels = []
    with open('training_data.txt', 'r', encoding='utf-8') as f:
        for line in f:
            text, label = line.strip().split('\t')
            texts.append(text)
            labels.append(categories.index(label))
    logging.info(f"Loaded {len(texts)} training examples")
    return texts, labels

# 모델 학습 함수
def train_model():
    texts, labels = load_data()
    X = vectorizer.fit_transform(texts)
    X_train, X_test, y_train, y_test = train_test_split(X, labels, test_size=0.2, random_state=42)
    model.fit(X_train, y_train)
    accuracy = model.score(X_test, y_test)
    logging.info(f"Model trained. Accuracy: {accuracy:.2f}")
    
    # 모델 저장
    joblib.dump(vectorizer, 'vectorizer.joblib')
    joblib.dump(model, 'model.joblib')
    logging.info("Model and vectorizer saved")

# 예측 함수
def predict(text):
    X = vectorizer.transform([text])
    prediction = model.predict(X)[0]
    probabilities = model.predict_proba(X)[0]
    confidence = probabilities[prediction]
    return categories[prediction], confidence

# 모델 로드 (있는 경우)
if os.path.exists('model.joblib') and os.path.exists('vectorizer.joblib'):
    vectorizer = joblib.load('vectorizer.joblib')
    model = joblib.load('model.joblib')
    logging.info("Existing model and vectorizer loaded")
else:
    logging.info("No existing model found. Training new model.")
    train_model()

@app.route('/classify', methods=['POST'])
def classify_activity():
    data = request.json
    if isinstance(data, list):
        # 여러 항목 처리
        results = []
        for item in data:
            text = item['text']
            category, confidence = predict(text)
            results.append({
                'text': text,
                'predicted_category': category,
                'confidence': float(confidence)
            })
        logging.info(f"Classified {len(results)} items")
        return jsonify(results)
    elif isinstance(data, dict):
        # 단일 항목 처리
        text = data['text']
        category, confidence = predict(text)
        logging.info(f"Classified '{text}' as '{category}' with confidence {confidence:.2f}")
        return jsonify({
            'text': text,
            'predicted_category': category,
            'confidence': float(confidence)
        })
    else:
        return jsonify({'error': 'Invalid input format'}), 400

@app.route('/feedback', methods=['POST'])
def feedback():
    data = request.json
    if isinstance(data, list):
        # 여러 항목 처리
        logging.info(f"Received feedback for {len(data)} items")
        for item in data:
            text = item['text']
            correct_category = item['category']
            with open('training_data.txt', 'a', encoding='utf-8') as f:
                f.write(f"{text}\t{correct_category}\n")
            logging.info(f"Added feedback: '{text}' - '{correct_category}'")
    else:
        # 단일 항목 처리
        text = data['text']
        correct_category = data['category']
        with open('training_data.txt', 'a', encoding='utf-8') as f:
            f.write(f"{text}\t{correct_category}\n")
        logging.info(f"Added feedback: '{text}' - '{correct_category}'")
    
    # 모델 재학습
    logging.info("Retraining model with new data")
    train_model()
    
    return jsonify({'message': 'Feedback received and model retrained'})
@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy'}), 200

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)