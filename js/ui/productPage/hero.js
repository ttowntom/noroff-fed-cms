// Render hero section
export function renderDetailsHeroSection(product, productId, category) {
	const heroContainer = document.querySelector(`.hero--content`);

	// Render hero title
	const heroTitle = document.createElement("h1");
	heroTitle.innerText = product.name;

	// Render color
	const heroColor = document.createElement("h2");

	// Function to find the "Color" attribute
	function getColor(attributes) {
		for (let i = 0; i < attributes.length; i++) {
			if (attributes[i].name === "Color") {
				return attributes[i].terms[0].name;
			}
		}
		return null; // Return null if the attribute is not found
	}

	heroColor.innerText = getColor(product.attributes);

	// Render price tag
	let heroPrice;
	if (product.on_sale === true) {
		heroPrice = document.createElement("div");
		heroPrice.classList.add("grid");

		// Create base price
		let heroBasePrice = document.createElement("p");
		heroBasePrice.classList.add("line-through");
		heroBasePrice.innerText = `${product.prices.regular_price.slice(0, -2)} kr`;

		// Create discounted price
		let heroDiscountedPrice = document.createElement("strong");
		heroDiscountedPrice.classList.add(
			"product--hero-price",
			"product--card-on-sale",
			"product--card-uppercase"
		);
		heroDiscountedPrice.innerText = `${product.prices.sale_price.slice(
			0,
			-2
		)} kr`;

		// Render price
		heroPrice.appendChild(heroDiscountedPrice);
		heroPrice.appendChild(heroBasePrice);
	} else {
		heroPrice = document.createElement("strong");
		heroPrice.classList.add("product--hero-price", "product--card-uppercase");
		heroPrice.innerText = `${product.prices.regular_price.slice(0, -2)} kr`;
	}

	// Render sizes
	const heroSizes = document.createElement("div");
	heroSizes.classList.add("flex", "flex--left", "size--wrapper");
	heroSizes.ariaLabel = "Sizes";

	// Function to find the "Size" attribute
	function getSizes(attributes) {
		for (let i = 0; i < attributes.length; i++) {
			if (attributes[i].name === "Size") {
				return attributes[i].terms;
			}
		}
		return null; // Return null if the attribute is not found
	}

	const sizes = getSizes(product.attributes);

	for (let i = 0; i < sizes.length; i++) {
		const heroSize = document.createElement("div");
		heroSize.classList.add("size", "size--ring", "flex", "center");
		heroSize.ariaDescription = `Size: ${sizes[i].name}`;
		heroSize.innerText = sizes[i].name;
		heroSizes.appendChild(heroSize);
	}

	heroSizes.children[2].classList.add("size--ring-active");

	// Render button
	const heroButton = document.createElement("a");
	heroButton.classList.add("btn--green", "add-to-cart");
	heroButton.href = `/checkout/?id=${productId}`;
	heroButton.innerText = "Add to cart";

	// Append to hero section
	heroContainer.innerHTML = "";
	heroContainer.appendChild(heroTitle);
	heroContainer.appendChild(heroColor);
	heroContainer.appendChild(heroPrice);
	heroContainer.appendChild(heroSizes);
	heroContainer.appendChild(heroButton);
}
