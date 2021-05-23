class ParkingLot {
	constructor(parkingLotSize) {
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
	getParkingLot() {
		return this.parkingLot;
	}

	// parkcar
	isParkingLotFull() {
		for (const slotId in this.parkingLot) {
			if (this.parkingLot[slotId] === null) return false;
		}
		return true;
	}

	// unparkcar
	getParkingSlot(carId) {
		for (const slotId in this.parkingLot) {
			if (this.parkingLot[slotId] === carId) return slotId;
		}
		return null;
	}

	// getinfo
	isSlotExisting(slotId) {
		return Object.keys(this.parkingLot).includes(slotId);
	}

	// parkcar
	getEmptySlot() {
		for (const slotId in this.parkingLot) {
			if (this.parkingLot[slotId] === null) return slotId;
		}
		return null;
	}

	// parkcar | unparkcar
	isCarIdExisting(carId) {
		for (const slotId in this.parkingLot) {
			if (this.parkingLot[slotId] === carId) return true;
		}
		return false;
	}

	// parkcar
	parkCar(slotId, car) {
		this.parkingLot[slotId] = car;
	}

	// unparkcar
	unparkCar(slotId) {
		this.parkingLot[slotId] = null;
	}

	// getinfo
	getSlotInformationBySlotId(slotId) {
		return {
			slotId,
			car: this.parkingLot[slotId],
		};
	}

	// getinfo
	getSlotInformationByCar(car) {
		const slotId = Object.keys(this.parkingLot).find(
			(key) => this.parkingLot[key] === car
		);
		return {
			slotId,
			car,
		};
	}
}

module.exports = ParkingLot;
