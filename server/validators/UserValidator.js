const { check, validationResult } = require('express-validator');
const UserRepository = require("../repositories/UserRepository");
const {ROLE_DEVELOPER} = require("../constants/constans");

const create = [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').isEmail().custom(async email => {
        let user = await UserRepository.getByEmail(email);
        if (user !== null) {
            throw 'User already exists.';
        }

    }),
    check('password', 'Password is required').isLength({ min: 6 }),
    check('role', 'Role required').not().isEmpty(),
    check('parent_id').custom((parent_id, {req}) => {
        if (req.body.role === ROLE_DEVELOPER && !parent_id) {
            throw 'Manager required for "Developer" role.';
        }

        return true;

    }),
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(401).json({errors: errors.array()});
        }

        next();
    },
]

const update = [
    check('userId', 'User not found').not().isEmpty().custom(async userId => {
        let user = await UserRepository.getById(userId);
        if (user === null) {
            throw "User not found";
        }
    }),
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').isEmail().custom(async (email, {req}) => {
        let newEmailUser = await UserRepository.getByEmailAndNotId(email, req.params.userId);

        if (newEmailUser.length > 0) {
            throw 'User with this email already exists';
        }

    }),
    check('role', 'Role required').not().isEmpty(),
    check('parent_id', '').custom((parent_id, {req}) => {
        if (req.body.role === ROLE_DEVELOPER && !parent_id) {
            throw 'Manager required for "Developer" role.';
        }

        return true;
    }),
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(401).json({errors: errors.array()});
        }

        next();
    },
]

module.exports = {
    create,
    update
}