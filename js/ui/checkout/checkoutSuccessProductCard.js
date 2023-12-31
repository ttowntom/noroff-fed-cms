export function renderCheckoutSuccessProductCards() {
	const cart = JSON.parse(sessionStorage.getItem("cartItems"));
	const page = document.querySelector(`.shopping--cart`);

	for (let i = 0; i < cart.length; i++) {
		// Create card container
		const cardContainer = document.createElement("div");
		cardContainer.classList.add("checkout--card", "grid");

		// Create product image
		const cardImage = document.createElement("img");
		cardImage.src = cart[i].images[0].src;
		cardImage.alt = cart[i].name;
		// Apend product image to card
		cardContainer.appendChild(cardImage);

		// Create info box
		const infoBox = document.createElement("div");
		infoBox.classList.add(
			"bg--accent-light",
			"clr--black",
			"grid",
			"checkout--card-info"
		);

		// Create top section of info box
		const infoTop = document.createElement("div");
		infoTop.classList.add("checkout--card-top");

		// Create title
		const title = document.createElement("h3");
		title.innerText = cart[i].name;

		// Create color
		const color = document.createElement("p");
		color.innerText = cart[i].baseColor;

		// Function to find the "Color" attribute
		function getColor(attributes) {
			for (let i = 0; i < attributes.length; i++) {
				if (attributes[i].name === "Color") {
					return attributes[i].terms[0].name;
				}
			}
			return null; // Return null if the attribute is not found
		}

		color.innerText = getColor(cart[i].attributes);

		// Append title and color to top
		infoTop.appendChild(title);
		infoTop.appendChild(color);
		// Apppend top section of info box to info box
		infoBox.appendChild(infoTop);

		// Create bottom section of info box
		const infoBottom = document.createElement("div");
		infoBottom.classList.add("grid", "checkout--card-bottom");

		// Create order summary text

		const summaryText = document.createElement("p");
		summaryText.innerText = `${cart[i].quantity}x ${
			cart[i].gender === "Female" ? "Women's" : "Men's"
		}, ${cart[i].selectedSize}`;
		// Append order summary text to info bottom
		infoBottom.appendChild(summaryText);

		// Create price container
		const priceContainer = document.createElement("div");

		// Create price
		const priceAmount = cart[i].prices.price.slice(0, -2) * cart[i].quantity;
		const priceFormatted = priceAmount.toLocaleString("no-NO", {
			minimumFractionDigits: 0,
		});
		const price = document.createElement("strong");
		price.classList.add("float--right");
		price.ariaLabel = "Price";

		price.innerText = priceFormatted + " kr";
		// Append price to info bottom section
		infoBottom.appendChild(price);

		// Append price container to info bottom section
		infoBottom.appendChild(priceContainer);

		// Append bottom section of info box to info bnox
		infoBox.appendChild(infoBottom);

		// Append info box to card
		cardContainer.appendChild(infoBox);

		// Append card to page
		const secondChild = page.children[1];
		page.insertBefore(cardContainer, secondChild);
	}
}
