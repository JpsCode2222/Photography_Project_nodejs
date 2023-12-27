// include packages
var express = require("express");
var mongoose = require("../routes/connection");

// slider schema
var sliderSchema = new mongoose.Schema({
  slider_image: String,
  heading: String,
  subheading: String,
});

// slider model
var slider_model = new mongoose.model("slider_model", sliderSchema);

// about schema
var aboutSchema = new mongoose.Schema({
  image1: String,
  image2: String,
  heading: String,
  subheading: String,
});

// about model
var about_model = new mongoose.model("about_model", aboutSchema);

// portfolio schema
var portfolioSchema = new mongoose.Schema({
  image: String,
  title: String,
  url: String,
});

// portfolio model
var portfolio_model = new mongoose.model("portfolio_model", portfolioSchema);

// portfoli sec 2 schema
var qualityPhotoSchema = new mongoose.Schema({
  bg_image: String,
  title: String,
  icon1: String,
  heading1: String,
  subheading1: String,
  icon2: String,
  heading2: String,
  subheading2: String,
});

// portfoli sec 2 model
var qualityPhoto_model = new mongoose.model(
  "qualityPhoto_model",
  qualityPhotoSchema
);

// testimonial schema
var testimonialSchema = new mongoose.Schema({
  image: String,
  title: String,
  description: String,
});

// testimonial model
var testimonial_model = new mongoose.model(
  "testimonial_model",
  testimonialSchema
);

// news schema
var newsSchema = new mongoose.Schema({
  image: String,
  news_date: String,
  title: String,
  description: String,
});

// news model
var news_model = new mongoose.model("news_model", newsSchema);

// enquiry schema
var enquirySchema = new mongoose.Schema({
  name: String,
  email: String,
  mobile: String,
  message: String,
  date: String,
  status: String,
});

// enquiry model
var enquiry_model = new mongoose.model("enquiry_model", enquirySchema);

// basicInfo schema
var basicInfoSchema = new mongoose.Schema({
  mobile: String,
  email: String,
  address: String,
  facebook_link: String,
  twitter_link: String,
  instagram_link: String,
  linkedin_link: String,
});

// basicInfo model
var basicInfo_model = new mongoose.model("basicInfo_model", basicInfoSchema);

// basicInfo schema
var adminSchema = new mongoose.Schema({
  name: String,
  password: String,
});

// basicInfo model
var admin_model = new mongoose.model("admin", adminSchema);

module.exports = {
  slider_model,
  about_model,
  portfolio_model,
  qualityPhoto_model,
  testimonial_model,
  news_model,
  enquiry_model,
  basicInfo_model,
  admin_model,
};
