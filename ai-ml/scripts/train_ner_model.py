import random
import spacy
from spacy.training import Example
from spacy.util import minibatch, compounding
import json

# Load annotated data
with open("../utils/annotated_invoices.json", "r") as f:
    TRAIN_DATA = json.load(f)

# Load a blank English model
nlp = spacy.blank("en")

# Create the NER component and add it to the pipeline
ner = nlp.add_pipe("ner", last=True)

# Add the labels to the NER component
for data in TRAIN_DATA:
    for ent in data["entities"]:
        ner.add_label(ent[2])

# Start training
nlp.begin_training()

# Training loop
for itn in range(20):
    random.shuffle(TRAIN_DATA)
    losses = {}
    batches = minibatch(TRAIN_DATA, size=compounding(4.0, 32.0, 1.001))
    for batch in batches:
        for data in batch:
            text = data["text"]
            annotations = {"entities": data["entities"]}
            examples = [Example.from_dict(nlp.make_doc(text), annotations)]
            nlp.update(examples, drop=0.5, losses=losses)
    print(f"Losses at iteration {itn}: {losses}")

# Save the model
nlp.to_disk("../models/invoice_ner_model")
