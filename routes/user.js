var express = require("express");
var route = express.Router();

var model = require("../models/model");

// global date and time
var date = new Date().getDay();
var month = new Date().getMonth();
var year = new Date().getFullYear();
date = date < 10 ? "0" + date : date;
month = month < 10 ? "0" + month : month;
var h = new Date().getHours();
var m = new Date().getMinutes();
var s = new Date().getSeconds();
h = h > 12 ? h - 12 : h;
var time = h + ":" + m + ":" + s;
var fullDate = date + "-" + month + "-" + year + " | " + time;

route.get("/", async function (req, res) {
  var slides = await model.slider_model.find();
  var about = await model.about_model.find();
  var quality_info = await model.qualityPhoto_model.find();
  var port_list = await model.portfolio_model.find();
  var test_list = await model.testimonial_model.find();
  var news_list = await model.news_model.find();
  var basic_info = await model.basicInfo_model.find();
  res.render("user/index.ejs", {
    slides: slides,
    about: about[0],
    port_list: port_list,
    test_list: test_list,
    news_list: news_list,
    basic_info: basic_info[0],
    quality_info: quality_info[0],
  });
});

route.get("/about", async function (req, res) {
  var about = await model.about_model.find();
  var basic_info = await model.basicInfo_model.find();
  res.render("user/about.ejs", { about: about[0], basic_info: basic_info[0] });
});

route.get("/portfolio", async function (req, res) {
  var port_list = await model.portfolio_model.find();
  var quality_photo = await model.qualityPhoto_model.find();
  var basic_info = await model.basicInfo_model.find();
  res.render("user/portfolio.ejs", {
    port_list: port_list,
    quality_photo: quality_photo[0],
    basic_info: basic_info[0],
  });
});

route.get("/contact", async function (req, res) {
  var basic_info = await model.basicInfo_model.find();
  res.render("user/contact.ejs", {
    basic_info: basic_info[0],
  });
});

route.post("/save_enquiry", async function (req, res) {
  req.body.date = fullDate;
  req.body.status = "Active";
  var basic_info = await model.basicInfo_model.find();
  var newData = await new model.enquiry_model(req.body);
  newData.save();
  res.render("user/contact.ejs", {
    basic_info: basic_info[0],
  });
});

module.exports = route;
