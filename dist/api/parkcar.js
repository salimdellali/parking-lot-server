"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const rateLimiter = require('../middlewares/rateLimiter');
const ParkingLotSingleton = require('../models/ParkingLotSingleton');
const { isCarIdValid } = require('../helpers/utilities');
const parkingLot = ParkingLotSingleton.getInstance();
/**
 * @route	PUT api/parkcar
 * @desc	park a car
 * @access	Public
 */
router.put('/:carid', rateLimiter, (req, res) => {
    const carId = req.params.carid;
    if (!isCarIdValid(carId))
        return res
            .status(400)
            .send("Car ID incorrect, please submit a corect car ID in a format like 'car_#####' where # is a digit");
    if (parkingLot.isCarIdExisting(carId))
        return res.status(400).send(`Car with ID: ${carId} is already parked`);
    if (parkingLot.isParkingLotFull())
        return res.status(400).send(`Parking lot full`);
    const emptySlot = parkingLot.getEmptySlot();
    parkingLot.parkCar(emptySlot, carId);
    return res
        .status(200)
        .send(`Car with ID: ${carId} is parked at the slot ID: ${emptySlot}`);
});
module.exports = router;
