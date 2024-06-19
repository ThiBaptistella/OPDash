# ai-ml/utils/extract.py

import json
import re
import tensorflow as tf
import joblib
import os
import fitz  # PyMuPDF

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

def extract_data(text):
    print("Extracting data from text...")
    # Clean the text
    cleaned_text = clean_text(text)
    
    # Tokenize and pad the text
    print("Tokenizing and padding text...")
    seq = tokenizer.texts_to_sequences([cleaned_text])
    padded_seq = tf.keras.preprocessing.sequence.pad_sequences(seq, maxlen=100)
    print(f"Tokenized and padded sequence: {padded_seq}")
    
    # Predict using the trained model
    print("Predicting using the model...")
    prediction = model.predict(padded_seq)[0][0]
    print(f"Prediction: {prediction}")
    
    if prediction > 0.5:
        # Extract specific fields if it is predicted to be an invoice
        print("Extracting fields from invoice text...")
        receipt_id = re.search(r'Receipt[ \t]*ID[ \t]*:[ \t]*(#[0-9]+)', text)
        issue_date = re.search(r'Issue[ \t]*Date[ \t]*:[ \t]*([0-9./-]+)', text)
        account_name = re.search(r'Account[ \t]*Name[ \t]*:[ \t]*([a-zA-Z ]+)', text)
        account_city = re.search(r'Account[ \t]*City[ \t]*:[ \t]*([a-zA-Z ]+)', text)
        payment_date = re.search(r'Payment[ \t]*Date[ \t]*:[ \t]*([0-9./-]+)', text)
        due_date = re.search(r'Due[ \t]*Date[ \t]*:[ \t]*([0-9./-]+)', text)
        tax = re.search(r'Tax[ \t]*:[ \t]*([0-9.%]+)', text)
        balance = re.search(r'Balance[ \t]*:[ \t]*\$?([0-9.,]+)', text)

        data = {
            "receiptId": receipt_id.group(1) if receipt_id else "N/A",
            "issueDate": issue_date.group(1) if issue_date else "N/A",
            "accountName": account_name.group(1) if account_name else "N/A",
            "accountCity": account_city.group(1) if account_city else "N/A",
            "paymentDate": payment_date.group(1) if payment_date else "N/A",
            "dueDate": due_date.group(1) if due_date else "N/A",
            "tax": tax.group(1) if tax else "N/A",
            "balance": balance.group(1) if balance else "N/A",
            "status": "Pending"  # Default status
        }
    else:
        data = {
            "receiptId": "N/A",
            "issueDate": "N/A",
            "accountName": "N/A",
            "accountCity": "N/A",
            "paymentDate": "N/A",
            "dueDate": "N/A",
            "tax": "N/A",
            "balance": "N/A",
            "status": "Not an Invoice"
        }

    print(f"Extracted data: {data}")
    return data

if __name__ == "__main__":
    import sys
    file_path = sys.argv[1]
    print(f"Reading file at: {file_path}")
    
    # Extract text from the PDF file
    try:
        doc = fitz.open(file_path)
        text = ""
        for page in doc:
            text += page.get_text()
        print("Text extracted from PDF.")
    except Exception as e:
        print(f"Error reading PDF file: {e}")
        sys.exit(1)
    
    print("Extracting data from text...")
    data = extract_data(text)
    print(json.dumps(data))
