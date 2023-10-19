import React, { useState } from 'react';
import './SummarizePage.css';
const api_base = "http://localhost:3001/api/summarize";

function SummarizePage() {
  const [inputText, setInputText] = useState('');
  const [summary, setSummary] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(api_base + '/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      });
      console.log(response)

      if (response.ok) {
        const data = await response.json();
        setSummary(data.summary);
      } else {
        console.error('Error summarizing text:', response.status);
      }
    } catch (error) {
      console.error('Error summarizing text:', error);
    }
  };

  return (
    <div className="SummarizeWhole">
      <h1 className="SummarizeTitle">Text Summarizer</h1>
      <p className="SummarizeParagraph">Enter the text you want to summarize:</p>
      <textarea
        className="SummarizeText"
        rows={10}
        cols={50}
        value={inputText}
        onChange={handleInputChange}
        placeholder="Enter your text here..."
      />
      <br />
      <button className="SummarizeButton" onClick={handleSubmit}>
        Summarize
      </button>
      {summary && (
          <div className="Summary">
            <h2>Summary:</h2>
          </div>
        )}
      <div className='SummaryBox'>
        {summary && (
          <div className="Summary">
            <p>{summary}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SummarizePage;
