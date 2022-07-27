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

router.put('/update', function(req, res, next) {
  const Name = req.query.firstName;
  StudentModel.update({age: 22},{firstName: Name},function(err, reponse){
    if (err)
      res.send(err);
    else
      res.send({status:200, students: reponse});
  });
});

router.put('/updateUser', function(req, res, next) {
  const ID = req.query.id;
  const Age = req.query.age;
  StudentModel.findByIdAndUpdate(ID,{age: Age},function(err, reponse){
    if (err)
      res.send(err);
    else
      res.send({status:200, students: reponse});
  });
});

/*
  update-> it will update all matching documents based on query
  findByIdAndUpdate-> it will single matching document and update it
  findOneAndUpdate-> it will match the first document and update

  model.ubdate({query}, {updateData}, function(err, response))
*/
router.put('/updateOneUser', function(req, res, next) {
  const ID = req.query.id;
  const Age = req.query.age;
  StudentModel.findOneAndUpdate(ID,{age: Age},function(err, reponse){
    if (err)
      res.send(err);
    else
      res.send({status:200, students: reponse});
  });
});

router.delete('/deleteUser', function(req, res, next) {
  const ID = req.query.id;
  StudentModel.findByIdAndRemove(ID, function(err, reponse){
    if (err)
      res.send(err);
    else
      res.send({status:200, students: reponse});
  });
});

/*
  Remove
  findByIdAndRemove
  deleteOne
  findByIdAndDelete
  findOneAndRemove
*/
module.exports = router;