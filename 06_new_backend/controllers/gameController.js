// Internal Imports
const Game = require("../models/Game");

/** Controller to create a new game */
async function createGame(req, res) {
  const startedBy = req.user._id;
  // Current timestamp as date
  const startedAt = Date.now();
  try {
    const game = new Game({ startedAt, startedBy });
    await game.save();
    res.status(200).json(game._id);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}

/** Controller for checking if the Index has a ship */
async function checkShipPlacement(req, res) {
  try {
    const { gameId, playertype, position } = req.body;

    // Check if the game exists
    const gaming = await Game.findOne({ _id: gameId });

    if (!gaming) {
      return res
        .status(401)
        .json({ success: false, message: "Game not found" });
    }

    // Validating the input
    // if (!positionValidator(position) || !playerTypeValidator(playertype)) {
    //   return res.status(400).json({ success: false, message: "Invalid input" });
    // }

    // Taking the placements of the respective player.
    const placements =
      playertype === "Human"
        ? gaming.placementsPlayer2
        : gaming.placementsPlayer1;

    for (let i = 0; i < placements.length; i++) {
      const allShipPlacementsX = placements[i].shipPlacements.map((pos) => {
        return pos.x;
      });

      const allShipPlacementsY = placements[i].shipPlacements.map((pos) => {
        return pos.y;
      });

      console.log(allShipPlacementsX, allShipPlacementsY);
      for (let j = 0; j < allShipPlacementsX.length; j++) {
        if (
          allShipPlacementsX[j] === position.x &&
          allShipPlacementsY[j] === position.y
        ) {
          return res.status(200).json({ success: true, message: "Ship found" });
        }
      }
    }

    res.status(202).json({ success: true, message: "No ship found" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

/** Controller for  saveShipPlacements */
async function saveShipPlacements(req, res) {
  const { gameId, position, shipType } = req.body;

  const playerID = req.user._id;
  
  const playertype = "Human";
  
  try {
    // Check if the game exists
    const gaming = await Game.findOne({ _id: gameId });

    if (!gaming) {
      return res
        .status(401)
        .json({ success: false, message: "Game not found" });
    }

    // Validating the input
    // if (
    //   !playerValidator(playerID) ||
    //   !positionValidator(position) ||
    //   !shipValidator(shipType) ||
    //   !playerTypeValidator(playertype)
    // ) {
    //   return res.status(400).json({ success: false, message: "Invalid input" });
    // }

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
    } 
    else {
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
}

module.exports = {
  createGame,
  saveShipPlacements,
  checkShipPlacement,
};
