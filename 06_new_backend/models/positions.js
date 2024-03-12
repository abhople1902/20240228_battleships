const mongoose = require('mongoose');

const positions = new mongoose.Schema({
  // x,y the index of the button press by the user
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