const express = require('express')
const router = express.Router();
const { validateToken } = require("../middlewares/AuthMiddleware");
const {
    createBill, updateBill, deleteBill, getBillByUser, getCancelledBillByUser,
    getCompletedBillByUser, getProcessedBillByUser, getProcessingBillByUser,
    getShippingBillByUser, getBillById, getDeleteBill } = require('../controllers/Bill');

router.post('/', validateToken, createBill);

router.get('/:billdId', validateToken, getBillById);

router.get('/:userId', validateToken, getBillByUser);

router.get('/processed/:userId', validateToken, getProcessedBillByUser);

router.get('/processing/:userId', validateToken, getProcessingBillByUser);

router.get('/shipping/:userId', validateToken, getShippingBillByUser);

router.get('/completed/:userId', validateToken, getCompletedBillByUser);

router.get('/cancelled/:userId', validateToken, getCancelledBillByUser);

router.delete('/:billId', validateToken, deleteBill);

router.put('/:billId', validateToken, updateBill);

router.get('/', validateToken, getDeleteBill);

module.exports = router;

