const express = require('express');
const router = express.Router();
const { validateToken } = require('../middlewares/AuthMiddleware');

const { DetailProduct, ImageProducts, Products, Comments } = require("../models");


// get detail product ny id
router.get("/:id", async (req, res) => {

    try {
        const id = req.params.id;
        const detail = await DetailProduct.findAll(
            {
                where: { id: id },

                include: [{
                    model: Products,
                },
                {
                    model: ImageProducts,
                }]
            }
        );

        res.json(detail);
    } catch (error) {
        res.status(400).json(error);
    }
})


// make detail product by id
router.post("/admin", async (req, res) => {

    await DetailProduct.create(req.body);
    res.json("success");
});

// update detail product by id
router.put("/:id", validateToken, async (req, res) => {
    const id = req.params.id;
    const detail = req.body;

    await DetailProduct.update(detail, { where: { id: id } });

    res.json("success");
})

//update rating by id
router.put("/rating/:id", validateToken, async (req, res) => {

    const id = req.params.id;
    const detail = await DetailProduct.findByPk(id, {
        include: {
            model: Products,
            include: [Comments]
        }
    });

    if (detail.Product.Comments.length > 0) {
        let star = 0;
        for (let i of detail.Product.Comments) {
            star += i.rating;
        }

        star = star / detail.Product.Comments.length;

        const rating = Math.floor((star * 10)) / 10;

        await DetailProduct.update({
            ratingstars: rating
        }, {
            where: { id: id }
        });

        res.status(200).json("success");
    } else {
        await DetailProduct.update({
            ratingstars: 0
        }, {
            where: { id: id }
        });

        res.status(200).json("success");
    }
});

module.exports = router;