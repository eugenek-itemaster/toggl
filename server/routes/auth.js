const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

const AuthValidator = require('../validators/AuthValidator');
const AuthController = require('../controllers/AuthController');

/**
 * @method POST
 * @access public
 * @endpoint /api/auth/login
 * @desc Login
 **/
router.post('/', AuthValidator.login, AuthController.login);

/**
 * @method POST
 * @access public
 * @endpoint /api/auth/
 * @desc Authorization
 **/
router.get('/', authMiddleware, AuthController.auth);

module.exports = router;