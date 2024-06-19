# ai-ml/utils/extract.py
import json
import re
import tensorflow as tf
import joblib
import os
import fitz 

# Load the trained model and tokenizer
model_path = os.path.join(os.path.dirname(__file__), '../models/invoice_model.h5')
tokenizer_path = os.path.join(os.path.dirname(__file__), '../models/tokenizer.pkl')

print(f"Loading model from: {model_path}")
print(f"Loading tokenizer from: {tokenizer_path}")

try:
    model = tf.keras.models.load_model(model_path)
    model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])  # Ensure model is compiled
    tokenizer = joblib.load(tokenizer_path)
    print("Model and tokenizer loaded successfully.")
except Exception as e:
    print(f"Error loading model or tokenizer: {e}")
    raise

def clean_text(text):
    print("Cleaning text...")
    text = re.sub(r'\s+', ' ', text)
    text = re.sub(r'\n+', ' ', text)
    print("Text cleaned.")
    return text

def extract_data(text):
    print("Extracting data from text...")
    cleaned_text = clean_text(text)
    seq = tokenizer.texts_to_sequences([cleaned_text])
    padded_seq = tf.keras.preprocessing.sequence.pad_sequences(seq, maxlen=100)
    print(f"Tokenized and padded sequence: {padded_seq}")
    prediction = model.predict(padded_seq)[0][0]
    print(f"Prediction: {prediction}")
    
    if prediction > 0.5:
        print("Extracting fields from invoice text...")
        receipt_id = re.search(r'Receipt ID: (#[0-9]+)', text)
        issue_date = re.search(r'Issue Date: ([0-9.]+)', text)
        account_name = re.search(r'Account Name: ([a-zA-Z ]+)', text)
        subtotal = re.search(r'Subtotal: \$([0-9.]+)', text)
        total_aud = re.search(r'TOTAL AUD: ([0-9.,]+)', text)
        amount_due = re.search(r'Amount Due: ([0-9.,]+)', text)
        due_date = re.search(r'Due Date: ([0-9.]+)', text)
        
        data = {
            "receiptId": receipt_id.group(1) if receipt_id else "N/A",
            "issueDate": issue_date.group(1) if issue_date else "N/A",
            "accountName": account_name.group(1) if account_name else "N/A",
            "subtotal": subtotal.group(1) if subtotal else "N/A",
            "totalAud": total_aud.group(1) if total_aud else "N/A",
            "amountDue": amount_due.group(1) if amount_due else "N/A",
            "dueDate": due_date.group(1) if due_date else "N/A",
            "status": "Pending"  # Default status
        }
    else:
        data = {
            "receiptId": "N/A",
            "issueDate": "N/A",
            "accountName": "N/A",
            "subtotal": "N/A",
            "totalAud": "N/A",
            "amountDue": "N/A",
            "dueDate": "N/A",
            "status": "Not an Invoice"
        }

    print(f"Extracted data: {data}")
    return data

if __name__ == "__main__":
    import sys
    file_path = sys.argv[1]
    print(f"Reading file at: {file_path}")
    
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
