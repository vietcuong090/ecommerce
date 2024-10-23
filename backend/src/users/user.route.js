const express = require('express');
const User = require('./user.model');
const router = express.Router();

// Register endpoint
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ email, username, password });
    await user.save();
    res.status(201).send({ message: 'User registered successfully' });
  } catch (error) {
    console.log('Error registering user', error);
    res.status(500).send({ message: 'Error registered user' });
  }
});

module.exports = router;
// 6:37:14
