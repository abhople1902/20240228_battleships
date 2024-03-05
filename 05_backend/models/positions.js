const mongoose = require('mongoose');

const positions = new mongoose.Schema({
  x: {
    type: Number,
    required: true
  },
  y :{
    type: Number,
    required: true
  }
})

module.exports = positions;