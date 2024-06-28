import spacy
import fitz  # PyMuPDF
import os
import sys
import json

# Load the NER model
model_path = os.path.join(os.path.dirname(__file__), '../models/invoice_ner_model')
nlp = spacy.load(model_path)

def clean_text(text):
    text = text.replace('\n', ' ').replace('\r', '')
    return text

def extract_data(text):
    doc = nlp(text)
    entities = {ent.label_: ent.text for ent in doc.ents}

        # Ensure balance is returned as a number or None
    balance_str = entities.get("AMOUNT", None)
    balance = float(balance_str.replace(",", "")) if balance_str else 0.0

    extracted_data = {
        "receiptId": entities.get("INVOICE_NUMBER", "N/A"),
        "issueDate": entities.get("DATE_ORDERED", "N/A"),
        "accountName": entities.get("SUPPLIER", "N/A"),
        "accountCity": "N/A",  # Assuming accountCity is not in the training data
        "paymentDate": "N/A",  # Assuming paymentDate is not in the training data
        "dueDate": entities.get("DUE_DATE", "N/A"),
        "tax": entities.get("GST", "N/A"),
        "balance": balance,
        "status": "Pending"
    }
    

    return extracted_data

if __name__ == "__main__":
    file_path = sys.argv[1]

    # Extract text from the PDF file
    try:
        doc = fitz.open(file_path)
        text = ""
        for page in doc:
            text += page.get_text()
    except Exception as e:
        print(f"Error reading PDF file: {e}")
        sys.exit(1)
    
    cleaned_text = clean_text(text)
    extracted_data = extract_data(cleaned_text)
    
    # Print JSON directly to ensure it's the only output
    print(json.dumps(extracted_data))
