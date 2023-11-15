const jwt = require('jsonwebtoken');

module.exports = (request, response, next) => {
    const token = request.header('x-auth-token');

    if (!token) {
        response.status(401).json({ message: "No token, authorisation denied." });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        request.user = decoded.user;
        request.source = decoded.source;

        next();
    } catch (error) {
        response.status(401).json({ message: "Token is not valid" });
    }
}