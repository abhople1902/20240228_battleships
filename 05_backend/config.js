// To generate a secret key using salt
// const bcrypt = require('bcryptjs');

// const generateSecretKey = async () => {
//   try {
//     const salt = await bcrypt.genSalt(10);
//     const secretKey = await bcrypt.hash('ThinkDifferent', salt);
//     console.log('JWT Secret Key:', secretKey);
//   } catch (error) {
//     console.error('Error generating secret key:', error);
//   }
// };

// generateSecretKey();



require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

module.exports = { JWT_SECRET };
