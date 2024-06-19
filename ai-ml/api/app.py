# ai-ml/api/app.py

from flask import Flask, request, jsonify
import tensorflow as tf
import joblib
import re
import os

app = Flask(__name__)

# Load the trained model and tokenizer
model_path = os.path.join(os.path.dirname(__file__), '../models/invoice_model.h5')
tokenizer_path = os.path.join(os.path.dirname(__file__), '../models/tokenizer.pkl')

print(f"Loading model from: {model_path}")
print(f"Loading tokenizer from: {tokenizer_path}")

try:
    model = tf.keras.models.load_model(model_path)
    tokenizer = joblib.load(tokenizer_path)
    print("Model and tokenizer loaded successfully.")
except Exception as e:
    print(f"Error loading model or tokenizer: {e}")
    raise

# Recompile the model to suppress the warning
model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

def clean_text(text):
    print("Cleaning text...")
    # Remove unnecessary spaces and newlines
    text = re.sub(r'\s+', ' ', text)
    text = re.sub(r'\n+', ' ', text)
    print("Text cleaned.")
    return text

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    print(f"Received data: {data}")
    
    cleaned_text = clean_text(data['text'])
    
    # Tokenize and pad the text
    seq = tokenizer.texts_to_sequences([cleaned_text])
    padded_seq = tf.keras.preprocessing.sequence.pad_sequences(seq, maxlen=100)
    
    # Predict using the trained model
    prediction = model.predict(padded_seq)[0][0]
    print(f"Prediction: {prediction}")
    
    return jsonify({"prediction": float(prediction)})

if __name__ == '__main__':
    app.run(debug=True, port=5001)
