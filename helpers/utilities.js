/**
 * convert an ipv4 address into a "ip_#_#_#_#" format-like string
 * examples :
 * 	"127.0.0.1" 	-> "ip_127_0_0_1",
 * 	"192.168.0.1" 	-> "ip_192_168_0_1"
 * @param {string} ip
 * @returns {string}
 */
const convertIpIntoValidObjectKey = (ip) => {
	return 'ip_' + ip.replace(/\./g, '_');
};
module.exports = convertIpIntoValidObjectKey;
