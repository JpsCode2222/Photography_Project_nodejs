var express = require("express");
var mogoose = require("../routes/connection");
var route = express.Router();
var model = require("../models/model");

route.get("/", function (req, res) {
  res.render("login/index.ejs");
});

route.post("/check_admin", async function (req, res) {
  var d = req.body;
  var info = await model.admin_model.find({
    name: d.name,
    password: d.password,
  });
  if (info.length > 0) {
    req.session["login_id"] = info[0]._id;
    res.redirect("/admin/");
  } else {
    res.redirect("/login/");
  }
});

module.exports = route;
