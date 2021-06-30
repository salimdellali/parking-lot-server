require('dotenv/config');

import express, { Application, Request, Response, NextFunction } from 'express';
import path from 'path';
import { ParkingLotSingleton } from './models/ParkingLotSingleton';
import { rateLimiter } from './middlewares/rateLimiter';

import parkCarRouter from './api/parkcar';
import unparkCarRouter from './api/unparkcar';
import getCarSlotInformationRouter from './api/getcarslotinformation';

const PORT = +process.env.PORT! || 5000;
const HOSTNAME = '0.0.0.0'; // to get "127.0.0.1" string rather than "::1" when calling req.ip
const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const parkingLot = ParkingLotSingleton.getInstance();

app.use(rateLimiter);
app.get('/', (req: Request, res: Response, next: NextFunction) => {
	const parkingLotCurrentState = parkingLot.getParkingLot();
	const text = `\n\nPlease use an API client (eg: Postman)

Possible routes:
- GET / : returns in json format the actual state of the parking lot
- PUT /parkcar/:carId : with a given valid car ID, park the car and return the appropriate message, or return the appropriate error message
- PUT /unparkcar/:slotId : with a given valid slot ID, unpark the car, free up space and return the appropriate message, or return the appropriate error message
- GET /getcarslotinformation/:id : with a given valid car ID or valid slot ID, return the parking slot information, or return the appropriate error message

For more information, refere to the project's README.md`;

	// to pretty the output
	res.header('Content-Type', 'application/json');
	res.send(JSON.stringify(parkingLotCurrentState, null, 4) + text);
});

app.use('/api/parkcar', parkCarRouter);
app.use('/api/unparkcar', unparkCarRouter);
app.use('/api/getcarslotinformation', getCarSlotInformationRouter);

app.listen(PORT, HOSTNAME, () => {
	console.log(`Server started on port ${PORT} ...`);
});
