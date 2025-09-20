const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Document = require('../../models/Document');
const { generateHash } = require('../../utils/hashGenerator');

router.post('/issue', auth, async (req, res) => {
  try {
    const { title, filePath } = req.body;
    const hash = await generateHash(filePath);

    const document = new Document({
      title,
      owner: req.user.userId,
      filePath,
      hash,
      issuedBy: req.user.userId
    });

    await document.save();
    res.status(201).json({ 
      message: 'Document issued successfully',
      document 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;