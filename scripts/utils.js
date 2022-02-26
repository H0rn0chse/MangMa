export function indexByProperty (arr, property, value) {
	return arr.findIndex((item) => {
		return item[property] === value;
	});
}

export function superSort (arr, by, dir) {
	arr.sort((a, b) => {
		let valA = a[by];
		let valB = b[by];

		let sortResult = 0;
		if (typeof valA === "string") {
			sortResult = valA.localeCompare(valB);
		} else if ( typeof valA === "number") {
			sortResult = valA - valB;
		}

		return dir ? sortResult * -1 : sortResult;
	});
}
