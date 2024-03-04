const mongoose = require('mongoose');
const { Ships } = require('../../constants')

const playerSchema = new mongoose.Schema({
  playerID: { type: String, required: true },
  placements: { type: Array, required: true },
  shipType: {
    type: String,
    enum: [Ships.Carrier, Ships.Submarine, Ships.Destroyer, Ships.Cruiser, Ships.Frigate]
  }
});

module.exports = new mongoose.model('Player1', playerSchema);