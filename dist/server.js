"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ParkingLotSingleton = require('./models/ParkingLotSingleton');
require('dotenv/config');
const PORT = +process.env.PORT || 5000;
const HOSTNAME = '0.0.0.0'; // to get "127.0.0.1" string rather than "::1" when calling req.ip
const app = express_1.default();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const parkingLot = ParkingLotSingleton.getInstance();
app.use(require('./middlewares/rateLimiter'));
app.get('/', (req, res, next) => {
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
