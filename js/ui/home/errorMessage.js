export function featuredProductsError() {
	// Create error message
	let error = document.createElement("div");
	error.classList.add("error", "flex", "flex--column");

	const errorTitle = document.createElement("h2");
	errorTitle.innerText = "Oh no, there was an error!";

	const errorText = document.createElement("p");
	errorText.innerText = "We were unable to load the featured products.";

	const errorBackButton = document.createElement("a");
	errorBackButton.classList.add("btn--green");
	errorBackButton.href = "/products/";
	errorBackButton.text = "Go to shop";

	error.appendChild(errorTitle);
	error.appendChild(errorText);
	error.appendChild(errorBackButton);

	// Clear screen
	let featured = document.querySelector("#featured");

	featured.innerHTML = "";

	featured.insertBefore(error, featured.firstChild);

	// return error.innerHTML;
}
