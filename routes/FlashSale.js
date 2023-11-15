const express = require('express');
const router = express.Router();
const { FlashSale, Products, DetailProduct } = require("../models");

router.get('/', async (req, res) => {

    try {
        const listFlashSale = await FlashSale.findAll();
        res.json(listFlashSale)
    } catch (error) {
        res.status(404).json(error);
    }
})

router.get('/products', async (req, res) => {

    try {
        const listFlashSale = await FlashSale.findAll({
            include: {
                model: Products,
                include: [DetailProduct]
            }
        });
        
        res.status(200).json(listFlashSale);
    } catch (err) {
        res.status(404).json(err);
    }
});

// router.get('/:id', async (req, res) => {
//     const id = req.params.id
//     const FlashSale = await FlashSale.findByPk(id);
//     res.json(FlashSale)
// })

router.post('/', async (req, res) => {
    await FlashSale.create(req.body)
    res.json('success')
})

router.put('/:id', async (req, res) => {
    const id = req.params.id
    const FlashSale = {
        name: req.body.name,
        code: req.body.code,
        quantity: req.body.quantity
    }
    await FlashSale.update(FlashSale, { where: { id: id } })
    res.json('success')
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    await FlashSale.destroy({
        where: { id: id },
    })
    res.json('success')
})

module.exports = router;