export function handleContinueShopping() {
	const button = document.querySelector(`.btn--continue`);

	button.addEventListener("click", () => {
		sessionStorage.clear();
	});
}
