// Setting up the express router
const express = require("express");
const router = express.Router();

// Controller
const authController = require("../controllers/authController");

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: The username for the new user.
 *         password:
 *           type: string
 *           description: The password for the new user.
 *         email:
 *           type: string
 *           description: The email for the new user.
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Error message.
 */

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with the provided username, password, email, and player type.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 $ref: '#/components/schemas/User/properties/username'
 *               email:
 *                 $ref: '#/components/schemas/User/properties/email'
 *               password:
 *                 $ref: '#/components/schemas/User/properties/password'
 *     responses:
 *       '201':
 *         description: Successfully registered user
 *         content:
 *           application/json:
 *             example:
 *               username: "Silverarrow"
 *               email: "Silverarrow@example.com"
 *               password: "hashedPassword"
 *
 *       '400':
 *         description: Invalid username format, password length, or username already exists
 *         content:
 *           application/json:
 *             example:
 *               error: "Invalid username format, password length, or username already exists"
 *       '500':
 *         description: Server error
 *         content:
 *           application/json:
 *             example:
 *               error: "Server error"
 */

router.post("/signup", authController.register);

/**
 * @swagger
 * components:
 *   schemas:
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Error message.
 */

/**
 * @swagger
 * /auth/signin:
 *   post:
 *     summary: Authenticate user
 *     description: Authenticate user with provided username and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user.
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *     responses:
 *       '200':
 *         description: Authentication successful
 *         content:
 *           application/json:
 *             example:
 *               token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       '400':
 *         description: Invalid input. Check the request body for errors.
 *         content:
 *           application/json:
 *             example:
 *               error: "Invalid email or password."
 *       '401':
 *         description: Unauthorized. Invalid email or password.
 *         content:
 *           application/json:
 *             example:
 *               error: "Invalid email or password."
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal Server Error"
 */

router.post("/signin", authController.login);

// Exporting the router
module.exports = router;
