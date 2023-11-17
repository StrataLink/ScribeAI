const { PythonShell } = require('python-shell');
const express = require("express");

const router = express.Router();

router.post('/summarize', (req, res) => {
  let options = {
    mode: 'text',
    pythonOptions: ['-u'], 
    scriptPath: '../utils',
    args: [req.body.text]
  };

  PythonShell.run('summarize.py', options, function (err, results) {
    if (err) {
      res.status(500).send('Error during summarization');
    } else {
      res.send({ summarizedText: results[0] });
    }
  });
});

module.exports = router;