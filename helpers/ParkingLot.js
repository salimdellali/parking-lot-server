class ParkingLot {
	constructor(parkingLotSize) {
		let parking = {};
		for (let i = 1; i < parseInt(parkingLotSize) + 1; i++) {
			let slot = 'slot_' + i;
			parking[slot] = null;
		}
		this.parkingLot = parking;
	}

	// just a testing method
	makeParkingLotFull() {
		for (const slotId in this.parkingLot) {
			this.parkingLot[slotId] = 'car_' + slotId.slice(5, slotId.length);
		}
	}

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

	isSlotExisting(slotId) {
		return Object.keys(this.parkingLot).includes(slotId);
	}

	isSlotEmpty(slotId) {
		// if this.parkingLot[slotId] is null
		// then its having a falsy value,
		// so else exeutes, aka "true", aka the slot is indeed empty
		return this.parkingLot[slotId] ? false : true;
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

	getSlotInformationBySlotId(slotId) {
		return {
			slotId,
			car: this.parkingLot[slotId],
		};
	}

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
