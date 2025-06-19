const vendorController = require('../controllers/vendorController');
const express = require('express');
const router = express.Router();

router.post('/register', vendorController.vendorRegister);
router.post('/login', vendorController.vendorLogin);
router.post('/logout', vendorController.vendorLogout); // ✅ New route

router.get('/all-vendors', vendorController.getAllVendors);
router.get('/single-vendor/:id', vendorController.getVendorId);

module.exports = router;