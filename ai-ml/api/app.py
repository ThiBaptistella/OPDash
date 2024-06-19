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

model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    print(f"Received data: {data}")
    
    text = data['text']
    
    cleaned_text = clean_text(text)
    
    seq = tokenizer.texts_to_sequences([cleaned_text])
    padded_seq = tf.keras.preprocessing.sequence.pad_sequences(seq, maxlen=100)
    
    prediction = model.predict(padded_seq)[0][0]
    
    extracted_data = extract_data(text)
    return jsonify({"prediction": float(prediction), "extracted_data": extracted_data})

def clean_text(text):
    text = re.sub(r'\s+', ' ', text)
    text = re.sub(r'\n+', ' ', text)
    return text

def extract_data(text):
    receipt_id = re.search(r'Receipt[ \t]*ID[ \t]*:[ \t]*(#[0-9]+)', text)
    issue_date = re.search(r'Issue[ \t]*Date[ \t]*:[ \t]*([0-9./-]+)', text)
    account_name = re.search(r'Account[ \t]*Name[ \t]*:[ \t]*([a-zA-Z ]+)', text)
    account_city = re.search(r'Account[ \t]*City[ \t]*:[ \t]*([a-zA-Z ]+)', text)
    payment_date = re.search(r'Payment[ \t]*Date[ \t]*:[ \t]*([0-9./-]+)', text)
    subtotal = re.search(r'Subtotal[ \t]*:[ \t]*\$?([0-9.,]+)', text)
    total_aud = re.search(r'TOTAL[ \t]*AUD[ \t]*:[ \t]*([0-9.,]+)', text)
    amount_due = re.search(r'Amount[ \t]*Due[ \t]*:[ \t]*([0-9.,]+)', text)
    due_date = re.search(r'Due[ \t]*Date[ \t]*:[ \t]*([0-9./-]+)', text)
    tax = re.search(r'Tax[ \t]*:[ \t]*([0-9.,]+)', text)
    balance = re.search(r'Balance[ \t]*:[ \t]*([0-9.,]+)', text)

    data = {
        "receiptId": receipt_id.group(1) if receipt_id else "N/A",
        "issueDate": issue_date.group(1) if issue_date else "N/A",
        "accountName": account_name.group(1) if account_name else "N/A",
        "accountCity": account_city.group(1) if account_city else "N/A",
        "paymentDate": payment_date.group(1) if payment_date else "N/A",
        "dueDate": due_date.group(1) if due_date else "N/A",
        "tax": tax.group(1) if tax else "N/A",
        "balance": balance.group(1) if balance else "N/A",
        "status": "Pending"
    }
    return data

if __name__ == '__main__':
    app.run(debug=True, port=5001)
