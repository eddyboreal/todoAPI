const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  label: String,
  description: String
});

module.exports = mongoose.model('Todo', todoSchema);