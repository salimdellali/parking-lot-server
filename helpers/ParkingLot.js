/**
	An example on how a ParkingLot instance can look like,
	for a given parking lot size (for instance 5), a ParkingLot instance can look like
	@typedef {Object} ParkingLot
	@property {String | null} parked car ID 
	@example
	{
			slot_1: null,
			slot_2: "car_00125",
			slot_3: null,
			slot_4: "car_23600",
			slot_5: "car_16001"
	}
 */
const { isPositiveNoneNullNumber } = require('../helpers/utilities');
class ParkingLot {
	/**
	 * instanciante a new ParkingLot instance
	 * @param {Number} parkingLotSize
	 */
	constructor(parkingLotSize) {
		if (!isPositiveNoneNullNumber(parkingLotSize))
			throw new Error(
				'Invalid Parking lot size input, please provide a positive and none null number in the .env file and restart the app'
			);
		let parking = {};
		for (let i = 1; i < parseInt(parkingLotSize) + 1; i++) {
			let slot = 'slot_' + i;
			parking[slot] = null;
		}
		this.parkingLot = parking;
	}

	// for testing purposes
	makeParkingLotFull() {
		for (const slotId in this.parkingLot) {
			this.parkingLot[slotId] = 'car_' + slotId.slice(5, slotId.length);
		}
	}

	// for testing purposes
	/**
	 * get the current state of the parking lot
	 * @returns {ParkingLot} parking lot
	 */
	getParkingLot() {
		return this.parkingLot;
	}

	isParkingLotFull() {
		for (const slotId in this.parkingLot) {
			if (this.parkingLot[slotId] === null) return false;
		}
		return true;
	}

	/**
	 * @param {String} carId
	 * @returns {String | null} slot ID
	 */
	getParkingSlot(carId) {
		for (const slotId in this.parkingLot) {
			if (this.parkingLot[slotId] === carId) return slotId;
		}
		return null;
	}

	/**
	 * @param {String} slotId
	 * @returns {Boolean} boolean value
	 */
	isSlotExisting(slotId) {
		return Object.keys(this.parkingLot).includes(slotId);
	}

	/**
	 * @returns {String | null} ID of an empty slot
	 */
	getEmptySlot() {
		for (const slotId in this.parkingLot) {
			if (this.parkingLot[slotId] === null) return slotId;
		}
		return null;
	}

	/**
	 * @param {String} carId
	 * @returns {Boolean} if the car exists in the parking lot
	 */
	isCarIdExisting(carId) {
		for (const slotId in this.parkingLot) {
			if (this.parkingLot[slotId] === carId) return true;
		}
		return false;
	}

	/**
	 * @param {String} slotId
	 * @param {String} car
	 */
	parkCar(slotId, carId) {
		this.parkingLot[slotId] = carId;
	}

	/**
	 *
	 * @param {String} slotId
	 */
	unparkCar(slotId) {
		this.parkingLot[slotId] = null;
	}

	/**
	 * @typedef ParkingSlotInformation
	 * @property {String} slot ID
	 * @property {String} car ID
	 */

	/**
	 * @param {String} slotId
	 * @returns {ParkingSlotInformation} parking slot information
	 */
	getSlotInformationBySlotId(slotId) {
		return {
			slotId,
			carId: this.parkingLot[slotId],
		};
	}

	/**
	 * @param {String} carId
	 * @returns {ParkingSlotInformation} parking slot information
	 */
	getSlotInformationByCar(carId) {
		const slotId = Object.keys(this.parkingLot).find(
			(key) => this.parkingLot[key] === carId
		);
		return {
			slotId,
			carId,
		};
	}
}

module.exports = ParkingLot;
