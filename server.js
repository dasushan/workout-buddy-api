const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const dotenv = require('dotenv').config();
const workoutRoutes = require('./routes/workouts');
// express app
const app = express();

// middleware
app.use(cors())
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use('/api/workouts', workoutRoutes);

// connect to db
console.log(dotenv);
mongoose
  .connect(process.env.MONG_URI)
  .then(() => {
    console.log('connected to db');
    // listen for request
    const PORT = process.env.PORT || 3000
    app.listen(PORT, () => {
      console.log('Listening on port ', PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
