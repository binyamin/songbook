export function formToJSON(form: FormData) {
	const data: Record<string, string | File | Array<string | File>> = {};
	for (const [key, value] of form) {
		if (key in data) {
			let entry = data[key];
			entry = [entry].flat();
			entry.push(value);
			data[key] = entry;
		} else {
			data[key] = value;
		}
	}

	return data;
}
