from flask import Flask, request, jsonify
import spacy
import re
import os

app = Flask(__name__)

# Load the trained NER model
model_path = os.path.join(os.path.dirname(__file__), '../models/invoice_ner_model')

print(f"Loading model from: {model_path}")

try:
    nlp = spacy.load(model_path)
    print("Model loaded successfully.")
except Exception as e:
    print(f"Error loading model: {e}")
    raise

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    print(f"Received data: {data}")

    text = data['text']

    doc = nlp(text)
    extracted_data = extract_data(doc)
    return jsonify({"extracted_data": extracted_data})

def extract_data(doc):
    extracted_data = {
        "receiptId": "N/A",
        "issueDate": "N/A",
        "accountName": "N/A",
        "accountCity": "N/A",
        "paymentDate": "N/A",
        "dueDate": "N/A",
        "tax": "N/A",
        "balance": "N/A",
        "status": "Pending"
    }

    for ent in doc.ents:
        if ent.label_ == "INVOICE_ID":
            extracted_data["receiptId"] = ent.text
        elif ent.label_ == "TOTAL_AMOUNT":
            extracted_data["balance"] = ent.text
        elif ent.label_ == "DUE_DATE":
            extracted_data["dueDate"] = ent.text

    return extracted_data

if __name__ == '__main__':
    app.run(debug=True, port=5001)
