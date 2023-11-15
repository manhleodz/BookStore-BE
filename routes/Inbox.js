const express = require('express');
const router = express.Router();
const { validateToken } = require('../middlewares/AuthMiddleware');
const { getInbox, sendMessage } = require('../controllers/Inbox');


router.get('/:userId', validateToken, getInbox);

router.post('/:userId', validateToken, sendMessage);

module.exports = router;
