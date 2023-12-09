// Render hero section
export function renderDetailsHeroSection(product, productId, category) {
	const heroContainer = document.querySelector(`.hero--content`);

	// Render hero title
	const heroTitle = document.createElement("h1");
	heroTitle.innerText = product.title
		.replace("Rainy Days ", "")
		.replace(" Jacket", "");

	// Render color
	const heroColor = document.createElement("h2");
	heroColor.innerText = product.baseColor;

	// Render price tag
	let heroPrice;
	if (product.discountedPrice < product.price) {
		heroPrice = document.createElement("div");
		heroPrice.classList.add("grid");

		// Create base price
		let heroBasePrice = document.createElement("p");
		heroBasePrice.classList.add("line-through");
		heroBasePrice.innerText = `$${product.price}`;

		// Create discounted price
		let heroDiscountedPrice = document.createElement("strong");
		heroDiscountedPrice.classList.add(
			"product--hero-price",
			"product--card-on-sale",
			"product--card-uppercase"
		);
		heroDiscountedPrice.innerText = `$${product.discountedPrice}`;

		// Render price
		heroPrice.appendChild(heroDiscountedPrice);
		heroPrice.appendChild(heroBasePrice);
	} else {
		heroPrice = document.createElement("strong");
		heroPrice.classList.add("product--hero-price", "product--card-uppercase");
		heroPrice.innerText = `$${product.price}`;
	}

	// Render sizes
	const heroSizes = document.createElement("div");
	heroSizes.classList.add("flex", "flex--left", "size--wrapper");
	heroSizes.ariaLabel = "Sizes";

	for (let i = 0; i < product.sizes.length; i++) {
		const heroSize = document.createElement("div");
		heroSize.classList.add("size", "size--ring", "flex", "center");
		heroSize.ariaDescription = `Size: ${product.sizes[i]}`;
		heroSize.innerText = product.sizes[i];
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
