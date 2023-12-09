export function renderNoCartItems() {
	console.log("no cart items");

	const info = document.querySelector(`.shopping--cart-itemsList`);
	const shipping = document.querySelector(`.shopping--cart-shippingInfo`);

	// Clear shipping form
	shipping.innerHTML = "";

	// Set up information
	let content = document.createElement("div");
	const title = document.createElement("h2");
	title.innerText = "No items in cart";
	content.appendChild(title);

	// Create button
	const button = document.createElement("a");
	button.classList.add("btn--green-light");
	button.innerText = "Back to shopping";
	button.href = "/products/?gender=female";
	content.appendChild(button);

	// Render info
	info.innerHTML = content.innerHTML;
}
