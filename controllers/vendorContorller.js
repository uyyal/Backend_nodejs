const Vendor = require('../models/Vendor');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotEnV = require('dotenv');
dotEnV.config();

const secretKey = process.env.WhatIsYourName

const vendorRegister = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const vendorEmail = await Vendor.findOne({ email });
    if (vendorEmail) {
      return res.status(400).json({ error: "Email already taken" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newVendor = new Vendor({
      username,
      email,
      password: hashPassword,
    });
    await newVendor.save();

    res.status(201).json({ message: "Vendor registered successfully" });
    console.log('Vendor registered:', email);
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const vendorLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required" });
  }

  try {
    const vendor = await Vendor.findOne({ email });
    if (!vendor || !(await bcrypt.compare(password, vendor.password))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ vendorId: vendor._id }, secretKey, { expiresIn: "1h" });
    const vendorId = vendor._id;

    res.status(200).json({ success: "Login successfully!", token, vendorId });
    console.log(email, "logged in. Token:", token);
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const vendorLogout = async (req, res) => {
  const { vendorId } = req.body;

  try {
    const vendor = await Vendor.findById(vendorId);
    if (!vendor) {
      return res.status(404).json({ error: 'Vendor not found' });
    }

    vendor.lastLogoutTime = new Date();
    await vendor.save();

    res.status(200).json({ message: 'Logout time recorded successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find().populate('firm');
    res.json({ vendors });
  } catch (error) {
    console.error("GetAllVendors error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getVendorId = async (req, res) => {
  const vendorId = req.params.id;
  try {
    const vendor = await Vendor.findById(vendorId).populate('firm');
    if (!vendor) {
      return res.status(404).json({ error: "Vendor not found" });
    }

    if (!vendor.firm || vendor.firm.length === 0) {
      return res.status(404).json({ error: "Firm not found for this vendor" });
    }

    const vendorFirmId = vendor.firm[0]._id;
    res.status(200).json({ vendorId, vendorFirmId });
    console.log("Vendor firm ID:", vendorFirmId);
  } catch (error) {
    console.error("GetVendorId error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { vendorRegister, vendorLogin, getAllVendors, getVendorId ,vendorLogout };
