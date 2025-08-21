const express = require('express');
const router = express.Router();
const { add, getAll, getById, update, remove } = require('../controllers/birdController');
const auth = require('../middleware/authMiddleware');

router.post('/birds', auth, add);
router.get('/birds', auth, getAll);
router.get('/birds/:id', auth, getById);
router.put('/birds/:id', auth, update);
router.delete('/birds/:id', auth, remove);

module.exports = router;