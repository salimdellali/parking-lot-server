const ParkingLot = require('../../../helpers/ParkingLot');

describe('ParkingLot', () => {
	test("should return parking lot error when parkingLotSize isn't a positive none null number", () => {
		expect(() => new ParkingLot(0)).toThrowError(
			'Invalid Parking lot size input, please provide a positive and none null number in the .env file and restart the app'
		);
	});

	test('should return parking lot when parkingLotSize is equal to 4', () => {
		const parkingLot = new ParkingLot(4);
		expect(parkingLot.getParkingLot()).toStrictEqual({
			slot_1: null,
			slot_2: null,
			slot_3: null,
			slot_4: null,
		});
	});

	test('should return full parking lot when parkingLotSize is equal to 4', () => {
		const parkingLot = new ParkingLot(4);
		parkingLot.makeParkingLotFull();
		expect(parkingLot.getParkingLot()).toStrictEqual({
			slot_1: 'car_1',
			slot_2: 'car_2',
			slot_3: 'car_3',
			slot_4: 'car_4',
		});
	});

	test('should return isParkingLotFull boolean when parkingLotSize is equal to 4', () => {
		const parkingLot = new ParkingLot(4);
		expect(parkingLot.isParkingLotFull()).toBeFalsy();

		parkingLot.parkCar('slot_1', 'car_001');
		expect(parkingLot.isParkingLotFull()).toBeFalsy();

		parkingLot.makeParkingLotFull();
		expect(parkingLot.isParkingLotFull()).toBeTruthy();
	});

	test('should return parking slot based on car id when parkingLotSize is equal to 4', () => {
		const parkingLot = new ParkingLot(4);
		expect(parkingLot.getParkingSlot('car_1')).toBe(null);

		parkingLot.parkCar('slot_1', 'car_001');
		expect(parkingLot.getParkingSlot('car_001')).toBe('slot_1');
	});

	test('should return the existence of parking slot when parkingLotSize is equal to 4', () => {
		const parkingLot = new ParkingLot(4);
		expect(parkingLot.isSlotExisting('slot_1')).toBeTruthy();
		expect(parkingLot.isSlotExisting('slot_2')).toBeTruthy();
		expect(parkingLot.isSlotExisting('slot_3')).toBeTruthy();
		expect(parkingLot.isSlotExisting('slot_4')).toBeTruthy();
		expect(parkingLot.isSlotExisting('slot_5')).toBeFalsy();
		expect(parkingLot.isSlotExisting('slot_0')).toBeFalsy();
	});

	test('should get empty slot when parkingLotSize is equal to 4', () => {
		const parkingLot = new ParkingLot(4);
		expect(parkingLot.getEmptySlot()).toBe('slot_1');

		parkingLot.parkCar('slot_1', 'car_001');
		expect(parkingLot.getEmptySlot()).toBe('slot_2');

		parkingLot.makeParkingLotFull();
		expect(parkingLot.getEmptySlot()).toBe(null);
	});

	test('should return existence of car id when parkingLotSize is equal to 4', () => {
		const parkingLot = new ParkingLot(4);
		expect(parkingLot.isCarIdExisting('car_001')).toBeFalsy();

		parkingLot.parkCar('slot_1', 'car_001');
		expect(parkingLot.isCarIdExisting('car_001')).toBeTruthy();
	});

	test('should unpark correctly car when parkingLotSize is equal to 4', () => {
		const parkingLot = new ParkingLot(4);
		parkingLot.parkCar('slot_1', 'car_001');
		parkingLot.unparkCar('slot_1');
		expect(parkingLot.getParkingSlot('car_001')).toBe(null);
	});

	test('should get slot information  when parkingLotSize is equal to 4', () => {
		const parkingLot = new ParkingLot(4);
		expect(parkingLot.getSlotInformationBySlotId('slot_1')).toStrictEqual({
			slotId: 'slot_1',
			carId: null,
		});

		parkingLot.parkCar('slot_1', 'car_001');
		expect(parkingLot.getSlotInformationBySlotId('slot_1')).toStrictEqual({
			slotId: 'slot_1',
			carId: 'car_001',
		});
		expect(parkingLot.getSlotInformationByCarId('car_001')).toStrictEqual({
			slotId: 'slot_1',
			carId: 'car_001',
		});

		parkingLot.unparkCar('slot_1');
		expect(parkingLot.getSlotInformationBySlotId('slot_1')).toStrictEqual({
			slotId: 'slot_1',
			carId: null,
		});
	});
});
