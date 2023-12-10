import * as api from "/js/api/index.js";
import * as ui from "/js/ui/index.js";

export function home() {
	// Fetch products
	const apiUrl = "https://wp.ttowntom.com/wp-json/wc/store/products/";
	let products;
	let favs = [];

	async function getProducts() {
		try {
			products = await api.getAllProducts(apiUrl);

			// Find three favorites to feature
			for (let i = 0; i < products.length; i++) {
				if (favs.length < 3 && products[i].on_sale === true) {
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
