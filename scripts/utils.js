export function indexByProperty (arr, property, value) {
	return arr.findIndex((item) => {
		return item[property] === value;
	});
}
