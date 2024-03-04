const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const authenticate = require('./middleware/authenticate');
const { JWT_SECRET } = require('./config');
const signupRouter = require('./routes/signup');
const profileRouter = require('./routes/profile');
const shipPlace = require('./routes/shipPlace');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = 'mongodb+srv://Ayush:2BXNWx4qaZkr3C5y@cluster0.ijs1ymf.mongodb.net/jwt?retryWrites=true&w=majority&appName=Cluster0';


app.use(express.json());
app.use('/auth', authRoutes);
app.use('/auth', signupRouter);
app.use('/auth', profileRouter);
app.use('/place', shipPlace);

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(error => console.error('MongoDB connection error:', error));
