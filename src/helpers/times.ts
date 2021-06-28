exports.getCurrentUnixTimeStampInSeconds = (): number => {
	return Math.round(new Date().getTime() / 1000);
};

/**
 * gives the difference between two timestamps in seconds
 * @param {Number} timeStampInSeconds1
 * @param {Number} timeStampInSeconds2
 * @returns {Number} difference
 */
exports.diffTimeStampsInSeconds = (
	timeStampInSeconds1: number,
	timeStampInSeconds2: number
): number => {
	return Math.abs(timeStampInSeconds1 - timeStampInSeconds2);
};
