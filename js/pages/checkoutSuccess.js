import * as ui from "/js/ui/index.js";

export function checkoutSuccess() {
	const cart = JSON.parse(sessionStorage.getItem("cartItems"));
	let selectedShipping = JSON.parse(sessionStorage.getItem("selectedShipping"));

	if (!selectedShipping) {
		selectedShipping = {
			value: "royal-mail",
			cost: 21,
		};
	}
	// Render breadcrumbs
	ui.renderBreadcrumbs();

	// Render product cards
	ui.renderCheckoutSuccessProductCards();

	// Render total
	ui.renderTotal(cart, selectedShipping);

	// Render customer information
	ui.renderCustomerInformation();

	// Remove stored data
	ui.handleContinueShopping();
}
