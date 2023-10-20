const express = require('express');
const { PythonShell } = require('python-shell');

const router = express.Router();

router.post('/summarize', (req, res) => {
    const text = req.body.text; // Get the text from the request

    // Create a PythonShell instance to run the Python script
    const pythonShell = new PythonShell('Summarize.py', {
        scriptPath: '', // Set your script path
        args: [text], // Pass the text as an argument
    });

    pythonShell.on('message', (message) => {
        // Handle the message sent by the Python script (the summary)
        res.json({ summary: message });
    });

    pythonShell.end((err) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'An error occurred' });
        }
    });
});

module.exports = router;
