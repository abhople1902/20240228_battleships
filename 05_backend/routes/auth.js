const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { JWT_SECRET } = require('../config');
const app = express();
const { validateUsername, validatePassword } = require('../validators/loginValidator');

// app.use(express.json());

// POST /auth/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  // console.log(username);

  // Validate username format
  if (!validateUsername(username)) {
    return res.status(400).json({ message: 'Invalid username format' });
  }

  // Validate password length
  if (!validatePassword(password)) {
    return res.status(400).json({ message: 'Invalid password length' });
  }

  try {
    const user = await User.findOne({ username: username });
    console.log(user);
    if (!user) {
      return res.status(401).json({ message: 'Invalid user' });
    }

    // console.log(password)
    // if (password === user.password) {
    //   const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
    //   console.log("TOKEN GENERATED")
    //   res.json({ token });
    // }
    // else {
    //   res.status(401).json({ message: 'Invalid password' });
    // }
    const validPassword = bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.json({ success: false, message: 'passwords do not match' });
    } else if (validPassword) {
      const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
      console.log("TOKEN GENERATED")
      return res.json({ token });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Default route for handling undefined routes
router.use((req, res) => {
  res.status(404).send('<h1>404 Page Not Found</h1>');
});


module.exports = router;










// router.post('/login', async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     const user = await User.findOne({ username });
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) return res.status(401).json({ message: 'Invalid password' });

//     const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1m' });
//     res.json({ token });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });