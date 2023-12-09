import * as ui from "/js/ui/index.js";
import * as windowFunc from "/js/window/index.js";

export function handlePay(cart) {
	// Get query string
	const params = windowFunc.getQueryString();
	const productId = params.searchParams.get("id");

	// Get button
	const payButton = document.querySelector('.right input[type="submit"]');

	payButton.addEventListener("click", () => {
		// Prevent default
		event.preventDefault();

		// Get the form element
		const form = document.querySelector(".checkout--shipping-form");
		const fields = form.querySelectorAll("div[id]");

		// Check validity of all input fields
		let isValid = true;
		const inputs = form.querySelectorAll("input");
		inputs.forEach((input) => {
			if (!input.validity.valid) {
				isValid = false;
			}
		});

		// If form is valid, proceed to payment
		if (isValid) {
			// Store selected shipping method to session
			const checkedShippingRadio = document.querySelector(
				'input[name="shipping"]:checked'
			);

			let shipping = {
				value: checkedShippingRadio.value,
				cost: 0,
			};
			if (checkedShippingRadio.value === "royal-mail") {
				shipping.cost = 21;
			} else if (checkedShippingRadio.value === "express") {
				shipping.cost = 44;
			}

			sessionStorage.setItem("selectedShipping", JSON.stringify(shipping));

			// Store data to session
			sessionStorage.setItem("cartItems", JSON.stringify(cart));
			ui.storeFormData();
			// Clear data from local storage
			localStorage.clear();

			// Redirect user
			window.location.href = `success/?id=${productId}`;
		}
	});
}
