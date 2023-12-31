import * as api from "/js/api/index.js";
import * as ui from "/js/ui/index.js";
import * as window from "/js/window/index.js";

export function products() {
	// Get query string
	const params = window.getQueryString();
	let category = params.searchParams.get("gender");
	if (!category) {
		category = "female";
	}

	// Render hero section
	// -- Create buttons
	const heroButtons = document.querySelector(`.hero--btn`);
	const buttonMen = ui.createHeroButton("?gender=male", "Men's");
	const buttonWomen = ui.createHeroButton("?gender=female", "Women's");

	heroButtons.appendChild(buttonMen);
	heroButtons.appendChild(buttonWomen);

	// -- Render category items
	const heroImage = document.querySelector(`.hero--img`);
	const heroHeader = document.querySelector(`.products--text`);
	let title;
	if (category === "female") {
		title = `Women's Jackets | Rainy Days`;
		heroImage.id = "hero--img-productsWomen";
		buttonWomen.classList.add("hero--btn-current");
		buttonMen.classList.remove("hero--btn-current");
		heroHeader.innerHTML = ui.createHeroText(
			"Our women's collection",
			`Step into the world of outdoor exploration with Rainy Days' remarkable women's collection. Designed to empower and inspire, our range of rain jackets effortlessly blends style and performance. Whether you're conquering trails, embracing the slopes, or simply enjoying nature's beauty,  our jackets offer unrivaled comfort and protection.`
		);
	} else if ((category = "male")) {
		title = `Men's Jackets | Rainy Days`;
		heroImage.id = "hero--img-productsMen";
		buttonWomen.classList.remove("hero--btn-current");
		buttonMen.classList.add("hero--btn-current");
		heroHeader.innerHTML = ui.createHeroText(
			"Our men's collection",
			`Unleash your outdoor potential with Rainy Days' exceptional men's collection. Our jackets combine functionality, durability, and style to elevate your outdoor experience. Designed for the modern adventurer, our range offers comfort and protection from the elements.`
		);
	}
	window.changePageTitle(title);

	// Fetch product data
	const apiUrl =
		"https://wp.ttowntom.com/wp-json/wc/store/products/?per_page=50";
	let products = [];
	let filteredProducts = [];
	async function getProducts() {
		try {
			products = await api.getAllProducts(apiUrl);
			filteredProducts = [...products];

			createCards(products);
		} catch (error) {
			console.log(error);
			ui.productsError();
		}
	}

	getProducts();

	// Create cards
	const createCards = function (products) {
		// Render product cards
		const productsContainer = document.querySelector(`#products`);
		productsContainer.innerHTML = `<h2 class="visually-hidden">Women's jackets</h2>`;

		for (let product = 0; product < products.length; product++) {
			if (products[product].categories[0].slug.toLowerCase() === category) {
				// Create product cards
				let cards = ui.createProductCard(products, category, product);
				productsContainer.appendChild(cards);
			}
		}
	};

	// Sort and filter
	// -- Sort
	const sortSelect = document.querySelectorAll(`#sort input`);
	for (let i = 0; i < sortSelect.length; i++) {
		sortSelect[i].addEventListener("change", function () {
			if (sortSelect[i].value === "sort-price") {
				filteredProducts.sort(function (a, b) {
					return a.prices.price - b.prices.price;
				});
			} else if (sortSelect[i].value === "sort-name") {
				filteredProducts.sort(function (a, b) {
					return a.name.localeCompare(b.name);
				});
			}
			createCards(filteredProducts);
		});
	}

	// -- Filter
	function checkSales(product) {
		return product.on_sale === true && product.categories[0].slug === category;
	}

	const filterSelect = document.querySelector(`#filter input`);
	filterSelect.addEventListener("change", function () {
		if (filterSelect.checked === true) {
			filteredProducts = products.filter(checkSales);
		} else {
			filteredProducts = [...products];
		}
		createCards(filteredProducts);
	});
}
