const mongoose = require('mongoose');
const Position = require('../models/positions');
// this is the move schema
const moves = new mongoose.Schema({
  // the user who make the move
  who_id: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
  // the position of the move
  where: {type: Position },
  // the time and the date of the move played
  when: {type: Date, default: Date.now}
})

module.exports = moves;