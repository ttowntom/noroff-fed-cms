export function handleContinueShopping() {
	const button = document.querySelector(`.btn--continue`);

	button.addEventListener("click", () => {
		sessionStorage.removeItem("formData");
		sessionStorage.removeItem("cartItems");
		sessionStorage.removeItem("selectedShipping");
	});
}
