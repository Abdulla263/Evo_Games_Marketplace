const dotenv = require("dotenv")
dotenv.config()
const express = require("express")
const app = express()
const multer = require("multer")

const mongoose = require("./config/db")

// Port Configuration
const port = process.env.PORT ? process.env.PORT : "3000"
const path = require("path")

//Require Middleware
const methodOverride = require("method-override")
const morgan = require("morgan")
const session = require("express-session")
const passUserToView = require("./middleware/pass-user-to-view")
const isSignedIn = require("./middleware/is-signed-in")

//Use Middlewares
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(methodOverride("_method"))
app.use(morgan("dev"))
app.use(express.static(path.join(__dirname, "public")))
app.use(express.static("uploads"))

// Session Configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
)
app.use(passUserToView)
console.log("u")

// Root Route
app.get("/", async (req, res) => {
  res.render("index.ejs")
})
// //First category route
// app.get('/consoles', async (req, res) => {
//   res.render("console.ejs");
// })
// //Second category route
// app.get('/accessories', async (req,res) => {
//   res.render('accessories.ejs')
// })
// //Third category
// app.get('/games', async (req, res) => {
//   res.render('games.ejs')
// })
// Require Routes
const authRouter = require("./routes/auth")
const itemsRouter = require("./routes/items")

// const listingRouter = require("./routes/listings"); causing an error

// Use Routes
app.use("/auth", authRouter)
// app.use("/listings", isSignedIn, listingRouter); cuasing an error
const userRoutes = require('./routes/users');
app.use('/users', userRoutes);

app.use("/items", isSignedIn, itemsRouter)

// Server - Listen on the configured port
app.listen(port, () => {
  console.log(`The Express App is Listening on Port ${port}`)
})
