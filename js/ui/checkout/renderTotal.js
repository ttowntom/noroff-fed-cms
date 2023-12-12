export function renderTotal(cart, selectedShipping) {
	const subtotalElement = document.querySelector(`.checkout--subtotal`);
	let checkedShippingRadio;
	if (selectedShipping) {
		checkedShippingRadio = selectedShipping;
	} else {
		checkedShippingRadio = document.querySelector(
			'input[name="shipping"]:checked'
		);
	}

	const shippingElement = document.querySelector(`.checkout--shippingCost`);
	const couponElement = document.querySelector(`.checkout--cuopunAmount`);
	const totalElement = document.querySelector(`.checkout--total`);

	// Calculate subtotal
	let subtotal = 0;
	for (let i = 0; i < cart.length; i++) {
		const itemCost = parseInt(
			cart[i].quantity * cart[i].prices.price.slice(0, -2)
		);
		subtotal += itemCost;
	}
	// Render subtotal
	subtotalElement.innerText = subtotal + " kr";

	// Get shipping
	let shipping = 0;
	if (checkedShippingRadio.value === "royal-mail") {
		shipping = 210;
	} else if (checkedShippingRadio.value === "express") {
		shipping = 440;
	}
	// Render shipping
	shippingElement.innerText = "+" + shipping + " kr";

	// Get coupon
	const coupon = 20;
	// Render coupon
	couponElement.innerText = "-" + coupon + " kr";

	// Calculate total
	const total = subtotal + shipping - coupon;
	// Render total
	totalElement.innerText = total + " kr";
}
