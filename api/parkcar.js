const express = require('express');
const router = express.Router();
const rateLimiter = require('../middlewares/rateLimiter');
const ParkingLotSingleton = require('../models/ParkingLotSingleton');

const parkingLot = ParkingLotSingleton.getInstance();

/**
 * @route	POST api/parkcar
 * @desc	park a car
 * @access	Public
 */
router.post('/', rateLimiter, (req, res) => {
	res.send('you are on POST /parkcar');
	parkingLot.parkCar('slot_1', 'car_00123');
	parkingLot.parkCar('slot_2', 'car_00456');
	console.log(parkingLot.getParkingLot());
});

module.exports = router;
