const {
	convertIpIntoValidObjectKey,
	doStartWith0OrHyphen,
	doStartWithHyphen,
	getPrefix,
} = require('../../../helpers/utilities');

test('should convert an IP address into a valid key object', () => {
	expect(convertIpIntoValidObjectKey('127.0.0.1')).toBe('ip_127_0_0_1');
	expect(convertIpIntoValidObjectKey('192.168.0.1')).toBe('ip_192_168_0_1');
	expect(convertIpIntoValidObjectKey('')).toBe('ip_');
});

test('should match any string that starts with a 0 or a hyphen (-)', () => {
	expect(doStartWith0OrHyphen('a')).toBe(false);
	expect(doStartWith0OrHyphen('')).toBe(false);
	expect(doStartWith0OrHyphen('-1')).toBe(true);
	expect(doStartWith0OrHyphen('0')).toBe(true);
	expect(doStartWith0OrHyphen('-0')).toBe(true);
	expect(doStartWith0OrHyphen('-a')).toBe(true);
});

test('should match any string startring with a hyphen (-)', () => {
	expect(doStartWithHyphen('a')).toBe(false);
	expect(doStartWithHyphen('0')).toBe(false);
	expect(doStartWithHyphen('')).toBe(false);
	expect(doStartWithHyphen('-')).toBe(true);
	expect(doStartWithHyphen('-a')).toBe(true);
	expect(doStartWithHyphen('-0')).toBe(true);
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
