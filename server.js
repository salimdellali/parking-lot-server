const express = require('express');
// const rateLimiter = require('./middlewares/rateLimiter');
const ParkingLot = require('./helpers/ParkingLot');
const { isSlotIdValid } = require('./helpers/utilities');
require('dotenv/config');

const PORT = process.env.PORT || 5000;
const HOSTNAME = '0.0.0.0'; // to get "127.0.0.1" string rather than "::1" when calling req.ip
const app = express();

app.use('/api/parkcar', require('./api/parkcar'));
app.use('/api/unparkcar', require('./api/unparkcar'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(rateLimiter);

// test if / route works
app.get('/', (req, res) => {
	res.send('we are on root');
});

const parkingLot = new ParkingLot(process.env.PARKING_LOT_SIZE);
// parkingLot.makeParkingLotFull();
console.log(parkingLot.getParkingLot());
// console.log(parkingLot.isSlotExisting('slot_1'));
// console.log(parkingLot.isSlotExisting('slot_6'));

// console.log(parkingLot.isSlotEmpty('slot_1'));
// console.log(parkingLot.isSlotEmpty('slot_6'));

// console.log(parkingLot.getEmptySlot());

// parkingLot.parkCar('slot_1', 'car_00123');
// console.log(parkingLot.getParkingLot());
// console.log(parkingLot.getEmptySlot());
// console.log(parkingLot.isSlotEmpty('slot_1'));
// console.log(parkingLot.isSlotEmpty('slot_2'));

// parkingLot.makeParkingLotFull();
// parkingLot.unparkCar('slot_1');
// parkingLot.unparkCar('slot_4');
// console.log(parkingLot.getParkingLot());

// parkingLot.makeParkingLotFull();
// console.log(parkingLot.getSlotInformationBySlotId('slot_6'));

// parkingLot.makeParkingLotFull();
// console.log(parkingLot.getParkingLot());
// console.log(parkingLot.getSlotInformationByCar('car_1'));

app.listen(PORT, HOSTNAME, (err) => {
	if (err) console.error(err);
	console.log(`Server started on port ${PORT} ...`);
});
