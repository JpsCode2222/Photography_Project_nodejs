// include packages
var express = require("express");
var mongoose = require("../routes/connection");

var model = require("../models/model");

// global variable currentTime
var currentTime = new Date().getTime();

// check valid admin or not
function checkAdmin(req, res, next) {
  if (req.session.login_id === undefined) res.redirect("/login/");
  if (req.session.login_id !== undefined) next();
}

// routes
var route = express.Router();

route.get("/", checkAdmin, async function (req, res) {
  var basic_info = await model.basicInfo_model.find();
  res.render("admin/index.ejs", { basic_info: basic_info[0] });
});

route.post("/save_basic_information", checkAdmin, async function (req, res) {
  var newData = model.basicInfo_model(req.body);
  newData.save();
  res.redirect("/admin/");
});

// slider routes
route.get("/slider", checkAdmin, async function (req, res) {
  var slider_list = await model.slider_model.find();
  res.render("admin/slider.ejs", { slider_list: slider_list });
});

route.post("/save_slider", checkAdmin, async function (req, res) {
  if (req.files) {
    var img = currentTime + req.files.slider_image.name;
    req.body.slider_image = img;
    req.files.slider_image.mv("public/images/" + img);
    var newData = await slider_model(req.body);
    await newData.save();
  }
  res.redirect("/admin/slider");
});

route.get("/edit_slider/:id", checkAdmin, async function (req, res) {
  var slider_info = await model.slider_model.find({ _id: req.params.id });
  res.render("admin/edit_slider.ejs", { slider_info: slider_info[0] });
});

route.post("/update_slider", checkAdmin, async function (req, res) {
  if (req.files) {
    var img = currentTime + req.files.slider_image.name;
    req.body.slider_image = img;
    req.files.slider_image.mv("public/images/" + img);
  }
  await model.slider_model.findOneAndUpdate(
    { _id: req.body.slider_id },
    req.body
  );
  res.redirect("/admin/slider");
});

route.get("/delete_slider/:id", checkAdmin, async function (req, res) {
  await model.slider_model.findOneAndDelete({ _id: req.params.id });
  res.redirect("/admin/slider");
});

// about routes
route.get("/about", checkAdmin, async function (req, res) {
  var about = await model.about_model.find();
  res.render("admin/about.ejs", { about: about[0] });
});

route.post("/save_about", checkAdmin, async function (req, res) {
  if (req.files) {
    var img1 = currentTime + req.files.image1.name;
    var img2 = currentTime + req.files.image2.name;
    req.body.image1 = img1;
    req.body.image2 = img2;
    req.files.image1.mv("public/images/" + img1);
    req.files.image2.mv("public/images/" + img2);
    var newData = new model.about_model(req.body);
    newData.save();
  }
  res.redirect("/admin/about");
});

route.post("/update_about", checkAdmin, async function (req, res) {
  if (req.files) {
    var img1 = currentTime + req.files.image1.name;
    var img2 = currentTime + req.files.image2.name;
    req.body.image1 = img1;
    req.body.image2 = img2;
    req.files.image1.mv("public/images/" + img1);
    req.files.image2.mv("public/images/" + img2);
    await model.about_model.findOneAndUpdate({ _id: req.body.id }, req.body);
  }
  res.redirect("/admin/about");
});

// portfolio routes
route.get("/portfolio", checkAdmin, async function (req, res) {
  var port_list = await model.portfolio_model.find();
  res.render("admin/portfolio.ejs", { port_list: port_list });
});

route.post("/save_portfolio", checkAdmin, async function (req, res) {
  if (req.files) {
    var img = currentTime + req.files.image.name;
    req.body.image = img;
    req.files.image.mv("public/images/" + img);
  }
  var newData = new model.portfolio_model(req.body);
  newData.save();
  res.redirect("/admin/portfolio");
});

route.get("/edit_portfolio/:id", checkAdmin, async function (req, res) {
  var portfolio = await model.portfolio_model.find({ _id: req.params.id });
  res.render("admin/edit_portfolio.ejs", { portfolio: portfolio[0] });
});

route.post("/update_portfolio", checkAdmin, async function (req, res) {
  if (req.files) {
    var img = currentTime + req.files.image.name;
    req.body.image = img;
    req.files.image.mv("public/images/" + img);
    await model.portfolio_model.findOneAndUpdate(
      { _id: req.body.id },
      req.body
    );
  }
  res.redirect("/admin/portfolio");
});

route.get("/delete_portfolio/:id", checkAdmin, async function (req, res) {
  await model.portfolio_model.findOneAndDelete({ _id: req.params.id });
  res.redirect("/admin/portfolio");
});

// Quality photo || portfolio sec 2
route.get("/portfolio_sec2", checkAdmin, async function (req, res) {
  var data = await model.qualityPhoto_model.find();
  res.render("admin//portfolio_sec2.ejs", { data: data[0] });
});

