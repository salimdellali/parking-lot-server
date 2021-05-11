const getCurrentUnixTimeStampInSeconds = () => {
	return Math.round(new Date().getTime() / 1000);
};
module.exports = getCurrentUnixTimeStampInSeconds;

const diffTimeStampsInSeconds = (ts2, ts1) => {
	return Math.abs(ts1 - ts2);
};
module.exports = getCurrentUnixTimeStampInSeconds;
