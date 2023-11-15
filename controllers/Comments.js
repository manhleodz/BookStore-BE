const { Comments, Users, Products } = require('../models');

async function getByProductId(req, res, next) {

    try {
        let id = req.params.productId;
        const list = await Comments.findAll(
            {
                where: {
                    ProductId: id
                },

                include: Users,
            }
        );
        res.status(200).json((list));
    } catch (err) {
        res.status(400).json(err);
    }
}

async function getByUserId(req, res, next) {

    try {
        let userId = req.user.id;
        const list = await Comments.findAll({
            where: { UserId: userId },
            include: Products
        });
        res.status(200).json((list));
    } catch (err) {
        res.status(400).json(err);
    }
}

async function postNewComment(req, res, next) {

    try {
        const data = req.body;
        await Comments.create(data);
        res.status(200).json("success");
    } catch (err) {
        res.status(400).json(err);
    }
}

async function ChangeComment(req, res, next) {

    try {
        const id = req.params.id;
        const data = req.body;
        await Comments.update(data, { where: { id: id } });
        res.status(200).json("success");
    } catch (err) {
        res.status(400).json(err);
    }
}

async function deleteComment(req, res, next) {

    try {
        const id = req.params.id;
        await Comments.destroy({
            where: {
                id: id,
            },
        });
        res.status(200).json("success");
    } catch (err) {
        res.status(400).json(err);
    }
}

module.exports = {
    getByProductId,
    getByUserId,
    postNewComment,
    deleteComment,
    ChangeComment,
}

