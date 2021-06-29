import express, { Request, Response, Router } from 'express';
import { rateLimiter } from '../middlewares/rateLimiter';
import { ParkingLotSingleton } from '../models/ParkingLotSingleton';
import { isSlotIdValid } from '../helpers/utilities';

const router: Router = express.Router();
const parkingLot = ParkingLotSingleton.getInstance();

/**
 * @route	PUT api/unparkcar
 * @desc	unpark a car
 * @access	Public
 */
export default router.put(
	'/:slotid',
	rateLimiter,
	(req: Request, res: Response) => {
		const slotId: string = req.params.slotid;

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
	}
);
