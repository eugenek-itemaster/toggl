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

/**
 * @method GET
 * @access public
 * @endpoint /api/tracker/managers
 * @desc Users list
 **/
router.get('/managers', authMiddleware, TrackerController.getManagers);

/**
 * @method GET
 * @access public
 * @endpoint /api/tracker/stop/:userId
 * @desc Users list
 **/
router.get('/stop/:userId', authMiddleware, TrackerController.stopTracker);

module.exports = router;