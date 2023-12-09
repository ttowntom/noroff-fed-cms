export function renderCustomerInformation() {
	const formData = JSON.parse(sessionStorage.getItem("formData"));
	const selectedShipping = JSON.parse(
		sessionStorage.getItem("selectedShipping")
	);

	let shipping;
	if (selectedShipping.value === "express") {
		shipping = "Express";
	} else {
		shipping = "Royal Mail";
	}

	const emailElement = document.querySelector(`.formData--email`);
	const nameElement = document.querySelector(`.formData--name`);
	const addressElement = document.querySelector(`.formData--address`);
	const zipElement = document.querySelector(`.formData--zip`);
	const nameBillingElement = document.querySelector(`.formData--nameBilling`);
	const addressBillingElement = document.querySelector(
		`.formData--addressBilling`
	);
	const zipBillingElement = document.querySelector(`.formData--zipBilling`);
	const countryElement = document.querySelector(`.formData--country`);
	const phoneElement = document.querySelector(`.formData--phone`);
	const shippingElement = document.querySelector(`.formData--shippingMethod`);
	const priceElement = document.querySelector(`.creditcard-icon`);
	const total = document.querySelector(`.checkout--total`);

	emailElement.innerText = formData.email;
	nameElement.innerText = `${formData.firstName} ${formData.lastName}`;
	addressElement.innerText = formData.address;
	zipElement.innerText = `${formData.zip} ${formData.city}`;
	phoneElement.innerText = formData.phone;
	shippingElement.innerText = shipping;
	priceElement.innerText = total.innerText;
	nameBillingElement.innerText = `${formData.firstName} ${formData.lastName}`;
	addressBillingElement.innerText = formData.address;
	zipBillingElement.innerText = `${formData.zip} ${formData.city}`;
}
