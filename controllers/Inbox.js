const { Inbox } = require('../models');

async function getInbox(req, res, next) {

    try {
        const userId = req.user.id;
        const messageList1 = await Inbox.findAll({
            where: {
                UserId: userId,
            }
        });

        res.status(200).json(messageList1);
    } catch (err) {

        res.status(400).json(err);
    }
}

async function sendMessage(req, res, next) {

    try {

        const data = {
            message: req.body.message,
            UserId: req.user.id,
            receiver: req.body.receiver,
            author: req.body.author,
            room: req.body.room,
            time: req.body.time,
        }

        await Inbox.create(data);
        res.status(200).json(data);
    } catch (err) {
        res.status(400).json(err);
    }
}

module.exports = {
    getInbox,
    sendMessage
}