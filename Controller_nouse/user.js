const express = require('express');
const router = express.Router();
const user = require('../Model/user');

//ROUTES
router.get('/', async (req, res) => {
    try {
        const posts = await user.find();
        res.json(posts);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;