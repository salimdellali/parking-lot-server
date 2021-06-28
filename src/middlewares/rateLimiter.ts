import { Request, Response, NextFunction } from 'express';
const CustomCache = require('../helpers/CustomCache');
const {
	getCurrentUnixTimeStampInSeconds,
	diffTimeStampsInSeconds,
} = require('../helpers/times');
const { convertIpIntoValidObjectKey } = require('../helpers/utilities');

const cache = new CustomCache();
const WINDOW_SIZE_IN_SECONDS = 10;
const MAX_WINDOW_REQUEST_COUNT = 10;

const rateLimiter = (req: Request, res: Response, next: NextFunction) => {
	const currentRequestTimeStampInSeconds = getCurrentUnixTimeStampInSeconds();
	const currentRequestIp = convertIpIntoValidObjectKey(req.ip);

	// fetch requestLog of current user using ip address, returns undefined when no requestLog is found
	const currentRequestLog = cache.getRequestLog(currentRequestIp);

	// if no requestLog is found or window elapsed, create/update record and save to cache, and allow request
	if (
		typeof currentRequestLog === 'undefined' ||
		diffTimeStampsInSeconds(
			currentRequestTimeStampInSeconds,
			currentRequestLog.firstRequestTimeStampInSeconds
		) >= WINDOW_SIZE_IN_SECONDS
	) {
		const newRequestLog = {
			firstRequestTimeStampInSeconds: currentRequestTimeStampInSeconds,
			tokens: MAX_WINDOW_REQUEST_COUNT - 1,
		};
		cache.setRequestLog({ ip: currentRequestIp, requestLog: newRequestLog });
		next();
	}

	// else if there are remaining tokens, decrement tokens by 1, and allow request
	else if (currentRequestLog.tokens > 0) {
		const upatedRequestLog = {
			...currentRequestLog,
			tokens: currentRequestLog.tokens - 1,
		};
		cache.setRequestLog({
			ip: currentRequestIp,
			requestLog: upatedRequestLog,
		});
		next();
	}

	// no tokens remaining within the window, deny requests
	else {
		const timeRemaining =
			WINDOW_SIZE_IN_SECONDS -
			diffTimeStampsInSeconds(
				currentRequestTimeStampInSeconds,
				currentRequestLog.firstRequestTimeStampInSeconds
			);
		res.statusCode = 429;
		res.setHeader('Retry-After', timeRemaining);
		res.send(
			`You have exceeded the ${MAX_WINDOW_REQUEST_COUNT} requests in ${WINDOW_SIZE_IN_SECONDS}s limit. Retry after ${timeRemaining}s`
		);
	}
};

module.exports = rateLimiter;
