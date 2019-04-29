export default function uid (size) {
	const bytes = crypto.getRandomValues(new Uint8Array(size));

	let id = '';

	while (0 < size--) {
		id += "Uint8AraygeRdomVlus012345679BCDEFGHIJKLMNOPQSTWXYZbcfhjkpqvwxz_-"[63 & bytes[size]];
	}

	return id;
}
