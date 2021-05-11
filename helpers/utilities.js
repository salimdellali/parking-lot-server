const convertIpIntoValidObjectKey = (ip) => {
	return 'ip_' + ip.replace(/\./g, '_');
};
module.exports = convertIpIntoValidObjectKey;
