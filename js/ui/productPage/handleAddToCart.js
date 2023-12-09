export function handleAddToCart(product) {
	const parent = document.querySelector(".hero--content");
	const link = parent.querySelector("a");

	link.addEventListener("click", function () {
		// Get the existing cart items from local storage
		let cartItems = localStorage.getItem("cartItems");

		// If no items in cart, initialize an empty array
		if (!cartItems) {
			cartItems = [];
		} else {
			cartItems = JSON.parse(cartItems);
		}

		// Check if the product is already in the cart
		let productInCart = false;
		const size = document.querySelector(`.size--ring-active`).innerText;

		for (let i = 0; i < cartItems.length; i++) {
			if (cartItems[i].id === product.id) {
				// If the product is in the cart, increase its quantity
				cartItems[i].quantity++;
				cartItems[i].selectedSize = size;
				productInCart = true;
				break;
			}
		}

		if (!productInCart) {
			// If the product is not in the cart, set its quantity to 1
			product.quantity = 1;
			product.selectedSize = size;
			cartItems.push(product);
		}

		// Store the updated cart items back in local storage
		localStorage.setItem("cartItems", JSON.stringify(cartItems));
	});
}
