const jwt = require('jsonwebtoken');
require('dotenv').config();
// Secret key for signing JWT tokens
const JWT_SECRET = process.env.JWT_SECRET;

// Function to sign a JWT access token
const signAccessToken =  async (userId) => {
    return await jwt.sign({ userId }, JWT_SECRET, {
        expiresIn: '30d'
    });
}

const verifyAccessToken = async (token) => {
    return await jwt.verify(token, JWT_SECRET);
};
module.exports = { signAccessToken, verifyAccessToken };