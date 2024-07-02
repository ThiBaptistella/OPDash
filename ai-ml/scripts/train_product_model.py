import os
import json
import spacy
from spacy.training import Example
from spacy.util import minibatch, compounding
import random

# Get the absolute path to the JSON file
current_dir = os.path.dirname(__file__)
json_file_path = os.path.join(current_dir, '../utils/annotated_products.json')

# Load annotated data
with open(json_file_path, "r") as f:
    TRAIN_DATA = json.load(f)

# Print the structure of TRAIN_DATA for debugging
print("Loaded TRAIN_DATA:", TRAIN_DATA)

# Function to correct the structure of TRAIN_DATA
def correct_train_data_structure(data):
    corrected_data = []
    for item in data:
        if isinstance(item, list) and len(item) == 2:
            text, annotations = item
            entities = annotations.get("entities", [])
            corrected_entities = [(ent[0], ent[1], ent[2]) if isinstance(ent, list) else (ent['start'], ent['end'], ent['label']) for ent in entities]
            corrected_data.append((text, {"entities": corrected_entities}))
        elif isinstance(item, dict) and 'text' in item and 'entities' in item:
            text = item['text']
            entities = item['entities']
            corrected_entities = [(ent['start'], ent['end'], ent['label']) for ent in entities]
            corrected_data.append((text, {"entities": corrected_entities}))
    return corrected_data

# Correct the structure of TRAIN_DATA
TRAIN_DATA = correct_train_data_structure(TRAIN_DATA)

# Print the corrected structure of TRAIN_DATA for debugging
print("Corrected TRAIN_DATA:", TRAIN_DATA)

# Function to remove overlapping entities
def remove_overlapping_entities(data):
    non_overlapping_data = []
    for text, annotations in data:
        entities = annotations["entities"]
        entities = sorted(entities, key=lambda x: x[0])  # Sort entities by start position
        non_overlapping_entities = []
        prev_end = -1
        for start, end, label in entities:
            if start >= prev_end:
                non_overlapping_entities.append((start, end, label))
                prev_end = end
        non_overlapping_data.append((text, {"entities": non_overlapping_entities}))
    return non_overlapping_data

# Remove overlapping entities
TRAIN_DATA = remove_overlapping_entities(TRAIN_DATA)

# Load a blank English model
nlp = spacy.blank("en")

# Create the NER component and add it to the pipeline
ner = nlp.add_pipe("ner", last=True)

# Add the labels to the NER component
for text, annotations in TRAIN_DATA:
    for ent in annotations.get("entities"):
        ner.add_label(ent[2])

# Start training
optimizer = nlp.begin_training()

# Training loop
for itn in range(100):
    random.shuffle(TRAIN_DATA)
    losses = {}
    batches = minibatch(TRAIN_DATA, size=compounding(4.0, 32.0, 1.001))
    for batch in batches:
        texts, annotations = zip(*batch)
        examples = [Example.from_dict(nlp.make_doc(text), ann) for text, ann in zip(texts, annotations)]
        nlp.update(examples, drop=0.5, losses=losses, sgd=optimizer)
    print(f"Losses at iteration {itn}: {losses}")

# Ensure the directory exists before saving the model
model_dir = os.path.join(current_dir, "../models/product_ner_model")
os.makedirs(model_dir, exist_ok=True)

# Save the model
nlp.to_disk(model_dir)
