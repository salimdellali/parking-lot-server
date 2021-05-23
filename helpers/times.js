exports.getCurrentUnixTimeStampInSeconds = () => {
	return Math.round(new Date().getTime() / 1000);
};

/**
 * gives the difference between two timestamps in seconds
 * @param {Number} timeStampInSeconds1
 * @param {Number} timeStampInSeconds2
 * @returns {Number} difference
 */
exports.diffTimeStampsInSeconds = (
	timeStampInSeconds1,
	timeStampInSeconds2
) => {
	return Math.abs(timeStampInSeconds1 - timeStampInSeconds2);
};
