const mongoose = require('mongoose');
const { playerType } = require('../constants');

const userSchema = new mongoose.Schema({
  // user_id: {type: Number, required: true, unique: true},
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: {type: String},
  // gamesWon: {type: Number, default: 0},
  // total game played by the user
  totalGamesPlayed: {type: Number, default: 0},
  // friend list if the user
  friends: [{type: mongoose.Schema.Types.ObjectId, ref:'User'}],
  // human and bot are the two playertype 
  playertype: { type: String, enum: playerType, default: playerType[0] },
});

module.exports = new mongoose.model('User', userSchema);