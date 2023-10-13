import React, { useState } from 'react';
import './SummarizePage.css';

function SummarizePage() {
  const [inputText, setInputText] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  const handleSubmit = () => {
    // You can handle the text input here, e.g., send it to the server for summarization
    // For now, we'll just display the input text
    alert(`Entered Text: ${inputText}`);
  };

  return (
    <div className="SummarizeWhole">
      <h1 className='SummarizeTitle'>Text Summarizer</h1>
      <p className='SummarizeParagraph'>Enter the text you want to summarize:</p>
      <textarea className='SummarizeText'
        rows={10}
        cols={50}
        value={inputText}
        onChange={handleInputChange}
        placeholder="Enter your text here..."
      />
      <br />
      <button className='SummarizeButton' onClick={handleSubmit}>Summarize</button>
    </div>
  );
}

export default SummarizePage;
