
import { inspect } from 'util';

export function getType (value: any): string {
	if (typeof value === 'object') {
		if (Array.isArray(value))
			return 'array';
		else if (Buffer.isBuffer(value))
			return 'buffer';
		else if (value instanceof RegExp)
			return 'regexp';
		else if (value instanceof Date)
			return 'date';
		else if (value === null)
			return 'null';
    else if (value === void 0)
			return 'void';
    else
			return inspect(value, { depth: -1 })?.replace(/[\[\]]/g, '')?.toLowerCase();
	};
	return typeof value;
};

export default getType;