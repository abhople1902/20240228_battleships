// !playerValidator(playerID) ||
// !positionValidator(position) ||
// !shipValidator(shipType) ||
// !playerTypeValidator(playertype)

const { shipType, playerType } = require("../constants");

/** Validator to validate the player's ID */
function playerValidator(playerID) {
  if (typeof playerID !== "string" || playerID.length === 0) {
    return false;
  }
  return true;
}

/** Validator to validate the position of the ship */
function positionValidator(position) {
  if (!typeof position === "object" || Array.isArray(position)) {
    return false;
  }
  if (!position.x || !position.y) {
    return false;
  }
  if (typeof position.x !== "number" || typeof position.y !== "number") {
    return false;
  }
  return true;
}

/** Validator to validate the type of ship */
function shipValidator(typeOfShip) {
  if (typeof typeOfShip !== "string" || typeOfShip.length === 0) {
    return false;
  }

  if (!shipType.includes(typeOfShip)) {
    return false;
  }

  return true;
}

/** Validator to validate the type of player */
function playerTypeValidator(typeOfPlayer) {
  if (typeof typeOfPlayer !== "string" || typeOfPlayer.length === 0) {
    return false;
  }

  if (!playerType.includes(typeOfPlayer)) {
    return false;
  }

  return true;
}

module.exports = {
  playerValidator,
  positionValidator,
  shipValidator,
  playerTypeValidator,
};
