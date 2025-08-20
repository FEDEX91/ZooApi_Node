const mongoose = require('mongoose');

const birdSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  photoUrl: {
    type: String
  }
});

module.exports = mongoose.model('Bird', birdSchema);
