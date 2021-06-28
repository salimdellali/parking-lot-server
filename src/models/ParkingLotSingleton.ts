const ParkingLotS = require('../helpers/ParkingLot');
// Singleton Design Pattern
let ParkingLotSingleton = (function () {
	let instance: any;

	function createInstance() {
		let object = new ParkingLotS(process.env.PARKING_LOT_SIZE!);
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
