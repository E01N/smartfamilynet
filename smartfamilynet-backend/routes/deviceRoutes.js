const express = require('express');
const router = express.Router();
const { registerDevice } = require('../controllers/deviceController');
const auth = require('../middleware/auth'); // optional

router.post('/register', registerDevice);

module.exports = router;
