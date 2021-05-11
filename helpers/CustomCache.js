class CustomCache {
	constructor() {
		this.cache = {};
	}

	getRecords() {
		return this.cache;
	}

	getRecord(ip) {
		return this.cache[ip];
	}

	setRecord({ ip, record }) {
		this.cache[ip] = record;
	}

	addRequestLog({ ip, requestLog }) {
		const record = this.cache[ip];
		record.push(requestLog);
		this.cache[ip] = record;
	}
}

module.exports = CustomCache;
