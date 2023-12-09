export function storeFormData() {
	const email = document.querySelector(`input[name="email"]`);
	const newsletter = document.querySelector(`input[name="newsletter"]`);
	const firstName = document.querySelector(`input[name="first-name"]`);
	const lastName = document.querySelector(`input[name="last-name"]`);
	const phone = document.querySelector(`input[name="phone"]`);
	const address = document.querySelector(`input[name="address"]`);
	const apartment = document.querySelector(`input[name="apartment"]`);
	const zip = document.querySelector(`input[name="zip"]`);
	const city = document.querySelector(`input[name="city"]`);
	const cardholder = document.querySelector(`input[name="cardholder"]`);

	let formData = {
		email: "",
		newsletter: false,
		firstName: "",
		lastName: "",
		phone: "",
		address: "",
		apartment: "",
		city: "",
		zip: "",
		cardholder: "",
	};

	if (email.value) {
		formData.email = email.value;
	}
	if (newsletter.checked === true) {
		formData.newsletter = true;
	}
	if (firstName.value) {
		formData.firstName = firstName.value;
	}
	if (lastName.value) {
		formData.lastName = lastName.value;
	}
	if (phone.value) {
		formData.phone = phone.value;
	}
	if (address.value) {
		formData.address = address.value;
	}
	if (apartment.value) {
		formData.apartment = apartment.value;
	}
	if (city.value) {
		formData.city = city.value;
	}
	if (zip.value) {
		formData.zip = zip.value;
	}
	if (cardholder.value) {
		formData.cardholder = cardholder.value;
	}

	sessionStorage.setItem("formData", JSON.stringify(formData));
}
