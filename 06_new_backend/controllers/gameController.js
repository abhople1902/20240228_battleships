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
/** Controller for checkIndex */
async function checkShipPlacement(req, res) {
  try {
    const { gameId, playertype, position } = req.body;

    const gaming = await Game.findOne({ gameId: gameId });
    const typeOfPlayer = playertype;

    if (!typeOfPlayer) {
      return res.status(404).json({ success: false, message: 'Player not found' });
    }

    const { x, y } = position;

    if (typeOfPlayer === 'Human') {
      const shipPlacements2 = gaming.placementsPlayer2;

      (shipPlacements2 || []).forEach(item => {
        const xValues = item.shipPlacements.map(ship => ship.x);
        if (xValues.includes(x)) {
          console.log(`pos1 matches an x value in placementsPlayer2`);
        } else {
          console.log(`pos1 does not match an x value in placementsPlayer2`);
        }
        const yValues = item.shipPlacements.map(ship => ship.y);
        if (yValues.includes(y)) {
          console.log(`pos2 matches a y value in placementsPlayer2`);
        } else {
          console.log(`pos2 does not match a y value in placementsPlayer2`);
        }
      });
    } else {
      const shipPlacements1 = gaming.placementsPlayer1;

      (shipPlacements1 || []).forEach(item => {
        const xValues = item.shipPlacements.map(ship => ship.x);
        if (xValues.includes(x)) {
          console.log(`pos1 matches an x value in placementsPlayer1`);
        } else {
          console.log(`pos1 does not match an x value in placementsPlayer1`);
        }
        const yValues = item.shipPlacements.map(ship => ship.y);
        if (yValues.includes(y)) {
          console.log(`pos2 matches a y value in placementsPlayer1`);
        } else {
          console.log(`pos2 does not match a y value in placementsPlayer1`);
        }
      });
    }

    await gaming.save();

    res.json({
      success: true,
      message: 'Ships placements checked successfully.'
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

/** Controller for  saveShipPlacements */
async function  saveShipPlacements(req, res) { 
  try {
    const { gameId, playertype, playerID, position, shipType } = req.body;

    // Check if the game exists
    const gaming = await Game.findOne({ gameId: gameId });

    if (!gaming) {
      return res
        .status(401)
        .json({ success: false, message: "Game not found" });
    }

    // Validating the input
    if (
      !playerValidator(playerID) ||
      !positionValidator(position) ||
      !shipValidator(shipType) ||
      !playerTypeValidator(playertype)
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid input" });
    }

    // Saving the ship placements
    const placement = {
      playerID,
      shipPlacements: position,
      shipType,
    };

    // Human ships correspond to player 1 and
    // computer ships correspond to player 2.
    if (playertype === "Human") {
      gaming.placementsPlayer1.push(placement);
    } else {
      gaming.placementsPlayer2.push(placement);
    }

    await gaming.save();

    res.status(200).json({
      success: true,
      message: "Ships placements saved successfully.",
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}

/** Controller for deleting product */
async function deleteProduct(req, res) { }

/** Controller for getting seller dashboard */
async function getDashboard(req, res) { }

module.exports = {
  createGame,
  saveShipPlacements,
  checkShipPlacement,
  deleteProduct,
  getDashboard,
};
