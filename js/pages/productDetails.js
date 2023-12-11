import * as api from "/js/api/index.js";
import * as window from "/js/window/index.js";
import * as ui from "/js/ui/index.js";

export function productDetails() {
	// Get query string
	const params = window.getQueryString();
	const productId = params.searchParams.get("id");
	const category = params.searchParams.get("gender");

	// Fetch product data
	const apiUrl = `https://wp.ttowntom.com/wp-json/wc/store/products/${productId}`;

	let product;
	async function getProduct() {
		try {
			product = await api.getProduct(apiUrl);

			// Render breadcrumbs
			ui.renderBreadcrumbs();
			// Render gallery
			// -- Create thumbnails
			const thumbnails = document.querySelector(`.thumbnails`);
			const thumbnailsImages = ui.thumbnail(product.image, product.title);
			thumbnails.insertBefore(thumbnailsImages, thumbnails.firstChild);
			// -- Gallery function
			ui.gallery();

			// Render Hero section
			ui.renderDetailsHeroSection(product, productId, category);
			ui.handleAddToCart(product);

			// Handle sizes click
			ui.handleSizeClick();

			// Render description
			ui.renderDetailDescription(product);

			// Change page title
			window.changePageTitle(
				`${product.title
					.replace("Rainy Days ", "")
					.replace(" Jacket", "")} | Rainy Days`
			);
		} catch (error) {
			ui.productDetailsError();
		}
	}

	getProduct();
}
