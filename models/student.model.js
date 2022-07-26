const mongoose = require('mongoose');

var studentShema = mongoose.Schema({
	studentId: Number,
	firstName: String,
	lastName: String,
	login: String,
	age: Number
  });
  
  var StudentModel = mongoose.model("Student", studentShema);

  module.exports = StudentModel;