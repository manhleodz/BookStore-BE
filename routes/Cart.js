const express = require('express')
const router = express.Router();
const { Op } = require("sequelize");
const { validateToken } = require("../middlewares/AuthMiddleware");
const { Cart, Products } = require('../models');

//get cart
router.get('/', async (req, res) => {

    try {
        const listCart = await Cart.findAll({
            where: { BilldId: null }
        })
        res.json(listCart)

    } catch (error) {
        res.status(400).json(error);
    }
})

//get cart by id
router.get('/:id', validateToken, async (req, res) => {

    // try {
    const id = req.params.id;
    const cart = await Cart.findAll({
        where: {
            UserId: id,
            BillId: {
                [Op.is]: null,
            }
        },
        include: Products
    });

    res.status(200).json(cart);
    // } catch (error) {
    //     res.status(400).json(error);
    // }
})

//get cart by bill id
router.get('/bill/:billId', validateToken, async (req, res) => {

    try {
        const billId = req.params.billId;
        const userId = req.user.id;
        const cart = await Cart.findAll({
            where: { BillId: billId },
            include: Products
        });


        res.json(cart);
    } catch (err) {
        res.status(404).json(err);
    }
})

// user add product to cart
router.post('/', validateToken, async (req, res) => {

    try {
        const productId = req.body.ProductId;
        const amount = req.body.amount;
        const product = await Products.findByPk(productId);
        if (product.quantity - product.sold >= Number(amount)) {
            await Cart.create(req.body);
            res.status(200).json('Success');
        } else {
            res.status(400).json('Số lượng sản phầm còn lại không đủ');
        }
    } catch (error) {
        res.status(404).json(error);
    }
});

//update cart
router.put('/:id', validateToken, async (req, res) => {

    try {
        const id = req.params.id;
        const data = req.body;

        await Cart.update(data, { where: { id: id } });

    } catch (err) {
        res.status(404).json({ error: err });
    }
});

// buy products in cart
router.put('', validateToken, async (req, res) => {

    const ids = req.body.ids;
    const BillId = req.body.BillId;

    await Cart.update({BillId: BillId}, {
        where: {
            id: {
                [Op.in]: ids
            }
        }
    });

    res.status(200).json("success");
});

// delete product by id

router.delete('/:id', validateToken, async (req, res) => {

    try {

        await Cart.destroy({ where: { id: req.params.id } });

        res.json('Success');
    } catch (error) {
        res.status(400).json(error)
    }
});

router.put('/fix/quantity', validateToken, async (req, res) => {

    try {
        const id = req.body.id;
        const amount = {
            amount: req.body.amount,
            total: req.body.total
        };

        const cart = await Cart.findByPk(id, {
            include: Products
        });

        if (cart.Product.quantity - cart.Product.sold >= Number(amount.amount)) {

            await Cart.update(amount, { where: { id: id } });
            res.status(200).json('success');
        } else {
            res.status(400).json("Số lượng sản phẩm còn lại không đủ");
        }
    } catch (err) {

        res.status(404).json(err);
    }
});

module.exports = router;