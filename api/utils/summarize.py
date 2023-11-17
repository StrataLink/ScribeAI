from transformers import BartTokenizer, BartForConditionalGeneration
import language_tool_python
import logging
import sys

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")

def summarize_text(text, model, tokenizer, max_length=200, min_length=50, length_penalty=2.0, num_beams=4):
    inputs = tokenizer([text], max_length=1024, return_tensors='pt', truncation=True)

    summary_ids = model.generate(inputs['input_ids'], max_length=max_length, min_length=min_length, length_penalty=length_penalty, num_beams=num_beams, early_stopping=True)

    summary = tokenizer.decode(summary_ids[0], skip_special_tokens=True)
    return summary

def correct_grammar(text):
    with language_tool_python.LanguageToolPublicAPI('en-US') as tool:
        matches = tool.check(text)
        corrected_text = language_tool_python.utils.correct(text, matches)
    return corrected_text

def main(input_text):
    model_name = 'facebook/bart-large-cnn'
    tokenizer = BartTokenizer.from_pretrained(model_name)
    model = BartForConditionalGeneration.from_pretrained(model_name)

    try:
        summary = summarize_text(input_text, model, tokenizer)
        print(summary)
    except Exception as e:
        logging.error(f'An error occurred during summarization: {e}')

if __name__ == "__main__":
    input_text = sys.argv[1]
    main(input_text)
