import express, { Application, Request, Response, NextFunction } from 'express';
const ParkingLotSingleton = require('./models/ParkingLotSingleton');
require('dotenv/config');

const PORT: number = +process.env.PORT! || 5000;
const HOSTNAME: string = '0.0.0.0'; // to get "127.0.0.1" string rather than "::1" when calling req.ip
const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const parkingLot = ParkingLotSingleton.getInstance();

app.use(require('./middlewares/rateLimiter'));
app.get('/', (req: Request, res: Response, next: NextFunction) => {
	const parkingLotCurrentState = parkingLot.getParkingLot();
	// to pretty the output
	res.header('Content-Type', 'application/json');
	res.send(JSON.stringify(parkingLotCurrentState, null, 4));
});
app.use('/api/parkcar', require('./api/parkcar'));
app.use('/api/unparkcar', require('./api/unparkcar'));
app.use('/api/getcarslotinformation', require('./api/getcarslotinformation'));

app.listen(PORT, HOSTNAME, () => {
	console.log(`Server started on port ${PORT} ...`);
});
