exports.getCurrentUnixTimeStampInSeconds = () => {
	return Math.round(new Date().getTime() / 1000);
};

exports.diffTimeStampsInSeconds = (
	timeStampInSeconds1,
	timeStampInSeconds2
) => {
	return Math.abs(timeStampInSeconds1 - timeStampInSeconds2);
};