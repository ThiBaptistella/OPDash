# ai-ml/scripts/train_ner_model.py

import spacy
from spacy.training import Example
import random

# Define your training data
TRAIN_DATA = [
    ("Elite Supps Belmont (F)", {"entities": [(0, 21, "SUPPLIER")]}),
    ("Invoice Number INV-676903", {"entities": [(15, 24, "INVOICE_NUMBER")]}),
    ("Reference BEL-057 EliteSupps Belmont", {"entities": [(10, 16, "REFERENCE_NUMBER")]}),
    ("Issue Date 05/06/2024", {"entities": [(11, 21, "DATE_ORDERED")]}),
    ("Due Date 21/07/2024", {"entities": [(9, 19, "DUE_DATE")]}),
    ("45 Days", {"entities": [(0, 7, "DAYS_TO_PAY")]}),
    ("Amount 2,703.56", {"entities": [(7, 15, "AMOUNT")]}),
    ("GST 245.78", {"entities": [(4, 10, "GST")]}),
    # Add more annotated examples here
]

# Load a blank English model
nlp = spacy.blank("en")

# Create the NER component and add it to the pipeline
ner = nlp.add_pipe("ner", last=True)

# Add labels to the NER component
for _, annotations in TRAIN_DATA:
    for ent in annotations.get("entities"):
        ner.add_label(ent[2])

# Disable other pipelines to only train NER
other_pipes = [pipe for pipe in nlp.pipe_names if pipe != "ner"]
with nlp.disable_pipes(*other_pipes):  # Only train NER
    optimizer = nlp.begin_training()
    for i in range(20):
        random.shuffle(TRAIN_DATA)
        losses = {}
        for text, annotations in TRAIN_DATA:
            doc = nlp.make_doc(text)
            example = Example.from_dict(doc, annotations)
            nlp.update([example], drop=0.5, losses=losses)
        print(f"Losses at iteration {i}: {losses}")

# Save the trained model
nlp.to_disk("../models/invoice_ner_model")

print("Model training completed and saved.")
