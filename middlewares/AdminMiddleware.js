const { verify } = require("jsonwebtoken");

const adminToken = (req, res, next) => {
    const accessToken = req.header("adminToken");

    if (!accessToken) return res.json({ error: "You are not admin" });

    try {
        const validToken = verify(accessToken, "manhleosecret2");
        req.user = validToken;
        if (validToken) {
            return next();
        }
    } catch (err) {
        return res.json({ error: err });
    }
};

module.exports = { adminToken };