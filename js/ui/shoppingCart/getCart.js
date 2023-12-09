export function getCart() {
	let cart = localStorage.getItem("cartItems");
	let cartItems = JSON.parse(cart);

	return cartItems;
}
