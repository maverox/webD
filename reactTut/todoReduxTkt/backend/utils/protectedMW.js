const jwt = require('jsonwebtoken');
const { verifyAccessToken } = require('./jwt');

const protectedMW = (req, res, next) => {
    // Get the token from the request headers
    let token = req.headers.authorization;
    // Check if the token exists
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        // Verify the token
        token = token.split(' ')[1];
        const decoded = jwt.verify(token, 'uzairslittlesecret');
        // Attach the decoded token to the request object
        req.user = {
            id: decoded.userId,
        }

        // Call the next middleware or route handler
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = {protectedMW};


