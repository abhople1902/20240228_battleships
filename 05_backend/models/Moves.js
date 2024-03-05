const mongoose = require('mongoose');
const Position = require('../models/positions');

const moves = new mongoose.Schema({
  who_id: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
  where: {type: Position },
  when: {type: Date, default: Date.now}
})

module.exports = moves;