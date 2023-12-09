export function productsError() {
	// Create error message
	let error = document.createElement("div");
	error.classList.add("error", "flex", "flex--column");

	const errorTitle = document.createElement("h2");
	errorTitle.innerText = "Oh no, there was an error!";

	const errorText = document.createElement("p");
	errorText.innerText = "We were unable to load the selected category.";

	const errorBackButton = document.createElement("a");
	errorBackButton.classList.add("btn--green");
	errorBackButton.href = "/";
	errorBackButton.text = "Back to home";

	error.appendChild(errorTitle);
	error.appendChild(errorText);
	error.appendChild(errorBackButton);

	// Clear screen
	let main = document.querySelector("main");
	let hero = document.querySelector(`#hero`);
	let products = document.querySelector(`#products`);

	hero.innerHTML = "";
	products.innerHTML = "";

	main.insertBefore(error, main.firstChild);
}
