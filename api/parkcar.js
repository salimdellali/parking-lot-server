const express = require('express');
const router = express.Router();
const rateLimiter = require('../middlewares/rateLimiter');
const ParkingLotSingleton = require('../models/ParkingLotSingleton');
const { isCarIdValid } = require('../helpers/utilities');

const parkingLot = ParkingLotSingleton.getInstance();

/**
 * @route	POST api/parkcar
 * @desc	park a car
 * @access	Public
 */
router.post('/:carid', rateLimiter, (req, res) => {
	const carId = req.params.carid;

	if (!isCarIdValid(carId))
		return res
			.status(400)
			.send(
				"Car ID incorrect, please submit a corect car ID in a format like 'car_#####' where # is a digit"
			);

	if (parkingLot.isCarIdExisting(carId))
		return res.status(400).send(`Car with ID: ${carId} is already parked`);

	if (parkingLot.isParkingLotFull())
		return res.status(400).send(`Parking lot full`);

	const emptySlot = parkingLot.getEmptySlot();
	parkingLot.parkCar(emptySlot, carId);
	console.log(parkingLot.getParkingLot());
	return res
		.status(200)
		.send(`Car with ID: ${carId} is parked at the slot ID: ${emptySlot}`);
});

module.exports = router;
