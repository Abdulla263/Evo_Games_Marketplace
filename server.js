const dotenv = require('dotenv')
dotenv.config();
const express = require('express')
const app = express();

//Middleware



// Port Configuration
const port = process.env.PORT ? process.env.PORT : "3000";
const path = require('path');
//Require Middleware
const methodOverride = require('method-override');
const morgan = require('morgan')
const session = require('express-session')
const passUserToView = require('./middleware/pass-user-to-view')
const isSignedIn = require("./middleware/is-signed-in")

//Use Middlewares
app.use(express.urlencoded())
app.use(methodOverride('_method'))
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static("uploads"))

// Session Configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
);

app.use(passUserToView);
console.log("u")



// Root Route
app.get('/', async (req, res) => {
  res.render("index.ejs");
});

// Server - Listen on the configured port
app.listen(port, () => {
  console.log(`The Express App is Listening on Port ${port}`)
})
