export const splitByPart = (string, target) => {
	if ((!target) || (target.length < 1) || (!string) || (!string.search)) {
		return [string];
	}
	let index = string.indexOf(target);
	if (index < 0) {
		return [string];
	}
	let prefix = string.slice(0, index);
	let suffix = string.slice(index + target.length);
	let result = [];
	if (prefix) {
		result = [prefix];
	}
	result = result.concat(target);
	if (suffix) {
		result = result.concat(suffix);
	}
	return result;
};
