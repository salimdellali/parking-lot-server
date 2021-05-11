const rateLimiter = (req, res, next) => {
	console.log('Request Type:', req.method);
	next();
};

module.exports = rateLimiter;
