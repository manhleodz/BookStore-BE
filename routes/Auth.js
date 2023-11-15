const express = require('express');
const router = express.Router();

const { Users } = require("../models");
const { validateToken } = require('../middlewares/AuthMiddleware');
const { signup, login, verify1, sendMail } = require('../controllers/Auth');

// sign up
router.post("/", signup);

// login
router.post('/login', login);

// check user token
router.get("/", validateToken, async (req, res) => {

    try {
        res.json(req.user)

    } catch (error) {
        res.status(400).json(error);
    }
});

// get user by id 
router.get('/user/:id', async (req, res) => {

    try {

        const id = req.params.id;
        const user = await Users.findByPk(id);
        res.status(200).json(user);
    } catch (err) {

        res.status(400).json(err)
    }

})

// get owner profile by id
router.get("/profile", validateToken, async (req, res) => {

    try {
        const id = req.user.id;
        const info = await Users.findByPk(id);

        res.status(200).json(info);
    } catch (err) {
        res.status(400).json(err);
    }
});

// send code to verified user
router.post("/verify", verify1);

//sendMail to shop
router.post('/sendMail', sendMail);

// Change userin4
router.put('/changeinfo/:userId', validateToken, async (req, res) => {

    try {

        const id = req.params.userId;
        const data = req.body;
        const username = req.body.username;
        const email = req.body.email;
        const phone = req.body.phone;

        let excuting = true;

        const listUser = await Users.findAll();
        let arr = listUser.filter(user => {
            return user.username === username || user.email === email;
        })

        if (arr.length > 1) {
            excuting = false;
        }

        if (excuting) {
            await Users.update(data, { where: { id: id } });
            res.json("success");
        } else {
            res.status(400).json("Email hoặc tên người dùng đã tồn tại");
        }
    } catch (err) {

        res.status(400).json(err);
    }
});

router.get("/all", async (req, res) => {

    try {
        const listUser = await Users.findAll();
        res.json(listUser);
    } catch (err) {

        res.status(400).json(err);
    }
});

module.exports = router;
