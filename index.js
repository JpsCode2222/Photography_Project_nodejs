// import packages
var express = require("express");
var bodyparser = require("body-parser");
var upload = require("express-fileupload");
var session = require("express-session");

// initialize Routes
var userRoute = require("./routes/user");
var adminRoute = require("./routes/admin");
var loginRoute = require("./routes/login");

// create app
var app = express();

// set middlewares
app.use(bodyparser.urlencoded({ extended: true }));
app.use(upload());
app.use(
  session({
    secret: "A2Z IT HUB",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(express.static("public"));

// set routes
app.use("/", userRoute);
app.use("/admin/", adminRoute);
app.use("/login/", loginRoute);

// port 1000
app.listen(1000);
