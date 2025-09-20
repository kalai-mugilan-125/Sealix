const express = require('express');
const router = express.Router();
const { spawn } = require('child_process');
const auth = require('../../middleware/auth');

router.post('/detect-forgery', auth, async (req, res) => {
    try {
        const { documentPath } = req.body;

        const pythonProcess = spawn('python3', [
            'ai_engine/models/forgery_detector.py',
            documentPath
        ]);

        let result = '';

        pythonProcess.stdout.on('data', (data) => {
            result += data.toString();
        });

        pythonProcess.stderr.on('data', (data) => {
            console.error(`Error: ${data}`);
        });

        pythonProcess.on('close', (code) => {
            if (code !== 0) {
                return res.status(500).json({ error: 'Forgery detection failed' });
            }
            
            const detection = JSON.parse(result);
            res.json(detection);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;