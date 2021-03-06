export const isPositiveNoneNullNumber = (input: string): boolean => {
	const isPositiveNoneNullNumberRegExp: RegExp = /^[1-9]\d*$/;
	return isPositiveNoneNullNumberRegExp.test(input);
};

/**
 * convert an ipv4 address into a "ip_#_#_#_#" format-like string
 * where # is a digit
 * @example "127.0.0.1" 	-> "ip_127_0_0_1",
 * @example	"192.168.0.1" 	-> "ip_192_168_0_1"
 */
export const convertIpIntoValidObjectKey = (ip: string): string => {
	return 'ip_' + ip.replace(/\./g, '_');
};

/**
 * return if a string starts with a 0 or a hyphen (-)
 * @example valid : "-1" | "0" | "-0" | "-a"
 * @example invalid: "a" | ""
 */
export const doStartWith0OrHyphen = (string: string): boolean => {
	const doStartWith0OrHyphenRegEx: RegExp = /^((0|-).*$).*/g;
	return doStartWith0OrHyphenRegEx.test(string);
};

/**
 * A valid slot ID should always start with "slot_" followed by a non empty, non negative number, also should not start with a 0
 * @example invalid slot IDs : "s" | "1" | "slot" | "slot_" | "slot_-1" | "slot_0" | "slot_1a" | "slot_aa"
 * @example valid slot IDs : "slot_1" | "slot_2" | "slot_3" | ... | "slot_50" | ...
 */
export const isSlotIdValid = (slotId: string): boolean => {
	const prefix: string = slotId.slice(0, 5);
	const number: string = slotId.slice(5, slotId.length);

	return (
		prefix === 'slot_' &&
		number !== '' &&
		!isNaN(+number) &&
		!doStartWith0OrHyphen(number)
	);
};

/**
 * return if a string starts with a hyphen (-)
 * @example valid : "-" | "-a" | "-0"
 * @example invalid: "a" | "0" | ""
 */
export const doStartWithHyphen = (string: string): boolean => {
	const doStartWithHyphenRegEx: RegExp = /^((-).*$).*/g;
	return doStartWithHyphenRegEx.test(string);
};

/**
 * a valid car ID should always start with "car_" followed by a non empty and non negative number
 * @example invalid car IDs: "c" | "1" | "car" | "car_" | "car_-1" | "car_1a" | "car_aa"
 * @example valid car IDs: "car_0" | "car_00" | "car_00000" | "car_1" | "car_01" | "car_45" | "car_004500" | ...
 */
export const isCarIdValid = (carId: string): boolean => {
	const prefix: string = carId.slice(0, 4);
	const number: string = carId.slice(4, carId.length);

	return (
		prefix === 'car_' &&
		number !== '' &&
		!isNaN(+number) &&
		!doStartWithHyphen(number)
	);
};

/**
 * returns either "car_" or "slot_" ID Prefix if it's a valid prefix, otherwise return "invalid"
 * @example invalid: "c" | "s"
 * @example valid: "car_" | "car_1" | "car_00001" | "slot_" | "slot_1" | "slot_10"
 */
export const getPrefix = (id: string): string => {
	const prefixCar: string = id.slice(0, 4);
	const prefixSlot: string = id.slice(0, 5);

	if (prefixCar === 'car_') return 'car_';
	if (prefixSlot === 'slot_') return 'slot_';
	return 'invalid';
};
