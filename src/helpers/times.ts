exports.getCurrentUnixTimeStampInSeconds = (): number => {
	return Math.round(new Date().getTime() / 1000);
};

exports.diffTimeStampsInSeconds = (
	timeStampInSeconds1: number,
	timeStampInSeconds2: number
): number => {
	return Math.abs(timeStampInSeconds1 - timeStampInSeconds2);
};
