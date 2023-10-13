const express = require('express');
const textrank = require('textrank');
const app = express();
const port = 3001;

// Middleware to parse JSON data
app.use(express.json());

// TextRank summarization endpoint
app.post('/summarize', (req, res) => {
  const text = req.body.text; // Get the text from the request
  const summarizer = new textrank.TextRank();
  summarizer.load(text);
  const summary = summarizer.summarize(3); // You can adjust the number of sentences in the summary
  res.json({ summary });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});