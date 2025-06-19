const express = require('express');
const firmController = require('../controllers/firmController');
const verifyToken = require('../middlewares/verifyToken');
const path = require('path');

const router = express.Router();

// POST /firm/add-firm — Protected
router.post('/add-firm', verifyToken, firmController.addFirm);

// GET /firm/uploads/:imageName — Serve uploaded images
router.get('/uploads/:imageName', (req, res) => {
  const imageName = req.params.imageName;
  res.setHeader('Content-Type', 'image/jpeg');
  res.sendFile(path.join(__dirname, '..', 'uploads', imageName));
});

// DELETE /firm/:firmId — (optional: protect with verifyToken)
router.delete('/:firmId', firmController.deleteFirmById);

module.exports = router;
