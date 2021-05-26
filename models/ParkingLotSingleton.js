const ParkingLot = require('../helpers/ParkingLot');

// Singleton Design Pattern
let ParkingLotSingleton = (function () {
	let instance;

	function createInstance() {
		let object = new ParkingLot(process.env.PARKING_LOT_SIZE);
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
