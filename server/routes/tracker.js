const express = require('express');
const router = express.Router();
const config = require('config');
const authMiddleware = require('../middleware/auth');

const TrackerController = require('../controllers/TrackerController');

/**
 * @method GET
 * @access public
 * @endpoint /api/tracker/developers
 * @desc Users list
 **/
router.get('/developers', authMiddleware, TrackerController.getDevelopers);

module.exports = router;