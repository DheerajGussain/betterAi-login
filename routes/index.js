var express = require('express');
var router = express.Router();
const User = require('../models/user');
const db = require('../db') 

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Login Form' });
});

router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Login Form' });
});
router.get('/home', function(req, res, next) {
  res.render('home', { title: 'Login Form' });
});

router.post('/signup', async (req, res) => {
  const {name,lastName, userName,email, password } = req.body;
  try {
    const existingUser = await User.findOne({ userName });
    if (existingUser) {
      return res.render('error', { message: 'Username already exists', status : '400' });

    }

    const newUser = new User({
      name,
      lastName,
      userName,
      email,
      password,
    });

    const savedUser = await newUser.save();
    // res.json(savedUser);
    return res.render('login', { message: 'user signed up successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });

    if (!user) {
      return res.render('error', { message: 'invalid username', status : '401' });
    }

    const passwordMatch = (password === user.password);

    if (!passwordMatch) {
      return res.render('error', { message: 'invalid password', status : '401' });

    }

    console.log('User logged in successfully:', user);

    // res.status(200).json({ message: 'User logged in successfully' });
    return res.render('home', { message: 'user logged in successfully', status : '401' });
  } catch (error) {
    console.error('Error occurred during login', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

});

module.exports = router;
