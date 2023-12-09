import * as api from "/js/api/index.js";
import * as window from "/js/window/index.js";

export async function renderBreadcrumbs() {
	// Get query string
	const params = window.getQueryString();
	const productId = params.searchParams.get("id");

	// Product data api
	const apiUrl = `https://api.noroff.dev/api/v1/rainy-days/${productId}`;

	// Get HTML element
	const breadcrumbsElement = document.querySelector("#breadcrumbs--nav");

	try {
		// Fetch data
		const product = await api.getProduct(apiUrl);

		// Set up category
		let category = product.gender.toLowerCase();

		// Create breadcrumbs
		const breadcrumbs = document.createElement("div");
		// Create home li
		const bcHome = document.createElement("li");
		const aHome = document.createElement("a");
		aHome.href = "/";
		aHome.innerText = "Home";
		bcHome.appendChild(aHome);
		// Create category li
		const bcCategory = document.createElement("li");
		const aCategory = document.createElement("a");

		aCategory.href = `/products/?gender=${category}`;
		aCategory.innerText =
			category === "female" ? `Women's jackets` : `Men's jackets`;
		bcCategory.appendChild(aCategory);

		// Append lis to menu
		breadcrumbs.appendChild(bcHome);
		breadcrumbs.appendChild(bcCategory);

		// Create product li
		const bcProduct = document.createElement("li");

		// Create product link
		const bcProductLink = document.createElement("a");
		bcProductLink.href = `/products/productDetails/?id=${productId}`;
		bcProductLink.innerText = product.title
			.replace("Rainy Days ", "")
			.replace(" Jacket", "");

		// Render on product details page
		if (
			location.pathname === "/products/productdetails/" ||
			location.pathname === "/products/productDetails/"
		) {
			bcProduct.innerText = product.title
				.replace("Rainy Days ", "")
				.replace(" Jacket", "");
			bcProduct.classList.add("current");
			breadcrumbs.appendChild(bcProduct);
			breadcrumbsElement.innerHTML = breadcrumbs.innerHTML;
		}

		// Create checkout li
		const bcCheckout = document.createElement("li");

		// Render on checkout page
		if (location.pathname === "/checkout/") {
			// Append product link to li
			bcProduct.appendChild(bcProductLink);
			breadcrumbs.appendChild(bcProduct);

			bcCheckout.innerText = "Checkout";
			bcCheckout.classList.add("current");
			breadcrumbs.appendChild(bcCheckout);
			breadcrumbsElement.innerHTML = breadcrumbs.innerHTML;
		}

		// Create checkout scucess li
		const bcCheckoutSuccess = document.createElement("li");
		bcCheckoutSuccess.innerText = "Checkout confirmation";

		// Render on checkout success page
		if (location.pathname === "/checkout/success/") {
			// Append product link to ul
			bcProduct.appendChild(bcProductLink);
			breadcrumbs.appendChild(bcProduct);
			bcCheckoutSuccess.classList.add("current");

			// Append checkout to ul
			const checkoutGrey = document.createElement("p");
			checkoutGrey.innerText = "Checkout";
			bcCheckout.appendChild(checkoutGrey);
			breadcrumbs.appendChild(bcCheckout);

			// Append checkout success to ul
			bcCheckoutSuccess.classList.add("current");
			breadcrumbs.appendChild(bcCheckoutSuccess);
			breadcrumbsElement.innerHTML = breadcrumbs.innerHTML;
		}
	} catch (error) {
		console.log(error);
	}
}
