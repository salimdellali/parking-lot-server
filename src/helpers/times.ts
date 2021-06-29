export const getCurrentUnixTimeStampInSeconds = (): number => {
	return Math.round(new Date().getTime() / 1000);
};
// exports.getCurrentUnixTimeStampInSeconds = getCurrentUnixTimeStampInSeconds;

export const diffTimeStampsInSeconds = (
	timeStampInSeconds1: number,
	timeStampInSeconds2: number
): number => {
	return Math.abs(timeStampInSeconds1 - timeStampInSeconds2);
};
// exports.diffTimeStampsInSeconds = diffTimeStampsInSeconds;
