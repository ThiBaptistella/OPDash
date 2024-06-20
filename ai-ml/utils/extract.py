import json
import spacy
import os
import fitz  # PyMuPDF

# Load the trained NER model
model_path = os.path.join(os.path.dirname(__file__), '../models/invoice_ner_model')

print(f"Loading model from: {model_path}")

try:
    nlp = spacy.load(model_path)
    print("Model loaded successfully.")
except Exception as e:
    print(f"Error loading model: {e}")
    raise

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
        print(f"{ent.label_}: {ent.text}")  # Debug line to see the entities being recognized
        if ent.label_ == "INVOICE_ID":
            extracted_data["receiptId"] = ent.text
        elif ent.label_ == "TOTAL_AMOUNT":
            extracted_data["balance"] = ent.text
        elif ent.label_ == "DUE_DATE":
            extracted_data["dueDate"] = ent.text
        elif ent.label_ == "INVOICE_DATE":
            extracted_data["issueDate"] = ent.text
        elif ent.label_ == "ACCOUNT_NAME":
            extracted_data["accountName"] = ent.text
        elif ent.label_ == "ACCOUNT_CITY":
            extracted_data["accountCity"] = ent.text
        elif ent.label_ == "PAYMENT_DATE":
            extracted_data["paymentDate"] = ent.text
        elif ent.label_ == "TAX":
            extracted_data["tax"] = ent.text

    return extracted_data

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
        print(f"Text extracted from PDF:\n{text}")
    except Exception as e:
        print(f"Error reading PDF file: {e}")
        sys.exit(1)
    
    print("Extracting data from text...")
    doc = nlp(text)
    data = extract_data(doc)
    print(json.dumps(data))
