const user = require('../models/User')

async function getUserStats(req, res) {
    const user = req.user
    try {
        const { totalGamesPlayed, gameWon, username } = user;
        const gameLoss = totalGamesPlayed - gameWon;

        res.status(200).json({
            username,
            totalGamesPlayed,
            gameWon,
            gameLoss
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}
module.exports = { getUserStats }
const jwt = require('jsonwebtoken'); // Assuming you're using JWT for authentication
const User = require('../models/User');

// async function getUserStats(req, res) {
//   try {
//     // Verify the token and get the user ID
//     const token = req.headers.authorization.split(' ')[1]; // Assuming the token is sent in the 'Authorization' header as 'Bearer <token>'
//     const decodedToken = jwt.verify(token, process.env.JWT_SECRET); // Replace with your JWT secret
//     const userId = decodedToken.userId;

//     // Find the user by ID
//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     const { username, playertype, totalGamesPlayed, gameWon } = user;
//     const gameLoss = totalGamesPlayed - gameWon;

//     res.status(200).json({
//       username,
//       playertype,
//       totalGamesPlayed,
//       gameWon,
//       gameLoss
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// }


module.exports = { getUserStats };