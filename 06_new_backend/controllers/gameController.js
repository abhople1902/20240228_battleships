// Internal Imports
const Game = require("../models/Game");

/**
 * @swagger
 * /games:
 *   post:
 *     summary: Create a new game
 *     description: This endpoint allows you to create a new game
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Game object
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Game'
 *     responses:
 *       200:
 *         description: Successful response
 *         schema:
 *           $ref: '#/definitions/GameId'
 *       500:
 *         description: Internal server error
 *         schema:
 *           $ref: '#/definitions/Error'
 * definitions:
 *   Game:
 *     type: object
 *     properties:
 *       # Define the properties of the Game object here
 *   GameId:
 *     type: object
 *     properties:
 *       gameId:
 *         type: string
 *         description: The ID of the newly created game
 *   Error:
 *     type: object
 *     properties:
 *       message:
 *         type: string
 *         description: Error message
 */
async function createGame(req, res) {
  try {
    const game = new Game(req.body);
    const savedGame = await game.save();
    res.status(200).json(savedGame.gameId);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
}

/** Controller for updating product */
async function updateProduct(req, res) {}

/** Controller for deleting product */
async function deleteProduct(req, res) {}

/** Controller for getting seller dashboard */
async function getDashboard(req, res) {}

module.exports = {
  createGame,
  updateProduct,
  deleteProduct,
  getDashboard,
};
