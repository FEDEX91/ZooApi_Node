const express = require('express');
const router = express.Router();
const { addBird } = require('../controllers/birdController');
const auth = require('../middleware/authMiddleware');

router.post('/birds', auth, addBird);

module.exports = router;