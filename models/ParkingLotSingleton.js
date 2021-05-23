const ParkingLot = require('../helpers/ParkingLot');
const { isPositiveNoneNullNumber } = require('../helpers/utilities');

// Singleton Design Pattern
let ParkingLotSingleton = (function () {
	let instance;

	function createInstance() {
		const parkingLotSize = process.env.PARKING_LOT_SIZE;
		if (!isPositiveNoneNullNumber(parkingLotSize))
			throw new Error(
				'Invalid Parking lot size input, please provide a positive and none null number in the .env file and restart the app'
			);
		let object = new ParkingLot(parkingLotSize);
		return object;
	}

	return {
		getInstance: function () {
			if (!instance) {
				instance = createInstance();
				instance.constructor = null; // Note how the constructor is hidden to prevent instantiation
			}
			return instance;
		},
	};
})();

module.exports = ParkingLotSingleton;