route.post("/save_portfolio_sec2", checkAdmin, async function (req, res) {
  if (req.files) {
    var bg_img = currentTime + req.files.bg_image.name;
    var icon1 = currentTime + req.files.icon1.name;
    var icon2 = currentTime + req.files.icon2.name;
    req.body.bg_image = bg_img;
    req.body.icon1 = icon1;
    req.body.icon2 = icon2;
    req.files.bg_image.mv("public/images/" + bg_img);
    req.files.icon1.mv("public/images/" + icon1);
    req.files.icon2.mv("public/images/" + icon2);
  }
  var newData = new model.qualityPhoto_model(req.body);
  newData.save();
  res.redirect("/admin/portfolio_sec2");
});

route.post("/update_portfolio_sec2", checkAdmin, async function (req, res) {
  if (req.files) {
    if (req.files.bg_image) {
      var bg_img = currentTime + req.files.bg_image.name;
      req.body.bg_image = bg_img;
      req.files.bg_image.mv("public/images/" + bg_img);
    }
    if (req.files.icon1) {
      var icon1 = currentTime + req.files.icon1.name;
      req.body.icon1 = icon1;
      req.files.icon1.mv("public/images/" + icon1);
    }
    if (req.files.icon2) {
      var icon2 = currentTime + req.files.icon2.name;
      req.body.icon2 = icon2;
      req.files.icon2.mv("public/images/" + icon2);
    }
  }
  await model.qualityPhoto_model.findOneAndUpdate(
    { _id: req.body.id },
    req.body
  );
  res.redirect("/admin/portfolio_sec2");
});

// testimonial routes
route.get("/testimonial", checkAdmin, async function (req, res) {
  var test_list = await model.testimonial_model.find();
  res.render("admin/testimonial.ejs", { test_list: test_list });
});

route.post("/save_testimonial", checkAdmin, async function (req, res) {
  if (req.files) {
    var img = currentTime + req.files.image.name;
    req.body.image = img;
    req.files.image.mv("public/images/" + img);
    var newData = new model.testimonial_model(req.body);
    newData.save();
  }
  res.redirect("/admin/testimonial");
});

route.get("/edit_testimonial/:id", checkAdmin, async function (req, res) {
  var test_info = await model.testimonial_model.find({ _id: req.params.id });
  res.render("admin/edit_testimonial.ejs", { test_info: test_info[0] });
});

route.post("/update_testimonial", checkAdmin, async function (req, res) {
  if (req.files) {
    var img = currentTime + req.files.image.name;
    req.body.image = img;
    req.files.image.mv("public/images/" + img);
  }
  await model.testimonial_model.findOneAndUpdate(
    { _id: req.body.id },
    req.body
  );
  res.redirect("/admin/testimonial");
});

route.get("/delete_testimonial/:id", checkAdmin, async function (req, res) {
  await model.testimonial_model.findOneAndDelete({ _id: req.params.id });
  res.redirect("/admin/testimonial");
});

// news routes
route.get("/news", checkAdmin, async function (req, res) {
  var news_list = await model.news_model.find();
  res.render("admin/news.ejs", { news_list: news_list });
});

route.post("/save_news", checkAdmin, async function (req, res) {
  if (req.files) {
    var img = currentTime + req.files.image.name;
    req.files.image.mv("public/images/" + img);
    req.body.image = img;
  }
  var newData = new model.news_model(req.body);
  newData.save();
  res.redirect("/admin/news");
});

route.get("/edit_news/:id", checkAdmin, async function (req, res) {
  var news = await model.news_model.find({ _id: req.params.id });
  res.render("admin/edit_news.ejs", { news: news[0] });
});

route.post("/update_news", checkAdmin, async function (req, res) {
  if (req.files) {
    var img = currentTime + req.files.image.name;
    req.files.image.mv("public/images/" + img);
    req.body.image = img;
  }
  await model.news_model.findOneAndUpdate({ _id: req.body.id }, req.body);
  res.redirect("/admin/news");
});

route.get("/delete_news/:id", checkAdmin, async function (req, res) {
  var news = await model.news_model.findOneAndDelete({ _id: req.params.id });
  res.redirect("/admin/news");
});

// enquiry routes
route.get("/enquiry", checkAdmin, async function (req, res) {
  var enquiry_list = await model.enquiry_model.find({ status: "Active" });
  res.render("admin/enquiry.ejs", { enquiry_list: enquiry_list });
});

route.get("/deactive_enquiry/:id", checkAdmin, async function (req, res) {
  await model.enquiry_model.findOneAndUpdate(
    { _id: req.params.id },
    { status: "Deactivated" }
  );
  res.redirect("/admin/enquiry");
});

// logout route
route.get("/logout", checkAdmin, function (req, res) {
  req.session.destroy();
  res.render("login/index.ejs");
});

// export route
module.exports = route;
