const { verifyAccessToken } = require("./jwt");
const asyncHandler = require("express-async-handler");

let token;

const protectedMW = asyncHandler(async (req, res, next) => {
    if (req.header.authorization && req.header.authorization.startsWith('Bearer')) {
        try {
            token = req.header.authorization.split(' ')[1];
            const decoded = await verifyAccessToken(token);
            console.log(decoded);
            req.user = decoded.userId;
            next();
        } catch (error) {
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    }
});

module.exports = {protectedMW};

