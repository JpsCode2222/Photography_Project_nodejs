var express = require("express");
var mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/photography_nodejs");

module.exports = mongoose;
