const jwt = require('jsonwebtoken');
require('dotenv').config();
// Secret key for signing JWT tokens
const JWT_SECRET = process.env.JWT_SECRET;

// Function to sign a JWT access token
const signAccessToken =   (userId) => {
    return  jwt.sign({ userId }, JWT_SECRET);
}

const verifyAccessToken =  (token) => {
    return  jwt.verify(token, JWT_SECRET);
};
let token = signAccessToken(1);

module.exports = { signAccessToken, verifyAccessToken };