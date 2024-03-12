const express = require("express");
const router = express.Router();
const gameController = require("../controllers/gameController");
const { verifyJwt, getUserMiddleware } = require("../dependencies/jwtHelpers");

/**
 * @swagger
 * /start:
 *   post:
 *     summary: Create a New Game
 *     description: Creates a new entry in the database and returns the game ID.
 *     tags:
 *     - Game
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 */
router.post("/start", verifyJwt, getUserMiddleware, gameController.createGame);

/**
 * @swagger
 * /api/check-ship:
 *   post:
 *     summary: Check if the index is already stored in the opponent's user or not.
 *     description: Check if the index is already stored in the opponent's user or not.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ShipPlacementRequest'
 *     responses:
 *       '200':
 *         description: Ships placements saved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the operation was successful.
 *                   example: true
 *                 message:
 *                   type: string
 *                   description: A message indicating the result of the operation.
 *                   example: Ships placements saved successfully.
 *       '404':
 *         description: Player not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the operation was successful.
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: A message indicating the reason for the failure.
 *                   example: Player not found.
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the operation was successful.
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: A message indicating the reason for the failure.
 *                   example: Internal server error.
 */
router.post("/check-ship", verifyJwt, getUserMiddleware, gameController.checkShipPlacement)

 /**
 * @swagger
 * /place-ship:
 *   post:
 *     summary: Save the ship placements
 *     description: Save the ship placements for the game
 *     tags: [Ships]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ShipPlacementRequest'
 *     responses:
 *       '200':
 *         description: Ships placements saved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the operation was successful.
 *                   example: true
 *                 message:
 *                   type: string
 *                   description: A message indicating the result of the operation.
 *                   example: Ships placements saved successfully.
 *       '400':
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the operation was successful.
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: A message indicating the reason for the failure.
 *                   example: Invalid input.
 *       '401':
 *         description: Game not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the operation was successful.
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: A message indicating the reason for the failure.
 *                   example: Game not found.
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the operation was successful.
 *                   example: false
 *                 message:
 *                   type: string
 *                   description: A message indicating the reason for the failure.
 *                   example: Internal server error.
 */
router.post("/place-ship",verifyJwt,getUserMiddleware,gameController. saveShipPlacements)

module.exports = router;
