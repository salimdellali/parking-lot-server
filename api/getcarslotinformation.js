const express = require('express');
const router = express.Router();
const rateLimiter = require('../middlewares/rateLimiter');
const ParkingLotSingleton = require('../models/ParkingLotSingleton');
const {
	isCarIdValid,
	isSlotIdValid,
	getPrefix,
} = require('../helpers/utilities');

const parkingLot = ParkingLotSingleton.getInstance();

/**
 * @route GET api/getcarslotinformation
 * @desc get the car and slot information
 * @access Public
 */
router.get('/:id', rateLimiter, (req, res) => {
	const id = req.params.id;

	if (!isCarIdValid(id) && !isSlotIdValid(id))
		return res
			.status(400)
			.send(
				"Incorrect car ID or slot ID, please submit a correct ID in a format like 'car_#####' or a correct slot ID in a format like 'slot_#####' where # is a digit"
			);

	// if user is trying to get information based on carId
	if (getPrefix(id) === 'car_') {
		if (!parkingLot.isCarIdExisting(id))
			return res.status(200).send(`Car with ID: ${id} is not parked`);

		const { slotId, carId } = parkingLot.getSlotInformationByCar(id);
		return res
			.status(200)
			.send(`Car with ID: ${carId} parked at slot ID: ${slotId}`);
	}

	// if user is trying to get information based on slotId
	if (getPrefix(id) === 'slot_') {
		if (!parkingLot.isSlotExisting(id))
			return res.status(400).send(`slot ID: ${id} does not exist`);

		const { slotId, carId } = parkingLot.getSlotInformationBySlotId(id);

		const message =
			carId === null
				? `No car parked at slot ID: ${slotId}`
				: `Car with ID: ${carId} parked at slot ID: ${slotId}`;

		return res.status(200).send(message);
	}

	// if user's input is invalid I don't know how lol xD just in case
	if (getPrefix(id) === 'invalid') {
		return res.status(400).send('input data invalid');
	}
});

module.exports = router;
