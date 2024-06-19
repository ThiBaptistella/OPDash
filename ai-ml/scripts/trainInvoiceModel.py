# ai-ml/trainInvoiceModel.py

import json
import tensorflow as tf
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report
import joblib
import numpy as np

# Improved sample data with more diverse examples
data = [
    {"text": "Receipt ID: #123456\nIssue Date: 10.12.2020\nAccount Name: Sample Account", "label": "invoice"},
    {"text": "Receipt ID: #123457\nIssue Date: 11.12.2020\nAccount Name: Another Account", "label": "invoice"},
    {"text": "Invoice Number: 05534\nInvoice Date: 5 June 2024\nOrder Number: 05534\nOrder Date: 5 June 2024\nOrder Reference: BEL-060", "label": "invoice"},
    {"text": "Invoice Date: 10 Jun 2024\nInvoice Number: INV-03119\nReference: #MAN-170\nSubtotal: 2,055.40\nTOTAL GST 10%: 205.54\nTOTAL AUD: 2,260.94", "label": "invoice"},
    {"text": "Invoice Date: 10 Jun 2024", "label": "invoice"},
    {"text": "Reference: #MAN-170", "label": "invoice"},
    {"text": "Invoice Number: INV-03119", "label": "invoice"},
    {"text": "TOTAL AUD: 2,260.94", "label": "invoice"},
    {"text": "Amount Due: 2,260.94", "label": "invoice"},
    {"text": "Due Date: 10 Jul 2024", "label": "invoice"},
    {"text": "Order Number: 05534", "label": "invoice"},
    {"text": "Order Reference: BEL-060", "label": "invoice"},
    {"text": "Total Boxes: 17", "label": "invoice"},
    {"text": "Subtotal: $535.50", "label": "invoice"},
    {"text": "GST: $53.55", "label": "invoice"},
    {"text": "Total: $589.05", "label": "invoice"},
    # Add more realistic non-invoice samples
    {"text": "This is a random text that does not contain any invoice information.", "label": "non-invoice"},
    {"text": "Another random text that should be classified as non-invoice.", "label": "non-invoice"},
    {"text": "Meeting minutes from the last conference call.", "label": "non-invoice"},
    {"text": "Notes from the client meeting on 2021-12-01.", "label": "non-invoice"},
    {"text": "Email correspondence regarding project status.", "label": "non-invoice"},
    {"text": "Team outing photos and event details.", "label": "non-invoice"},
]

# Extract texts and labels
texts = [item["text"] for item in data]
labels = [item["label"] for item in data]

# Encode labels
label_map = {"invoice": 1, "non-invoice": 0}
y = np.array([label_map[label] for label in labels])

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(texts, y, test_size=0.2, random_state=42)

# Tokenize the texts
tokenizer = tf.keras.preprocessing.text.Tokenizer()
tokenizer.fit_on_texts(X_train)
X_train_seq = tokenizer.texts_to_sequences(X_train)
X_test_seq = tokenizer.texts_to_sequences(X_test)

# Pad sequences
maxlen = 100
X_train_pad = tf.keras.preprocessing.sequence.pad_sequences(X_train_seq, maxlen=maxlen)
X_test_pad = tf.keras.preprocessing.sequence.pad_sequences(X_test_seq, maxlen=maxlen)

# Build the model
model = tf.keras.Sequential([
    tf.keras.layers.Embedding(input_dim=len(tokenizer.word_index) + 1, output_dim=128, input_length=maxlen),
    tf.keras.layers.GlobalAveragePooling1D(),
    tf.keras.layers.Dense(128, activation='relu'),
    tf.keras.layers.Dense(1, activation='sigmoid')
])

model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

# Train the model
model.fit(X_train_pad, y_train, epochs=10, validation_data=(X_test_pad, y_test))

# Evaluate the model
loss, accuracy = model.evaluate(X_test_pad, y_test)
print(f'Test Accuracy: {accuracy:.4f}')

# Save the model
model.save('../models/invoice_model.h5')
joblib.dump(tokenizer, '../models/tokenizer.pkl')

# Print classification report
y_pred = (model.predict(X_test_pad) > 0.5).astype("int32")
print(classification_report(y_test, y_pred))
