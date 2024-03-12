// Responsible for logic related to authentication
// External dependencies
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Internal dependencies
const {
  usernameValidator,
  emailValidator,
  passwordValidator,
  roleValidator,
} = require("../dependencies/validators/User");

// Register a new user
async function register(req, res) {
}

// Login a user
async function login(req, res) {
}

module.exports = { register, login };
