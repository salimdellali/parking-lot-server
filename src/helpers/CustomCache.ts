type RequestLog = {
	firstRequestTimeStampInSeconds: number; // example: 1621100425
	tokens: number; // example: 9
};

type RecordType = {
	ip: string; // example: "ip_127_0_0_1"
	requestLog: RequestLog;
};

// Indexable Type :
// type CustomCacheType = {
// 	[key: string]: RequestLog;
// };
// same as down bellow
type CustomCacheType = Record<string, RequestLog>;

/**
	An example on how a CustomCache instance can look like
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
export class CustomCache {
	private cache: CustomCacheType;

	constructor() {
		this.cache = {};
	}

	/**
	 * get current cache state formated in a key -> value pairs,
	 * where key is an ip address formated in a "ip_#_#_#_#" format-like,
	 * and value is a RequestLog Object.
	 * Each pair is called a record.
	 */
	getRecords(): CustomCacheType {
		return this.cache;
	}

	/**
	 * get a request log based on ip
	 */
	getRequestLog(ip: string): RequestLog {
		return this.cache[ip];
	}

	/**
	 * set new or update existing record's request log, based on ip
	 */
	setRequestLog({ ip, requestLog }: RecordType): void {
		this.cache[ip] = requestLog;
	}
}
