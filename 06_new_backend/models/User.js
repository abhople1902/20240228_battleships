const mongoose = require("mongoose");
const { playerType } = require("../constants");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String },
  totalGamesPlayed: { type: Number, default: 0 },
  playertype: { type: String, enum: playerType, default: playerType[0] },
});

// const User = ;

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
