type ParkingSlotType = string | null;
// type Parking = Record<string, ParkingSlotType>
// same as down bellow
type Parking = {
	[key: string]: ParkingSlotType;
};

const { isPositiveNoneNullNumber } = require('./utilities');

/**
	An example on how a ParkingLot instance can look like,
	for a given parking lot size (for instance 4), a ParkingLot instance can look like this
	@example
	{
			slot_1: null,
			slot_2: "car_00125",
			slot_3: null,
			slot_4: "car_236"
	}
 */
class ParkingLot {
	private parkingLot: Parking;

	constructor(parkingLotSize: string) {
		if (!isPositiveNoneNullNumber(parkingLotSize))
			throw new Error(
				'Invalid Parking lot size input, please provide a positive and non null number in the .env file and restart the app'
			);
		let parking: Parking = {};
		for (let i = 1; i < parseInt(parkingLotSize) + 1; i++) {
			let slot = 'slot_' + i;
			parking[slot] = null;
		}
		this.parkingLot = parking;
	}

	/**
	 * for testing purposes
	 */
	makeParkingLotFull(): void {
		for (const slotId in this.parkingLot) {
			this.parkingLot[slotId] = 'car_' + slotId.slice(5, slotId.length);
		}
	}

	/**
	 * for testing purposes
	 */
	getParkingLot(): Parking {
		return this.parkingLot;
	}

	isParkingLotFull(): boolean {
		for (const slotId in this.parkingLot) {
			if (this.parkingLot[slotId] === null) return false;
		}
		return true;
	}

	getParkingSlot(carId: string): ParkingSlotType {
		for (const slotId in this.parkingLot) {
			if (this.parkingLot[slotId] === carId) return slotId;
		}
		return null;
	}

	isSlotExisting(slotId: string): boolean {
		return Object.keys(this.parkingLot).includes(slotId);
	}

	getEmptySlot(): ParkingSlotType {
		for (const slotId in this.parkingLot) {
			if (this.parkingLot[slotId] === null) return slotId;
		}
		return null;
	}

	isCarIdExisting(carId: string): boolean {
		for (const slotId in this.parkingLot) {
			if (this.parkingLot[slotId] === carId) return true;
		}
		return false;
	}

	parkCar(slotId: string, carId: string): void {
		this.parkingLot[slotId] = carId;
	}

	unparkCar(slotId: string): void {
		this.parkingLot[slotId] = null;
	}

	getSlotInformationBySlotId(slotId: string) {
		return {
			slotId,
			carId: this.parkingLot[slotId],
		};
	}

	/**
	 * @param {String} carId
	 * @returns {ParkingSlotInformation} parking slot information
	 */
	getSlotInformationByCarId(carId: string) {
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
