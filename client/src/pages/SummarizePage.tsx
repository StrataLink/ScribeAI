import React, { useState } from 'react';
import './SummarizePage.css';
import axios from 'axios'; // Import Axios

function SummarizePage() {
  const [inputText, setInputText] = useState('');
  const [summary, setSummary] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };
  

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/summarize', { text: inputText });
      setSummary(response.data.summary);
    } catch (error) {
      console.error('Error summarizing text:', error);
    }
  };

  return (
    <div className="SummarizeWhole">
      <h1 className='SummarizeTitle'>Text Summarizer</h1>
      <p className='SummarizeParagraph'>Enter the text you want to summarize:</p>
      <textarea
        className='SummarizeText'
        rows={10}
        cols={50}
        value={inputText}
        onChange={handleInputChange}
        placeholder="Enter your text here..."
      />
      <br />
      <button className='SummarizeButton' onClick={handleSubmit}>Summarize</button>
      {summary && (
        <div className="Summary">
          <h2>Summary:</h2>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
}

export default SummarizePage;
