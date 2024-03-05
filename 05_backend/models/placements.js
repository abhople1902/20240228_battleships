const mongoose = require('mongoose');
const { shipType } = require('../../constants');
const Position = require('../models/positions');

const placementsSchema = new mongoose.Schema({
  playerID: { type: String, required: true },
  shipPlacements: [{
    type: Position
  }],
  shipType: { type: String, enum: shipType }
});

module.exports = placementsSchema;