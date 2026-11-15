// register and login routes
var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var User = require('../models/User');

var router = express.Router();

// register: make a new user, then give them a token
router.post('/register', function (req, res) {
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'please fill all the fields' });
  }

  // first check if this email is already used
  User.findOne({ email: email.toLowerCase() }).then(function (existingUser) {
    if (existingUser) {
      return res.status(400).json({ message: 'email already registered' });
    }

    // password gets hashed automatically in User.js before save
    var newUser = new User({ name: name, email: email, password: password });

    return newUser.save().then(function (savedUser) {
      // token = the entry pass, expires in 1 day
      var token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

      res.status(201).json({
        token: token,
        user: { id: savedUser._id, name: savedUser.name, email: savedUser.email }
      });
    });
  }).catch(function (err) {
    res.status(500).json({ message: err.message });
  });
});

// login: check email + password, then give a token
router.post('/login', function (req, res) {
  var email = req.body.email;
  var password = req.body.password;

  if (!email || !password) {
    return res.status(400).json({ message: 'please enter email and password' });
  }

  User.findOne({ email: email.toLowerCase() }).then(function (user) {
    if (!user) {
      return res.status(400).json({ message: 'wrong email or password' });
    }

    // compare typed password with the hashed one in the db
    return bcrypt.compare(password, user.password).then(function (isMatch) {
      if (!isMatch) {
        return res.status(400).json({ message: 'wrong email or password' });
      }

      var token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

      res.json({
        token: token,
        user: { id: user._id, name: user.name, email: user.email }
      });
    });
  }).catch(function (err) {
    res.status(500).json({ message: err.message });
  });
});

module.exports = router;