const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const workoutRoutes = require('./routes/workouts');
// express app
const app = express();

// middleware
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
    app.listen(dotenv.parsed.PORT, () => {
      console.log('Listening on port ', process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
