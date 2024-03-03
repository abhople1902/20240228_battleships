const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { JWT_SECRET } = require('../config');
const app = express();

// app.use(express.json());

// POST /auth/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log(username);
  try {
    const user = await User.findOne({ username : username});
    console.log(user);
    if (!user) {
      return res.status(401).json({ message: 'Invalid user' });
    }

    console.log(password)
    if (password === user.password) {
      const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1m' });
      console.log("TOKEN GENERATED")
      res.json({ token });
    }
    else {
      res.status(401).json({ message: 'Invalid password' });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
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