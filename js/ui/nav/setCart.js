import * as cart from "/js/ui/shoppingCart/index.js";

export function setCartCount() {
	let shoppingCartItems = cart.getCart();

	if (!shoppingCartItems) {
		shoppingCartItems = [];
	}

	let shoppingCartElement = document.querySelector(`.cart--icon`);
	shoppingCartElement.innerText = shoppingCartItems.length;
}
