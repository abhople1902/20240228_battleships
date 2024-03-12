const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { JWT_SECRET } = require("../config");
const app = express();
const {
  validateUsername,
  validatePassword,
} = require("../validators/loginValidator");

// app.use(express.json());

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     description: Authenticate and log in a user.
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
 *     responses:
 *       '200':
 *         description: Successfully authenticated. Returns a JWT token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token for authenticated user.
 *       '400':
 *         description: Invalid username format or password length.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating the reason for the validation failure.
 *       '401':
 *         description: Invalid user credentials.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating invalid user credentials.
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

// POST /auth/login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  // console.log(username);

  // Validate username format
  if (!validateUsername(username)) {
    return res.status(400).json({ message: "Invalid username format" });
  }

  // Validate password length
  if (!validatePassword(password)) {
    return res.status(400).json({ message: "Invalid password length" });
  }

  try {
    const user = await User.findOne({ username: username });
    console.log(user);
    if (!user) {
      return res.status(401).json({ message: "Invalid user" });
    }

    // console.log(password)
    // if (password === user.password) {
    //   const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
    //   console.log("TOKEN GENERATED")
    //   res.json({ token });
    // }
    // else {
    //   res.status(401).json({ message: 'Invalid password' });
    // }
    const validPassword = bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.json({ success: false, message: "passwords do not match" });
    } else if (validPassword) {
      const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
        expiresIn: "1h",
      });
      console.log("TOKEN GENERATED");
      return res.json({ token });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Default route for handling undefined routes
router.use((req, res) => {
  res.status(404).send("<h1>404 Page Not Found</h1>");
});

module.exports = router;
