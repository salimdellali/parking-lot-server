/**
 * convert an ipv4 address into a "ip_#_#_#_#" format-like string
 * @
 * @example "127.0.0.1" 	-> "ip_127_0_0_1",
 * @example	"192.168.0.1" 	-> "ip_192_168_0_1"
 * @param {string} ip
 * @returns {string}
 */
exports.convertIpIntoValidObjectKey = (ip) => {
	return 'ip_' + ip.replace(/\./g, '_');
};

// A valid slot id should always start with "slot_"
// followed by a not empty, non negative number, also
// should not start with a 0
// example invalid slot ids : "s" | "1" | "slot" | "slot_" | "slot_-1" | "slot_0" | "slot_1a" | "slot_aa"
// example valid slot dss : "slot_1" | "slot_2" | "slot_3" | ... | "slot_50" | ...
exports.isSlotIdValid = (slotId) => {
	// matching any word starting with 0 or hyphen (-)
	// const doNotStartWith0OrHyphenRegEx = /^(?!(0|-).*$).*/g;
	const doStartWith0OrHyphenRegEx = /^((0|-).*$).*/g;
	const prefix = slotId.slice(0, 5);
	const number = slotId.slice(5, slotId.length);

	return (
		prefix === 'slot_' &&
		number !== '' &&
		!isNaN(number) &&
		!doStartWith0OrHyphenRegEx.test(number)
	);
};

// console.log('s | ' + isSlotIdValid('s'));
// console.log('1 | ' + isSlotIdValid('1'));
// console.log('slot | ' + isSlotIdValid('slot'));
// console.log('slot_ | ' + isSlotIdValid('slot_'));
// console.log('slot_-1 | ' + isSlotIdValid('slot_-1'));
// console.log('slot_0 | ' + isSlotIdValid('slot_0'));
// console.log('slot_1a | ' + isSlotIdValid('slot_1a'));
// console.log('slot_aa | ' + isSlotIdValid('slot_aa'));
// console.log('slot_1 | ' + isSlotIdValid('slot_1'));
// console.log('slot_45 | ' + isSlotIdValid('slot_45'));
// console.log('slot_405 | ' + isSlotIdValid('slot_405'));

// a valid car id should always start with "car_"
// followed by a not empty and non negative number
// example invalid car ids : "c" | "1" | "car" | "car_" | "car_-1" | "car_1a" | "car_aa"
// example valid car ids : "car_0" | "car_00" | "car_00000" | "car_1" | "car_01" | "car_45" | "car_004500"
exports.isCarIdValid = (carId) => {
	// matching any word starting with a hyphen
	const doStartWithHyphenRegEx = /^((-).*$).*/g;
	const prefix = carId.slice(0, 4);
	const number = carId.slice(4, carId.length);

	return (
		prefix === 'car_' &&
		number !== '' &&
		!isNaN(number) &&
		!doStartWithHyphenRegEx.test(number)
	);
};

// console.log('c | ' + isCarIdValid('s'));
// console.log('1 | ' + isCarIdValid('1'));
// console.log('car | ' + isCarIdValid('car'));
// console.log('car_ | ' + isCarIdValid('car_'));
// console.log('car_-1 | ' + isCarIdValid('car_-1'));
// console.log('car_1a | ' + isCarIdValid('car_1a'));
// console.log('car_aa | ' + isCarIdValid('car_aa'));
// console.log('car_0 | ' + isCarIdValid('car_0'));
// console.log('car_000000 | ' + isCarIdValid('car_00000'));
// console.log('car_1 | ' + isCarIdValid('car_1'));
// console.log('car_45 | ' + isCarIdValid('car_45'));
// console.log('car_405 | ' + isCarIdValid('car_405'));
// console.log('car_00405 | ' + isCarIdValid('car_00405'));

exports.getPrefix = (id) => {
	// matching any word starting with a hyphen
	const doStartWithHyphenRegEx = /^((-).*$).*/g;
	const prefixCar = id.slice(0, 4);
	const prefixSlot = id.slice(0, 5);

	if (prefixCar === 'car_') return 'car_';
	if (prefixSlot === 'slot_') return 'slot_';
	// throw new Error('Invalid ID prefix');
	return 'invalid';
};

// console.log('c | ' + getPrefix('c'));
// console.log('car_1 | ' + getPrefix('car_1'))
// console.log('car_000000 | ' + getPrefix('car_00000'));
// console.log('sl | ' + getPrefix('sl'));
// console.log('slot_1 | ' + getPrefix('slot_1'))
// console.log('slot_101 | ' + getPrefix('slot_101'))
