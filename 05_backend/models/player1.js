const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  playerID: { type: String, required: true },
  placements: { type: Array, required: true }
});

module.exports = new mongoose.model('Player1', playerSchema);