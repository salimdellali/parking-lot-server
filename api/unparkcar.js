const express = require('express');
const router = express.Router();
const rateLimiter = require('../middlewares/rateLimiter');
const ParkingLotSingleton = require('../models/ParkingLotSingleton');
const { isSlotIdValid } = require('../helpers/utilities');

const parkingLot = ParkingLotSingleton.getInstance();

/**
 * @route	POST api/unparkcar
 * @desc	unpark a car
 * @access	Public
 */
router.put('/:slotid', rateLimiter, (req, res) => {
	const slotId = req.params.slotid;

	if (!isSlotIdValid(slotId))
		return res
			.status(400)
			.send(
				"Slot ID incorrect, please submit a correct slot ID in a format like 'slot_#####' where # is a digit"
			);

	if (!parkingLot.isSlotExisting(slotId))
		return res.status(400).send(`slot ID: ${slotId} does not exist`);

	const { carId } = parkingLot.getSlotInformationBySlotId(slotId);
	if (carId === null)
		return res.status(400).send(`No car parked at slot ID: ${slotId}`);

	parkingLot.unparkCar(slotId);
	return res
		.status(200)
		.send(`Car with ID: ${carId} unparked, slot ID: ${slotId} is now empty`);
});

module.exports = router;
