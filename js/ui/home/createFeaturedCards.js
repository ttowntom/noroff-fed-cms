export function createHomeFeaturedCards(favs, apiUrl) {
	// Create container
	let featured = document.createElement("div");
	featured.classList.add("featured--container", "grid");

	// Create cards
	for (let i = 0; i < favs.length; i++) {
		let product = document.createElement("article");

		let card = document.createElement("a");
		card.classList.add("product--card", "flex", "flex--column");
		card.href = `products/productDetails/?id=${favs[i].id}`;

		let image = document.createElement("img");
		image.src = favs[i].image;
		image.alt = favs[i].title;

		let textSection = document.createElement("div");
		textSection.classList.add(
			"center",
			"flex",
			"flex--column",
			"flex--space-around"
		);

		let title = document.createElement("h3");
		title.innerText = favs[i].title;

		let price = document.createElement("div");
		price.classList.add("product--card-price-container");
		if (favs[i].discountedPrice === favs[i].price) {
			let basePrice = document.createElement("p");
			basePrice.classList.add(
				"product--card-uppercase",
				"product--card-single-line"
			);
			basePrice.innerText = "$" + favs[i].price;
			price.appendChild(basePrice);
		} else if (favs[i].discountedPrice < favs[i].price) {
			let discount = document.createElement("p");
			discount.classList.add(
				"product--card-uppercase",
				"product--card-on-sale"
			);
			discount.innerText = "$" + favs[i].discountedPrice;
			price.appendChild(discount);

			let basePrice = document.createElement("p");
			basePrice.innerText = "$" + favs[i].price;
			basePrice.classList.add("line-through");
			price.appendChild(basePrice);
		}

		let bottomSection = document.createElement("div");
		bottomSection.classList.add("width--100");

		let hr = document.createElement("div");
		hr.classList.add("hr");

		let details = document.createElement("p");
		details.classList.add("product--card-details");
		details.classList.add("product--card-uppercase");
		details.innerText = "See details";

		bottomSection.appendChild(hr);
		bottomSection.appendChild(details);

		textSection.appendChild(title);
		textSection.appendChild(price);
		textSection.appendChild(bottomSection);

		card.appendChild(image);
		card.appendChild(textSection);

		product.appendChild(card);

		featured.appendChild(product);
	}
	return featured.innerHTML;
}
