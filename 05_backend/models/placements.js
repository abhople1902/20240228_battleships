const mongoose = require('mongoose');
const { Ships, Players, status } = require('../../constants');
const Position = require('../models/positions');

const placements = new mongoose.Schema({
  playerID: { type: String, required: true },
  placements: [{
    type: Position
  }],
  shipType: {
    type: String,
    enum: [Ships.Carrier, Ships.Submarine, Ships.Destroyer, Ships.Cruiser, Ships.Frigate]
  }
});

module.exports = placements;