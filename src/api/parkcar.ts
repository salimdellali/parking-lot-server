import express, { Request, Response, Router } from 'express';
import { rateLimiter } from '../middlewares/rateLimiter';
import { ParkingLotSingleton } from '../models/ParkingLotSingleton';
import { isCarIdValid } from '../helpers/utilities';

const router: Router = express.Router();
const parkingLot = ParkingLotSingleton.getInstance();

/**
 * @route	PUT api/parkcar
 * @desc	park a car
 * @access	Public
 */
export default router.put(
	'/:carid',
	rateLimiter,
	(req: Request, res: Response) => {
		const carId: string = req.params.carid;

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
		return res
			.status(200)
			.send(`Car with ID: ${carId} is parked at the slot ID: ${emptySlot}`);
	}
);
