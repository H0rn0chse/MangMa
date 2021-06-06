export function indexByProperty (arr, property, value) {
	return arr.findIndex((item) => {
		return item[property] === value;
	});
}

export function superSort (arr, by, dir) {
	arr.sort((a, b) => {
		let valA, valB;
		try {
			valA = parseInt(a[by]);
			valB = parseInt(b[by]);
		} catch (err) {
			valA = a[by];
			valB = b[by];
		}

		let sortResult = 0;
		if (typeof valA === "string") {
			sortResult = valA.localeCompare(valB);
		} else if ( typeof valA === "number") {
			sortResult = valA - valB;
		}

		return dir ? sortResult * -1 : sortResult;
	});
}
