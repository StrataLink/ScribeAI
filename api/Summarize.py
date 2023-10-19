import sys
from transformers import T5ForConditionalGeneration, T5Tokenizer

# Check if the required text argument is provided
if len(sys.argv) < 2:
    print("Please provide the text to summarize as a command-line argument.")
    sys.exit(1)

# Get the text from the command-line argument
text = sys.argv[1]

# Initialize the T5 model and tokenizer
model_name = "t5-small"  # You can choose a different T5 model here
tokenizer = T5Tokenizer.from_pretrained(model_name)
model = T5ForConditionalGeneration.from_pretrained(model_name)

# Tokenize and summarize the text
inputs = tokenizer.encode("summarize: " + text, return_tensors="pt", max_length=1024, truncation=True)
summary_ids = model.generate(inputs, max_length=150, min_length=40, length_penalty=2.0, num_beams=4, early_stopping=True)

# Decode the summarized text
summary = tokenizer.decode(summary_ids[0], skip_special_tokens=True)

# Print the summary to the standard output
print(summary)