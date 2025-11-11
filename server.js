const dotenv = require('dotenv')
dotenv.config();
const express = require('express')
const app = express();

//Middleware



// Port Configuration
const port = process.env.PORT ? process.env.PORT : "3000";
const path = require('path');

// Root Route
app.get('/', async (req, res) => {
  res.render("index.ejs");
});

// Server - Listen on the configured port
app.listen(port, () => {
  console.log(`The Express App is Listening on Port ${port}`)
})
