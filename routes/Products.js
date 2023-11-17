const express = require('express');
const router = express.Router();
const upload = require('../config/multer.config');
const { Products, DetailProduct } = require("../models");
const { adminToken } = require('../middlewares/AdminMiddleware');


//-------------------Users--------------------

// Get all products
router.get('/all', async (req, res) => {

    try {
        const list = await Products.findAll({
            include: DetailProduct
        });
        // const details = await DetailProduct.findAll();

        // let arr = [];

        // for (let i = 0; i < list.length; i++) {
        //     for (let j = 0; j < details.length; j++) {
        //         if (list[i].id === details[j].id) {
        //             arr.push({
        //                 product: list[i],
        //                 details: details[j],
        //             });
        //         }
        //     }
        // }
        res.status(200).json(list);
    } catch (error) {
        res.status(400).json(error);
    }
})

// get only products
router.get('/product', async (req, res) => {

    try {
        const list = await Products.findAll();
        res.json(list);
    } catch (error) {
        res.status(400).json(error);
    }
})

// get product by id
router.get("/:id", async (req, res) => {

    try {

        const id = req.params.id;
        const product = await Products.findByPk(id);

        res.json(product);
    } catch (error) {
        res.status(400).json(error);
    }

})

// get by title
router.get('/by-title', async (req, res, next) => {

    try {
        const title = req.body.title;
        const name = title.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

        const list = await Products.findAll({ where: { name: name } });

        res.status(200).json(list);
    } catch (error) {
        res.status(400).json(error);
    }
})

// get by category
router.get('/by/:category', async (req, res, next) => {
    try {
        const category = req.params.category;
        const name = category.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        const list = await DetailProduct.findAll({
            where: {
                category: name

            },
            include: Products
        })
        res.status(200).json(list);
    } catch (error) {
        res.status(400).json('Lỗi server!');
    }
});

//--------------------Admin---------------------

// Make a new product
router.post("/admin", async (req, res) => {

    try {
        await Products.create(req.body);

        res.status(200).json("success")
    } catch (error) {
        res.status(400).json(error);
    }
})

// Delete a product
router.delete("/product/:id", async (req, res) => {

    try {
        const id = req.params.id;
        await Products.destroy({
            where: {
                id: id,
            },
        });
        res.json("success")
    } catch (error) {
        res.status(400).json(error);
    }
});

// update a product
router.put("/product/:id", async (req, res) => {

    try {
        const id = req.params.id;
        const product = req.body;
        await Products.update(product, { where: { id: id } });

        res.status(200).json("success");
    } catch (error) {
        res.status(400).json(error);
    }
});


module.exports = router;
