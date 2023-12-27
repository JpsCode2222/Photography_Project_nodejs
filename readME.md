1> create project folder
Photography_Project

2> install neccessay packages
npm i express
npm i ejs
npm i mongoose
npm i express-session
npm i express-fileupload
npm i -g nodemon

3> create index file in project folder
index.js
index.js -> express, routes, middleware, port

var express = require("express");

var userRoute = require("./routes/user");
var adminRoute = require("./routes/admin");
var loginRoute = require("./routes/login");

var bodyparser = require("body-parser");
var upload = require("express-fileupload");
var session = require("express-session");

var app = express();

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

app.use("/", userRoute);
app.use("/admin", adminRoute);
app.use("/login", loginRoute);

app.listen(1000);

4> Create routes folder for all routes
routes
routes/admin.js, user.js, login.js, connection.js

5> create public folder for images
public

6> create views folder for loading views
views
views/admin,user,login
