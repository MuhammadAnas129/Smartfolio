const express = require('express');
const bodyParser = require('body-parser');
const { PythonShell } = require('python-shell');

const app = express();
app.use(bodyParser.json());

const PORT = 3000;

// Endpoint to train the model
app.post('/train', (req, res) => {
    PythonShell.run('train_model.py', null, function (err, result) {
        if (err) res.status(500).send(err);
        res.send('Model trained successfully');
    });
});

// Endpoint to predict skills based on industry name
app.post('/predict', (req, res) => {
    const industryName = req.body.industryName;
    const options = {
        args: [industryName]
    };

    PythonShell.run('predict_skills.py', options, function (err, result) {
        if (err) res.status(500).send(err);
        res.json({ skills: result });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
