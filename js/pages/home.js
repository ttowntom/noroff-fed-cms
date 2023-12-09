import * as api from "/js/api/index.js";
import * as ui from "/js/ui/index.js";

export function home() {
	// Fetch products
	const apiUrl = `https://api.noroff.dev/api/v1/rainy-days/`;
	let products;
	let favs = [];

	async function getProducts() {
		try {
			products = await api.getAllProducts(apiUrl);

			// Find three favorites to feature
			for (let i = 0; i < products.length; i++) {
				if (favs.length < 3 && products[i].favorite === true) {
					favs.push(products[i]);
				}
			}

			// Create featured cards
			const featured = document.querySelector(`.featured--container`);
			featured.innerHTML = ui.createHomeFeaturedCards(favs, apiUrl);
		} catch (error) {
			ui.featuredProductsError();
			console.log(error);
		}
	}

	getProducts();
}
