const mongoose = require('mongoose');
const { Ships, Players, status } = require('../../constants');

const userSchema = new mongoose.Schema({
  // user_id: {type: Number, required: true, unique: true},
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: {type: String},
  // gamesWon: {type: Number, default: 0},
  // totalGamesPlayed: {type: Number, default: 0},
  friends: [{type: mongoose.Schema.Types.ObjectId, ref:'User'}],
  playerType: [{
    type: String,
    enum: [Players.Bot, Players.Human],
    default: Players.Bot
  }]
});

module.exports = new mongoose.model('User', userSchema);