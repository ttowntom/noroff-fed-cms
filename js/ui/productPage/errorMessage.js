export function productDetailsError() {
	// Create error message
	let error = document.createElement("div");
	error.classList.add("error", "flex", "flex--column");

	const errorTitle = document.createElement("h2");
	errorTitle.innerText = "Oh no, there was an error!";

	const errorText = document.createElement("p");
	errorText.innerText = "We were unable to load the selected product.";

	const errorBackButton = document.createElement("a");
	errorBackButton.classList.add("btn--green");
	errorBackButton.href = "/products/";
	errorBackButton.text = "Back to shop";

	error.appendChild(errorTitle);
	error.appendChild(errorText);
	error.appendChild(errorBackButton);

	// Clear screen
	let main = document.querySelector("main");
	let breadcrumbs = document.querySelector(`#breadcrumbs--container`);
	let hero = document.querySelector(`#hero`);
	let productInfo = document.querySelector(`#product--info`);

	breadcrumbs.innerHTML = "";
	hero.innerHTML = "";
	productInfo.innerHTML = "";

	main.insertBefore(error, main.firstChild);

	// return error.innerHTML;
}
