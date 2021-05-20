const express = require('express');
const router = express.Router();
const rateLimiter = require('../middlewares/rateLimiter');
const ParkingLotSingleton = require('../models/ParkingLotSingleton');
const { isCarIdValid } = require('../helpers/utilities');

const parkingLot = ParkingLotSingleton.getInstance();

/**
 * @route	POST api/unparkcar
 * @desc	unpark a car
 * @access	Public
 */
router.post('/:carid', rateLimiter, (req, res) => {
	const carId = req.params.carid;

	if (!isCarIdValid(carId))
		return res
			.status(400)
			.send(
				"Car ID incorrect, please submit a correct car ID in a format like 'car_#####' where # is a digit"
			);

	if (!parkingLot.isCarIdExisting(carId))
		return res.status(400).send(`Car with ID: ${carId} is not parked`);

	const parkedSlot = parkingLot.getParkingSlot(carId);
	parkingLot.unparkCar(parkedSlot);
	console.log(parkingLot.getParkingLot());
	return res
		.status(200)
		.send(
			`Car with ID: ${carId} unparked, slot ID: ${parkedSlot} is now empty`
		);
});

module.exports = router;
