const express = require('express');
const router = express.Router();
const rateLimiter = require('../middlewares/rateLimiter');
const ParkingLotSingleton = require('../models/ParkingLotSingleton');

const parkingLot = ParkingLotSingleton.getInstance();

/**
 * @route	POST api/unparkcar
 * @desc	unpark a car
 * @access	Public
 */
router.post('/', rateLimiter, (req, res) => {
	res.send('you are on POST /unparkcar');
	parkingLot.unparkCar('slot_1');
	console.log(parkingLot.getParkingLot());
});

module.exports = router;
