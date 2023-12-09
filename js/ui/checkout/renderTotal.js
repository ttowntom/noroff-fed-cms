export function renderTotal(cart, selectedShipping) {
	const subtotalElement = document.querySelector(`.checkout--subtotal`);
	// const checkedShippingRadio = document.querySelector(
	// 	'input[name="shipping"]:checked'
	// );
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
		const itemCost = parseInt(cart[i].quantity * cart[i].discountedPrice);
		subtotal += itemCost;
	}
	// Render subtotal
	subtotalElement.innerText = "$" + subtotal;

	// Get shipping
	let shipping = 0;
	if (checkedShippingRadio.value === "royal-mail") {
		shipping = 21;
	} else if (checkedShippingRadio.value === "express") {
		shipping = 44;
	}
	// Render shipping
	shippingElement.innerText = "+$" + shipping;

	// Get coupon
	const coupon = 20;
	// Render coupon
	couponElement.innerText = "-$" + coupon;

	// Calculate total
	const total = subtotal + shipping - coupon;
	// Render total
	totalElement.innerText = "$" + total;
}
