import { isSlotIdValid, isCarIdValid } from '../../../helpers/utilities';

test('should check if a slot ID is valid', () => {
	expect(isSlotIdValid('s')).toBeFalsy();
	expect(isSlotIdValid('1')).toBeFalsy();
	expect(isSlotIdValid('slot')).toBeFalsy();
	expect(isSlotIdValid('slot_')).toBeFalsy();
	expect(isSlotIdValid('slot_-1')).toBeFalsy();
	expect(isSlotIdValid('slot_0')).toBeFalsy();
	expect(isSlotIdValid('slot_1a')).toBeFalsy();
	expect(isSlotIdValid('slot_aa')).toBeFalsy();
	expect(isSlotIdValid('slot_1')).toBeTruthy();
	expect(isSlotIdValid('slot_10')).toBeTruthy();
	expect(isSlotIdValid('slot_405')).toBeTruthy();
});

test('should check if a car ID is valid', () => {
	expect(isCarIdValid('c')).toBeFalsy();
	expect(isCarIdValid('1')).toBeFalsy();
	expect(isCarIdValid('car')).toBeFalsy();
	expect(isCarIdValid('car_')).toBeFalsy();
	expect(isCarIdValid('car_-1')).toBeFalsy();
	expect(isCarIdValid('car_1a')).toBeFalsy();
	expect(isCarIdValid('car_aa')).toBeFalsy();
	expect(isCarIdValid('car_0')).toBeTruthy();
	expect(isCarIdValid('car_00000')).toBeTruthy();
	expect(isCarIdValid('car_1')).toBeTruthy();
	expect(isCarIdValid('car_45')).toBeTruthy();
	expect(isCarIdValid('car_405')).toBeTruthy();
	expect(isCarIdValid('car_00405')).toBeTruthy();
});
