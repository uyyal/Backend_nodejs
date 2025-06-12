const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true
  },
  price: {
    type: Number, // ✅ Corrected
    required: true
  },
  category: {
    type: [{
      type: String,
      enum: ['veg', 'non-veg']
    }],
    default: []
  },
  image: {
    type: String
  },
  bestSeller: {
    type: Boolean,
    default: false
  },
  description: {
    type: String
  },
  firm: {
    type: mongoose.Schema.Types.ObjectId, // ✅ Assuming one firm per product
    ref: 'Firm',
    required: true
  }
}, { timestamps: true }); // ✅ Optional but useful

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
