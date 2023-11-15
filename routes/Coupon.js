const express = require('express');
const router = express.Router();
const { Coupon } = require("../models");

router.get('/', async (req, res) => {

    try {
        const listCoupon = await Coupon.findAll();
        res.json(listCoupon)
    } catch (error) {

        res.status(400).json(error);
    }

})

router.get('/:id', async (req, res) => {

    try {
        const id = req.params.id
        const coupon = await Coupon.findByPk(id);
        res.json(coupon)
    } catch (error) {
        res.status(400).json(error);
    }
})

router.post('/', async (req, res) => {

    try {
        await Coupon.create(req.body)
        res.status(200).json('success')
    } catch (error) {
        res.status(400).json(error);
    }

})

router.put('/:id', async (req, res) => {

    try {
        const id = req.params.id
        const coupon = {
            name: req.body.name,
            code: req.body.code,
            quantity: req.body.quantity
        }
        await Coupon.update(coupon, { where: { id: id } })
        res.json('success')
    } catch (error) {
        res.status(400).json(error);
    }
})

router.delete('/:id', async (req, res) => {

    try {
        const id = req.params.id
        await Coupon.destroy({
            where: { id: id },
        })
        res.json('success')
    } catch (error) {
        res.status(400).json(error);
    }
})

module.exports = router;