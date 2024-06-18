import joblib
import re

# Load the trained model
model = joblib.load('../models/invoice_model.pkl')

def extract_data(text):
    # Use the trained model to extract data
    label = model.predict([text])[0]
    
    # Extract specific fields based on the label
    if label == "invoice":
        receipt_id = re.search(r'Receipt ID: (#[0-9]+)', text).group(1)
        issue_date = re.search(r'Issue Date: ([0-9.]+)', text).group(1)
        account_name = re.search(r'Account Name: ([a-zA-Z ]+)', text).group(1)
        subtotal = re.search(r'subtotal: ([0-9.]+)', text).group(1)
        total_aud = re.search(r'Total AUD: ([0-9.]+)', text).group(1)

        return {
            "receiptId": receipt_id,
            "issueDate": issue_date,
            "accountName": account_name,
            "subtotal": subtotal,
            'totalAud': total_aud
            # Add more fields as necessary
        }

if __name__ == "__main__":
    import sys
    file_path = sys.argv[1]
    with open(file_path, 'r') as file:
        text = file.read()
    
    data = extract_data(text)
    print(json.dumps(data))
