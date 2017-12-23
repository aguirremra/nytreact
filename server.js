const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const routes = require('./routes');
const mongoose = require('mongoose');

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

//Mongoose
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/nytreact";
mongoose.Promise = global.Promise;
mongoose.connect(MONGODB_URI, {
  useMongoClient: true
});

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Send every request to the React app
app.use('/api', routes);


app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
