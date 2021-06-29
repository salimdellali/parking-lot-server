import { CustomCache } from '../../../helpers/CustomCache';

describe('CustomCache', () => {
	test('should return records', () => {
		const cache = new CustomCache();
		expect(cache.getRecords()).toStrictEqual({});

		cache.setRequestLog({
			ip: 'ip_127_0_0_1',
			requestLog: {
				firstRequestTimeStampInSeconds: 1621100425,
				tokens: 9,
			},
		});
		expect(cache.getRecords()).toStrictEqual({
			ip_127_0_0_1: {
				firstRequestTimeStampInSeconds: 1621100425,
				tokens: 9,
			},
		});

		cache.setRequestLog({
			ip: 'ip_192_168_0_1',
			requestLog: {
				firstRequestTimeStampInSeconds: 1621100440,
				tokens: 2,
			},
		});
		expect(cache.getRecords()).toStrictEqual({
			ip_127_0_0_1: {
				firstRequestTimeStampInSeconds: 1621100425,
				tokens: 9,
			},
			ip_192_168_0_1: {
				firstRequestTimeStampInSeconds: 1621100440,
				tokens: 2,
			},
		});
	});

	test('should return request log', () => {
		const cache = new CustomCache();
		expect(cache.getRequestLog('ip_127_0_0_1')).toStrictEqual(undefined);

		cache.setRequestLog({
			ip: 'ip_127_0_0_1',
			requestLog: {
				firstRequestTimeStampInSeconds: 1621100425,
				tokens: 9,
			},
		});
		expect(cache.getRequestLog('ip_127_0_0_1')).toStrictEqual({
			firstRequestTimeStampInSeconds: 1621100425,
			tokens: 9,
		});

		cache.setRequestLog({
			ip: 'ip_192_168_0_1',
			requestLog: {
				firstRequestTimeStampInSeconds: 1621100440,
				tokens: 2,
			},
		});
		expect(cache.getRequestLog('ip_192_168_0_1')).toStrictEqual({
			firstRequestTimeStampInSeconds: 1621100440,
			tokens: 2,
		});
	});
});
