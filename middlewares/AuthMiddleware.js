const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {

    try {

        const accessToken = req.header("accessToken");

        if (!accessToken) return res.json({ error: "User not logged in!" });

        try {
            const validToken = verify(accessToken, "manhleosecret");
            req.user = validToken;
            if (validToken) {
                return next();
            }
        } catch (err) {
            return res.json({ error: err });
        }

    } catch (error) {
        res.status(400).json(error);
    }
};

module.exports = { validateToken };