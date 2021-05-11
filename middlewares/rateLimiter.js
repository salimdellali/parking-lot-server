const CustomCache = require('../helpers/CustomCache');
const getCurrentUnixTimeStampInSeconds = require('../helpers/times');
const convertIpIntoValidObjectKey = require('../helpers/utilities');

const rateLimiter = (req, res, next) => {
	const cache = new CustomCache();

	let record1Ip = convertIpIntoValidObjectKey('127.0.0.1');
	let record1RequestInfo = [
		{
			requestTimeStamp: getCurrentUnixTimeStampInSeconds(),
			requestCount: 1,
		},
	];
	cache.setRecord({ ip: record1Ip, record: record1RequestInfo });

	let record2Ip = convertIpIntoValidObjectKey('192.168.0.1');
	let record2RequestInfo = [
		{
			requestTimeStamp: getCurrentUnixTimeStampInSeconds() + 10,
			requestCount: 1,
		},
	];
	cache.setRecord({ ip: record2Ip, record: record2RequestInfo });
	// console.log(cache.getRecords());
	// console.log(cache.getRecord(record2Ip));
	// console.log(cache.getRecord('ip_5_5_5_5'));

	let newRequestLog = {
		requestTimeStamp: getCurrentUnixTimeStampInSeconds() + 20,
		requestCount: 1,
	};

	console.log(cache.getRecord(record1Ip));
	cache.addRequestLog({ ip: record1Ip, requestLog: newRequestLog });
	console.log(cache.getRecord(record1Ip));

	// console.log('Request Type:', req.method);
	next();
};

module.exports = rateLimiter;
