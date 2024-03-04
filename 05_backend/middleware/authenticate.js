const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticate = async (req, res, next) => {
  // Get the JWT token from the Authorization header
  var token = req.headers.authorization.split(` `)[1];

  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Missing token' });
  }

  try {
    // Verify and decode the JWT token
    console.log(token)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded)
    // Extract user ID from decoded token
    // const username = decoded.username;
    // console.log(username)
    // Fetch user from database based on user ID
    const user = await User.findById(decoded.userId);
    console.log(user)
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized: User not found' });
    }
    // Attach user object to request for use in subsequent middleware or routes
    req.user = user;

    // Proceed to the next middleware or route
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

module.exports = authenticate;
