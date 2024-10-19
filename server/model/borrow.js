const mongoose = require('mongoose');

const borrowSchema = new mongoose.Schema({
  bookId: String,
  bookTitle: String,
  name: String,
  contact: String,
  borrowDate: Date,
  returnDate: Date,
  billAmount: Number,
});

module.exports = mongoose.model('Borrow', borrowSchema);
