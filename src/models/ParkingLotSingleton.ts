import { ParkingLot } from '../helpers/ParkingLot';
// Singleton Design Pattern
export let ParkingLotSingleton = (function () {
	let instance: any;

	function createInstance() {
		let object = new ParkingLot(process.env.PARKING_LOT_SIZE!);
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
