# ai-ml/scripts/train_ner_model.py

import random
import spacy
from spacy.training import Example
from spacy.util import minibatch, compounding


# Define your training data
TRAIN_DATA = [
    ("Glanbia Performance Nutrition Pty Ltd", {"entities": [(0, 33, "SUPPLIER")]}),
    ("Invoice Number INV-676903", {"entities": [(15, 24, "INVOICE_NUMBER")]}),
    ("Reference BEL-057 EliteSupps Belmont", {"entities": [(10, 16, "REFERENCE_NUMBER")]}),
    ("Issue Date 05/06/2024", {"entities": [(11, 21, "DATE_ORDERED")]}),
    ("Due Date 21/07/2024", {"entities": [(9, 19, "DUE_DATE")]}),
    ("45 Days", {"entities": [(0, 7, "DAYS_TO_PAY")]}),
    ("Amount 2,703.56", {"entities": [(7, 15, "AMOUNT")]}),
    ("GST 245.78", {"entities": [(4, 10, "GST")]}),
    # Add more annotated examples here
    ("Glanbia Performance Nutrition Pty Limited", {"entities": [(0, 38, "SUPPLIER")]}),
    ("Tax Invoice No. 992088957", {"entities": [(15, 24, "INVOICE_NUMBER")]}),
    ("Tax Invoice Date 16.02.2024", {"entities": [(17, 27, "DATE_ORDERED")]}),
    ("Due Date 30.03.2024", {"entities": [(9, 19, "DUE_DATE")]}),
    ("Total Inc. GST $46.22", {"entities": [(15, 21, "AMOUNT")]}),
    ("GST Goods $4.20", {"entities": [(10, 15, "GST")]}),
    ("Global Nutrition Australia Pty Ltd", {"entities": [(0, 33, "SUPPLIER")]}),
    ("Invoice 139365", {"entities": [(8, 14, "INVOICE_NUMBER")]}),
    ("Document Date 6/05/2024", {"entities": [(14, 24, "DATE_ORDERED")]}),
    ("Due Date 5/07/2024", {"entities": [(9, 19, "DUE_DATE")]}),
    ("Balance Due 2,268.23", {"entities": [(12, 20, "AMOUNT")]}),
    ("GST 245.78", {"entities": [(4, 10, "GST")]}),
    # Add more examples from other invoices provided
]



# Load a blank English model
nlp = spacy.blank("en")

# Create the NER component and add it to the pipeline
ner = nlp.create_pipe("ner")
nlp.add_pipe("ner")

# Add the labels to the NER component
for _, annotations in TRAIN_DATA:
    for ent in annotations.get("entities"):
        ner.add_label(ent[2])

# Start training
nlp.begin_training()

# Training loop
for itn in range(100):
    random.shuffle(TRAIN_DATA)
    losses = {}
    batches = minibatch(TRAIN_DATA, size=compounding(4.0, 32.0, 1.001))
    for batch in batches:
        texts, annotations = zip(*batch)
        examples = [Example.from_dict(nlp.make_doc(text), ann) for text, ann in zip(texts, annotations)]
        nlp.update(examples, drop=0.5, losses=losses)
    print(f"Losses at iteration {itn}: {losses}")

# Save the model
nlp.to_disk("../models/invoice_ner_model")
