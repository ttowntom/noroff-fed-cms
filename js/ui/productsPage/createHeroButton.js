// Create hero button
export function createHeroButton(href, text) {
	let button = document.createElement("a");
	button.href = href;
	button.innerText = text;
	return button;
}
