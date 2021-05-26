const {
	isPositiveNoneNullNumber,
	convertIpIntoValidObjectKey,
	doStartWith0OrHyphen,
	doStartWithHyphen,
	getPrefix,
} = require('../../../helpers/utilities');

test('should be a positive and non null number', () => {
	expect(isPositiveNoneNullNumber('0')).toBeFalsy();
	expect(isPositiveNoneNullNumber('00')).toBeFalsy();
	expect(isPositiveNoneNullNumber('-22')).toBeFalsy();
	expect(isPositiveNoneNullNumber('1')).toBeTruthy();
	expect(isPositiveNoneNullNumber('33')).toBeTruthy();
	expect(isPositiveNoneNullNumber('111')).toBeTruthy();
});

test('should convert an IP address into a valid key object', () => {
	expect(convertIpIntoValidObjectKey('127.0.0.1')).toBe('ip_127_0_0_1');
	expect(convertIpIntoValidObjectKey('192.168.0.1')).toBe('ip_192_168_0_1');
	expect(convertIpIntoValidObjectKey('')).toBe('ip_');
});

test('should match any string that starts with a 0 or a hyphen (-)', () => {
	expect(doStartWith0OrHyphen('a')).toBeFalsy();
	expect(doStartWith0OrHyphen('')).toBeFalsy();
	expect(doStartWith0OrHyphen('-1')).toBeTruthy();
	expect(doStartWith0OrHyphen('0')).toBeTruthy();
	expect(doStartWith0OrHyphen('-0')).toBeTruthy();
	expect(doStartWith0OrHyphen('-a')).toBeTruthy();
});

test('should match any string startring with a hyphen (-)', () => {
	expect(doStartWithHyphen('a')).toBeFalsy();
	expect(doStartWithHyphen('0')).toBeFalsy();
	expect(doStartWithHyphen('')).toBeFalsy();
	expect(doStartWithHyphen('-')).toBeTruthy();
	expect(doStartWithHyphen('-a')).toBeTruthy();
	expect(doStartWithHyphen('-0')).toBeTruthy();
});

test('should determine if a given ID is either a car ID, or a slot ID, or invalid ID', () => {
	expect(getPrefix('c')).toBe('invalid');
	expect(getPrefix('s')).toBe('invalid');
	expect(getPrefix('car_')).toBe('car_');
	expect(getPrefix('car_1')).toBe('car_');
	expect(getPrefix('car_00001')).toBe('car_');
	expect(getPrefix('slot_')).toBe('slot_');
	expect(getPrefix('slot_1')).toBe('slot_');
	expect(getPrefix('slot_10')).toBe('slot_');
});
