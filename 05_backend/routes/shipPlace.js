const express = require("express");
const router = express.Router();
const Game = require("../models/Game");

/**
 * @swagger
 * /ships:
 *  post:
 *   summary: Save the ship placements
 *   description: Save the ship placements for the game
 *  requestBody:
 *   required: true
 *   content:
 *    application/json:
 *   schema:
 *    type: object
 *    properties:
 *     gameId:
 *      type: string
 *      description: The game ID
 *     playertype:
 *      type: enum
 *      enum: [Human, Bot]
 *      description: The type of player
 *     playerID:
 *      type: string
 *      description: The player ID
 *     position:
 *      type: array
 *      items:
 *       type: object
 *      properties:
 *       x:
 *        type: number
 *        description: The x coordinate of the ship placement
 *       y:
 *        type: number
 *        description: The y coordinate of the ship placement
 *     shipType:
 *      type: string
 *      description: The type of ship
 * responses:
 * 200:
 *  description: Ships placements saved successfully
 * 400:
 *  description: Invalid input
 * 401:
 *  description: Game not found
 * 500:
 *  description: Internal server error
 */
router.post("/ships", async (req, res) => {
  try {
    // Fetching details from the request body
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
      return res.status(400).json({ success: false, message: "Invalid input" });
    }

    // Saving the ship placements
    const placement = {
      playerID,
      shipPlacements: position,
      shipType,
    };

    // Human ships correspond to player 1 and
    // computer ships correspond to player 2.
    if (typeOfPlayer === "Human") {
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
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.use((req, res) => {
  res.status(404).send("<h1>404 Page Not Found</h1>");
});

module.exports = router;
