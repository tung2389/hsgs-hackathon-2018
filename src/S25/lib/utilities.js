export function randomize() {
	let r = Math.random();
	return Math.floor(r * (max - min) + min);
}

export function doNothing() {
}