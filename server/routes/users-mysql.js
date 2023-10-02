const express = require('express');
const router = express.Router();
const config = require('config');
const authMiddleware = require('../middleware/auth');

const UserValidator = require('../validators/UserValidator');
const UserController = require('../controllers/UserController');

/**
 * @method GET
 * @access public
 * @endpoint /api/users/
 * @desc Users list
 **/
router.get('/', [], UserController.getMysqlUsers);

/**
 * @method GET
 * @access public
 * @endpoint /api/users/<userId>
 * @desc Get user by id
 **/
router.get('/:userId', authMiddleware, UserController.getUser);

/**
 * @method POST
 * @access public
 * @endpoint /api/users/
 * @desc Create user
 **/
router.post('/', [authMiddleware, UserValidator.create], UserController.createUser);

/**
 * @method DELETE
 * @access public
 * @endpoint /api/users/<userId>
 * @desc Delete user
 **/
router.delete('/:userId', authMiddleware, UserController.deleteUser);

/**
 * @method PUT
 * @access public
 * @endpoint /api/users/<userId>
 * @desc Update user
 **/
router.put('/:userId', [authMiddleware, UserValidator.update], UserController.updateUser);

module.exports = router;