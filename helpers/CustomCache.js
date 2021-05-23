/**
	An example on how a CustomCache instance can look like
	@typedef {Object} CustomCache
 	@property {Record} one or many records
	@example 
	{
		ip_127_0_0_1 : {
			firstRequestTimeStampInSeconds : 1621100425
			tokens: 9
		},
		ip_192_168_0_1 : {
			firstRequestTimeStampInSeconds : 1621100440
			tokens: 2
		}
	}
	
 */
class CustomCache {
	/**
	 * @typedef {Object} RequestLog
	 * @property {Number} firstRequestTimeStampInSeconds
	 * @property {Number} tokens - tokens left
	 * @example {
	 		firstRequestTimeStampInSeconds : 1621100425
			tokens: 9
	}
	 */

	/**
	 * @typedef {Object} Record
	 * @property {RequestLog}
	 * @example { 
		ip_127_0_0_1 : {
			firstRequestTimeStampInSeconds : 1621100425
			tokens: 9
		}
	}
	 */

	constructor() {
		this.cache = {};
	}

	/**
	 * get current cache state formated in a key -> value pairs,
	 * where key is an ip address formated in a "ip_#_#_#_#" format-like,
	 * and value is a RequestLog Object.
	 * Each pair is called a record.
	 * @returns {Record} an object containing one or many records
	 */
	getRecords() {
		return this.cache;
	}

	/**
	 * get a request log based on ip
	 * @param {String} ip formated ip address in a "ip_#_#_#_#" format-like
	 * @returns {RequestLog} a request log
	 */
	getRequestLog(ip) {
		return this.cache[ip];
	}

	/**
	 * set new or update existing record's request log, based on ip
	 * @param {Record} record
	 */
	setRequestLog({ ip, requestLog }) {
		this.cache[ip] = requestLog;
	}
}

module.exports = CustomCache;
