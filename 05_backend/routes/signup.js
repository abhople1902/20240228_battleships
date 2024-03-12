// signup.js

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const {
  validateUsername,
  validatePassword,
} = require("../validators/signupValidator");

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: User signup
 *     description: Register a new user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Username of the user.
 *               password:
 *                 type: string
 *                 description: Password of the user.
 *               email:
 *                 type: string
 *                 description: Email address of the user.
 *               playertype:
 *                 type: string
 *                 description: Type of player (e.g., "beginner", "intermediate", "advanced").
 *     responses:
 *       '201':
 *         description: User created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message indicating user creation.
 *       '400':
 *         description: Invalid username format, password length, or username already exists.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating the reason for the validation failure or username already exists.
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating internal server error.
 */

// POST /signup route for user signup
router.post("/signup", async (req, res) => {
  // Extract username and password from request body
  const { username, password, email, playertype } = req.body;

  // Validate username format
  if (!validateUsername(username)) {
    return res.status(400).json({ message: "Invalid username format" });
  }

  // Validate password length
  if (!validatePassword(password)) {
    return res.status(400).json({ message: "Invalid password length" });
  }

  try {
    // Check if username already exists in the database
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user document
    const newUser = new User({
      username,
      password: hashedPassword,
      email,
      playertype,
    });

    // Save the new user document to the database
    await newUser.save();

    // Respond with success message
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Default route for handling undefined routes
router.use((req, res) => {
  res.status(404).send("<h1>404 Page Not Found</h1>");
});

module.exports = router;
