var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const StudentModel = require('../models/student.model');
const studentModel = require('../models/student.model');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Route Student path');
});

router.post('/add', function(req, res, next) {
  let newStudent = new StudentModel({
	  firstName: req.body.firstName,
	  lastName: req.body.lastName,
	  login: req.body.login,
	  age: req.body.age
  })
  newStudent.save(function(err, newStudent) {
    if (err)
      res.send(err)
    else
      res.send({status: 200,message: 'User added Successfully', studentObj:newStudent});
  })

});


router.get('/list', function(req, res) {
  StudentModel.find(function(err, reponse){
    if (err)
      res.send(err);
    else
      res.send({status:200,resultsFound: reponse.lenght,students: reponse});
  });
});


router.get('/searchByFirstName', function(req, res) {
  let firstNameQuery = req.query.firstName;
  StudentModel.find({firstName: firstNameQuery},function(err, reponse){
    if (err)
      res.send(err);
    else
      res.send({status:200, resultsFound: reponse.lenght,students: reponse});
  });
});

router.get('/searchById', function(req, res, next) {
  const ID = req.query.id;
  StudentModel.findById(ID,function(err, reponse){
    if (err)
      res.send(err);
    else
      res.send({status:200, students: reponse});
  });
});
module.exports = router;