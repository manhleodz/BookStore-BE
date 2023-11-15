const express = require('express');
const router = express.Router();
const { validateToken } = require('../middlewares/AuthMiddleware');
const {getByProductId, getByUserId, postNewComment, deleteComment, ChangeComment} = require('../controllers/Comments');


router.get('/product/:productId', getByProductId);

router.get('/user',validateToken, getByUserId);

router.post('/product/:productId', validateToken,  postNewComment);

router.delete('/:id', validateToken, deleteComment);

router.put('/:id', validateToken, ChangeComment);

module.exports = router;
