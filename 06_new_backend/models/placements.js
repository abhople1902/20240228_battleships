const mongoose = require('mongoose');
const { shipType } = require('../constants');
const Position = require('../models/positions');

const placementsSchema = new mongoose.Schema({
  // playerId of the user who stores his ships' placements
  playerID: { type: String },
  shipPlacements: [{
    type: Position // From the schema of positions.js
  }],
  // types of ship in the  game
  shipType: { type: String, enum: shipType }
});

module.exports = placementsSchema;