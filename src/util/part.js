import { splitByPart } from './string';

export const getData = part => part.data;

const split = (string, target) => {
	let array = splitByPart(string, target);
	let prefix = null, suffix = null;
	// array is [target] or [target, suffix]
	if (array.indexOf(target) === 0) {
		// array is [target, suffix]
		if (array.length === 2) {
			suffix = array[1];
		}
		// else array is [target]
	}
	// array is [prefix, target] or [prefix, target, suffix]
	else {
		prefix = array[0];
		// array is [prefix, target, suffix]
		if (array.length === 3) {
			suffix = array[2];
		}
		// else [prefix, target]
	}
	return {
		prefix,
		target,
		suffix
	};
};

export const treat = (regex, mutator, line, isMarkLeft, isConsiderLeft) => {
	return line.flatMap(part => {
		if (part.treated || (isConsiderLeft && (!part.left))) {
			return part;
		}
		let match = part.data.match(regex);
		if ((!match) || (match.length < 1)) {
			return part;
		}
		match = match[0];
		const partSplit = split(part.data, match);
		match = mutator(match);
		let result = [];
		if (partSplit.prefix) {
			let newPrefix = {
				data: partSplit.prefix,
				treated: false
			};
			if (isMarkLeft) {
				newPrefix.left = true;
			}
			result = result.concat(newPrefix);
		}
		result = result.concat({
			data: match,
			treated: true
		});
		if (partSplit.suffix) {
			let newSuffix = {
				data: partSplit.suffix,
				treated: false
			};
			if (isConsiderLeft) {
				newSuffix.left = true;
			}
			result = result.concat(treat(regex, mutator, [newSuffix]));
		}
		return result;
	});
}

export const treatColon = line => treat(/[:]/gi, match => match, line, true, false);

export const treatMinuteSecond = line => treat(/[0-9]{4}/gi, match => `${match.slice(0, 2)}:${match.slice(2)}`, line, false, false);

export const treatMultipleMixedSeries = line => treat(/[0-9]{1} \\p{[0-9½+]+}/gi, match => `$${match}$`, line, false, false);

export const treatPeriod = line => treat(/[.]/gi, match => match, line, false, false);

export const treatMultipleSeries = line => treat(/[0-9]{1} \\x [0-9½]+/gi, match => `$${match}$`, line, false, false);

export const treatSingleSeries = line => treat(/[0-9½+]+/gi, match => `$${match}$`, line, false, false);

export const treatWeight = line => treat(/[0-9+]+/gi, match => `\\si{${match}}{kg}`, line, false, true);
