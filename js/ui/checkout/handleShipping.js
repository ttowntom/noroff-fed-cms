import * as ui from "/js/ui/index.js";

export function handleShipping(cart) {
	const shippingRadio = document.querySelectorAll('input[name="shipping"]');

	shippingRadio.forEach((radioButton) => {
		radioButton.addEventListener("click", () => {
			if (radioButton.checked) {
				ui.renderTotal(cart);

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
			}
		});
	});
}
