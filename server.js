const dotenv = require("dotenv")
dotenv.config()
const express = require("express")
const app = express()
const multer = require("multer")

//Middleware
app.use(express.static("uploads"))

//Storage Engine

// Port Configuration
const port = process.env.PORT ? process.env.PORT : "3000"
const path = require("path")

// Root Route
app.get("/", async (req, res) => {
  res.render("index.ejs")
})

// Server - Listen on the configured port
app.listen(port, () => {
  console.log(`The Express App is Listening on Port ${port}`)
})
