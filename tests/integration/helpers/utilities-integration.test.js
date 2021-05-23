const { isSlotIdValid, isCarIdValid } = require('../../../helpers/utilities');

test('should check if a slot ID is valid', () => {
	expect(isSlotIdValid('s')).toBe(false);
	expect(isSlotIdValid('1')).toBe(false);
	expect(isSlotIdValid('slot')).toBe(false);
	expect(isSlotIdValid('slot_')).toBe(false);
	expect(isSlotIdValid('slot_-1')).toBe(false);
	expect(isSlotIdValid('slot_0')).toBe(false);
	expect(isSlotIdValid('slot_1a')).toBe(false);
	expect(isSlotIdValid('slot_aa')).toBe(false);
	expect(isSlotIdValid('slot_1')).toBe(true);
	expect(isSlotIdValid('slot_10')).toBe(true);
	expect(isSlotIdValid('slot_405')).toBe(true);
});

test('should check if a car ID is valid', () => {
	expect(isCarIdValid('c')).toBe(false);
	expect(isCarIdValid('1')).toBe(false);
	expect(isCarIdValid('car')).toBe(false);
	expect(isCarIdValid('car_')).toBe(false);
	expect(isCarIdValid('car_-1')).toBe(false);
	expect(isCarIdValid('car_1a')).toBe(false);
	expect(isCarIdValid('car_aa')).toBe(false);
	expect(isCarIdValid('car_0')).toBe(true);
	expect(isCarIdValid('car_00000')).toBe(true);
	expect(isCarIdValid('car_1')).toBe(true);
	expect(isCarIdValid('car_45')).toBe(true);
	expect(isCarIdValid('car_405')).toBe(true);
	expect(isCarIdValid('car_00405')).toBe(true);
});
