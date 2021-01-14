/* eslint-disable */
var passport = require('passport');
require('../config/passport')(passport);
var express = require('express');
var router = express.Router();
var User = require("../models/user");

const upload = require("../multer/storage");
const fs = require("fs");

/* GET ALL USERS */
router.get('/', passport.authenticate('jwt', { session: false }), function(req, res) {
var token = getToken(req.headers);
	if (token) {
		User.find({}, (err, users) => {
			if (err) return next(err);
		res.json(users);
		});
	} else {
	  	return res.status(403).send({success: false, msg: 'Unauthorized.'});
	}
}); 

/* var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

 MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  dbo.collection("customers").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
}); */

/*router.get('/users',function(req, res) {
	res.send('hi')
})*/

/* UPDATE User */
router.put('/:id', function(req, res, next) {
	User.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
	  if (err) return err;
	  res.json(post);
	});
});

module.exports = router;