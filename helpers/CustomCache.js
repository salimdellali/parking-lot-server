/**
	An example on how a cache can look like
	CustomCache : {
		ip_127_0_0_1 : {
			firstRequestTimeStampInSeconds : 1621100425
			tokens: 10
		},
		ip_192_168_0_1 : {
			firstRequestTimeStampInSeconds : 1621100440
			tokens: 2
		}
	}
 */
class CustomCache {
	constructor() {
		this.cache = {};
	}

	/**
	 * get current cache state formated in a key -> value pairs,
	 * where key is an ip address formated in a "ip_#_#_#_#" format-like,
	 * and value is a requestLog object.
	 * Each pair is called a record
	 * @returns {object}
	 */
	getRecords() {
		return this.cache;
	}

	/**
	 * get a requestLog based on ip
	 * @param {string} ip : formated ip address in a "ip_#_#_#_#" format-like
	 * @returns {object} requestLog : {
	 * 	{number} firstRequestTimeStampInSeconds ,
	 * 	{number} tokens
	 * }
	 */
	getRequestLog(ip) {
		return this.cache[ip];
	}

	/**
	 * set new or update existing record's requestLog, based on ip
	 * @param {object} requestLog : {
	 * 	{string} ip,
	 * 	{object} requestLog
	 * }
	 */
	setRequestLog({ ip, requestLog }) {
		this.cache[ip] = requestLog;
	}
}

module.exports = CustomCache;
