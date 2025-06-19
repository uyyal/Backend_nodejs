const jwt = require('jsonwebtoken');
const dotEnV = require('dotenv');
dotEnV.config();

const secretKey = process.env.WhatIsYourName; // ✅ Same as used in vendorLogin

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.vendor = decoded; // Attach vendor info (like vendorId) to request
    next();
  } catch (err) {
    console.error('Invalid token:', err.message);
    return res.status(401).json({ error: 'Invalid token.' });
  }
};

module.exports = verifyToken;
