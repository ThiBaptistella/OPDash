import re

def clean_text(text):
    # Remove unnecessary spaces and newlines
    text = re.sub(r'\s+', ' ', text)
    text = re.sub(r'\n+', ' ', text)
    return text

def preprocess_text(file_path):
    # Read text from file
    with open(file_path, 'r') as file:
        text = file.read()
    
    # Clean the text
    cleaned_text = clean_text(text)
    
    return cleaned_text

if __name__ == "__main__":
    import sys
    file_path = sys.argv[1]
    cleaned_text = preprocess_text(file_path)
    print(cleaned_text)
