from transformers import T5ForConditionalGeneration, T5Tokenizer
import sys
import language_tool_python

# Check if the required text argument is provided
if len(sys.argv) < 2:
    print("Please provide the text to summarize as a command-line argument.")
    sys.exit(1)

# Get the text from the command-line argument
text = sys.argv[1]

# Initialize the T5 model and tokenizer (using "t5-base" for a larger model)
model_name = "t5-base"
tokenizer = T5Tokenizer.from_pretrained(model_name)
model = T5ForConditionalGeneration.from_pretrained(model_name)

# Tokenize and summarize the text
max_length = 200  # Increase max_length for a more detailed summary
min_length = 75   # Adjust min_length to control the minimum length
length_penalty = 3.0
num_beams = 4

inputs = tokenizer.encode("summarize: " + text, return_tensors="pt", max_length=1000, truncation=True)
summary_ids = model.generate(inputs, max_length=max_length, min_length=min_length, length_penalty=length_penalty, num_beams=num_beams, early_stopping=False)

# Decode the summarized text
summary = tokenizer.decode(summary_ids[0], skip_special_tokens=True)

# Grammar check using language_tool_python
tool = language_tool_python.LanguageTool('en-US')
matches = tool.check(summary)

# Correct grammar errors and get the corrected text
summary_with_corrections = language_tool_python.utils.correct(summary, matches)

# Print the summary with corrected grammar
print(summary_with_corrections)
