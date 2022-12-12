const express = require('express');
const router = express.Router();

// // Import Routes
const user = require('./user');

router.get('/user', async (req, res) => {
    try {
        const posts = await user.getAll();
        res.json(posts);
    } catch (err) {
        res.json({ message: err });
    }
  });

 module.exports = router;