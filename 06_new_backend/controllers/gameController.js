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
  const { gameId, playertype, position } = req.body;
  console.log(req.body);
  try {
    // Check if the game exists
    const gaming = await Game.findOne({ _id: gameId });

    if (!gaming) {
      return res
        .status(404)
        .json({ success: false, message: "Game not found" });
    }

    // Save the move to the respective player

    gaming.moves.push({
      player_type: playertype,
      where: position,
    });

    await gaming.save();

    // Taking the placements of the respective player.
    const placements =
      playertype === "Human"
        ? gaming.placementsPlayer2
        : gaming.placementsPlayer1;

    const placementsLeft = placements.length;

    for (let i = 0; i < placements.length; i++) {
      const allShipPlacementsX = placements[i].shipPlacements.map(
        (pos) => pos.x
      );
      const allShipPlacementsY = placements[i].shipPlacements.map(
        (pos) => pos.y
      );

      console.log(allShipPlacementsX, allShipPlacementsY);

      for (let j = 0; j < allShipPlacementsX.length; j++) {
        if (
          allShipPlacementsX[j] === position.x &&
          allShipPlacementsY[j] === position.y
        ) {
          // Remove the found point from ship placements
          // removing the entire placements for now
          // This will not work if the ships have length > 1

          if (playertype === "Human") gaming.placementsPlayer2.splice(i, 1);
          else gaming.placementsPlayer1.splice(i, 1);
          await gaming.save(); // Save the updated document

          if (placementsLeft === 1) {
            return res.status(206).send(`${playertype} Won!`);
          }
          return res.status(204).send("Ship hit!");
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

  console.log(req.body);

  const playerID = req.user._id;

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
    const placements = [];
    //   playerID,
    //   shipPlacements: position,
    //   shipType,
    // };

    for (let i = 0; i < position.length; i++) {
      placements.push({
        playerID,
        shipPlacements: position[i],
        shipType,
      });
    }

    // Human ships correspond to player 1 and
    // computer ships correspond to player 2.
    // if (playertype === "Human") {
    gaming.placementsPlayer1 = placements;
    // } else {
    // gaming.placementsPlayer2 = placements;
    // }

    const placements2 = makeBotPlacements();

    gaming.placementsPlayer2 = placements2;

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

function makeBotPlacements() {
  // Randomly generate 5 non-overlapping ship placements
  const placements = [];

  for (let i = 0; i < 5; i++) {
    const shipPlacements = [];

    const x = Math.floor(Math.random() * 8);
    const y = Math.floor(Math.random() * 8);

    // Check if the placement is already taken
    // if (
    //   shipPlacements.some((placement) => placement.x === x && placement.y === y)
    // ) {
    //   j--;
    //   continue;
    // }

    shipPlacements.push({ x, y });

    // Check if the point is taken by another ship
    // Only works for now since the ships are of length 1
    if (
      placements.some(
        (placement) =>
          placement.shipPlacements[0].x === x &&
          placement.shipPlacements[0].y === y
      )
    ) {
      i--;
      continue;
    }
    placements.push({ shipPlacements });
  }

  return placements;
}

async function getGameData(req, res) {
  const { gameId } = req.params;

  try {
    const gaming = await Game.findOne({ _id: gameId });

    if (!gaming) {
      console.log("Cannot find game");
      return res
        .status(404)
        .json({ success: false, message: "Game not found" });
    }

    const player1 = gaming.placementsPlayer1;
    const player2 = gaming.placementsPlayer2;

    const player1ShipsLeft = player1.length;
    const player2ShipsLeft = player2.length;

    const moves = gaming.moves;

    res.status(200).json({
      success: true,
      message: "Scores retrieved successfully.",
      player1ShipsLeft,
      player2ShipsLeft,
      moves,
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
  getGameData
};
