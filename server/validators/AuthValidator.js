const { check, validationResult } = require('express-validator');

const login = [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').exists(),
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(401).json({errors: errors.array()});
        }

        next();
    },
];

module.exports = {
    login
}