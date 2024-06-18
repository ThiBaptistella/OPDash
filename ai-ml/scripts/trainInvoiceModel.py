import json
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import make_pipeline
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report

# Sample data
data = [
    {"text": "Receipt ID: #123456\nIssue Date: 10.12.2020\nAccount Name: Sample Account", "label": "invoice"},
    {"text": "Receipt ID: #123457\nIssue Date: 11.12.2020\nAccount Name: Another Account", "label": "invoice"},
    # Add more samples
]

# Extract texts and labels
texts = [item["text"] for item in data]
labels = [item["label"] for item in data]

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(texts, labels, test_size=0.2, random_state=42)

# Create a pipeline with a vectorizer and classifier
pipeline = make_pipeline(CountVectorizer(), LogisticRegression())

# Train the model
pipeline.fit(X_train, y_train)

# Evaluate the model
predictions = pipeline.predict(X_test)
print(classification_report(y_test, predictions))

# Save the model
import joblib
joblib.dump(pipeline, '../models/invoice_model.pkl')
