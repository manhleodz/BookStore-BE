const { Bill, Cart, Products } = require('../models');

async function getBillByUser(req, res, next) {

    try {
        const userId = req.params.userId;

        const bill = await Bill.findAll({ where: { UserId: userId } });

        res.status(200).json(bill);
    } catch (err) {
        res.status(404).json({ error: err });
    }
}

async function getBillById(req, res, next) {

    try {

        const id = req.params.billdId;
        const bill = await Bill.findByPk(
            id, {
            include: {
                model: Cart,
                include: [Products]
            },
        });

        res.status(200).json(bill);
    } catch (error) {
        res.status(404).json(error);
    }
}

async function getProcessedBillByUser(req, res, next) {

    try {
        const userId = req.params.userId;

        const bill = await Bill.findAll({
            where: {
                UserId: userId,
                status: 'đã xử lý'
            }
        });

        res.status(200).json(bill);
    } catch (err) {
        res.status(404).json({ error: err });
    }
}

async function getProcessingBillByUser(req, res, next) {

    try {
        const userId = req.params.userId;

        const bill = await Bill.findAll({
            where: {
                UserId: userId,
                status: 'đang xử lý'
            }
        });

        res.status(200).json(bill);
    } catch (err) {
        res.status(404).json({ error: err });
    }
}

async function getShippingBillByUser(req, res, next) {

    try {
        const userId = req.params.userId;

        const bill = await Bill.findAll({
            where: {
                UserId: userId,
                status: 'đang vận chuyển'
            }
        });

        res.status(200).json(bill);
    } catch (err) {
        res.status(404).json({ error: err });
    }
}

async function getCompletedBillByUser(req, res, next) {

    try {
        const userId = req.params.userId;

        const bill = await Bill.findAll({
            where: {
                UserId: userId,
                status: 'hoàn thành'
            }
        });

        res.status(200).json(bill);
    } catch (err) {
        res.status(404).json({ error: err });
    }
}

async function getCancelledBillByUser(req, res, next) {

    try {
        const userId = req.params.userId;

        const bill = await Bill.findAll({
            where: {
                UserId: userId,
                status: 'đã hủy'
            }
        });

        res.status(200).json(bill);
    } catch (err) {
        res.status(404).json({ error: err });
    }
}

async function createBill(req, res, next) {

    try {
        const data = req.body;
        const bill = await Bill.create(data);

        res.status(200).json(bill);
    } catch (err) {
        res.status(404).json({ error: err });
    }
}

async function deleteBill(req, res, next) {

    try {
        const id = req.params.billId;
        await Bill.destroy({ where: { id: id } });

        res.status(200).json("success");
    } catch (err) {
        res.status(404).json({ error: err });
    }
}

async function updateBill(req, res, next) {

    try {
        const id = req.params.billId;
        const data = req.body;
        await Bill.update(data, { where: { id: id } });
        res.status(200).json("success");
    } catch (err) {
        res.status(404).json({ error: err });
    }
}

async function getDeleteBill(req, res, next) {

    var list = await Bill.findAll({
        where: {
            status:'đang xử lý',
        }
    })

    const date = Date.now();

    res.status(200).json(date);
}

module.exports = {
    createBill,
    deleteBill,
    updateBill,
    getBillByUser,
    getProcessedBillByUser,
    getProcessingBillByUser,
    getCompletedBillByUser,
    getShippingBillByUser,
    getCancelledBillByUser,
    getBillById,
    getDeleteBill
}