import * as ui from "/js/ui/index.js";

export function checkoutProductCard(cart) {
	// Get element from page
	const cartListElement = document.querySelector(`.shopping--cart-itemsList`);

	// Create cards
	for (let i = 0; i < cart.length; i++) {
		// Create card container
		const cardContainer = document.createElement("div");
		cardContainer.classList.add("checkout--card", "grid");
		cardContainer.setAttribute("data-index", i);

		// Create product image
		const cardImage = document.createElement("img");
		cardImage.src = cart[i].images[0].src;
		cardImage.alt = cart[i].name;
		// Append image
		cardContainer.appendChild(cardImage);

		// Create card info
		const cardInfoContainer = document.createElement("div");
		cardInfoContainer.classList.add(
			"bg--accent-light",
			"clr--black",
			"grid",
			"checkout--card-info"
		);

		// Create top section of info
		const infoTop = document.createElement("div");
		infoTop.classList.add("checkout--card-top");

		// Create top section elements
		const infoTopTitle = document.createElement("h3");
		infoTopTitle.innerText = cart[i].name;

		const infoTopGender = document.createElement("p");
		if (cart[i].categories[0].name === "Female") {
			infoTopGender.innerText = "Women's";
		} else {
			infoTopGender.innerText = "Men's";
		}

		// Append top section elements
		infoTop.appendChild(infoTopTitle);
		infoTop.appendChild(infoTopGender);

		// Append top info section to card
		cardInfoContainer.appendChild(infoTop);

		// Create dropdowns
		const dropdowns = document.createElement("div");
		dropdowns.classList.add("checkout--card-select", "grid");

		// Create dropdown for size
		const sizeDropdown = document.createElement("div");

		// Create sizeDropdown elements
		// Create title
		const sizeTitle = document.createElement("p");
		sizeTitle.innerText = "Size";
		// Append title
		sizeDropdown.appendChild(sizeTitle);

		//Create sizeSelect container
		const sizeSelectContainer = document.createElement("div");
		sizeSelectContainer.classList.add("select");

		// Create sizeSelect label
		const sizeSelectLabel = document.createElement("label");
		sizeSelectLabel.setAttribute("for", "size-" + cart[i].id);
		sizeSelectLabel.classList.add("visually-hidden");
		sizeSelectLabel.innerText = "Size";
		// Append label to container
		sizeSelectContainer.appendChild(sizeSelectLabel);

		// Create sizeSelect
		const sizeSelect = document.createElement("select");
		sizeSelect.id = "size-" + cart[i].id;
		sizeSelect.name = "size-" + cart[i].id;

		// Create size options

		let sizesAvb = getSizes();
		// Function to find the "Size" attribute
		function getSizes() {
			let sizeArr = [];
			for (let i = 0; i < cart[i].attributes.length; i++) {
				if (cart[i].attributes[i].name === "Size") {
					cart[i].attributes[i].terms.forEach((term) => {
						sizeArr.push(term.name);
					});

					return sizeArr;
				}
			}
			return null; // Return null if the attribute is not found
		}

		sizesAvb.forEach((size) => {
			// Create option
			const sizeOption = document.createElement("option");
			sizeOption.value = size;
			sizeOption.innerText = size;

			if (cart[i].selectedSize === size) {
				sizeOption.selected = true;
			}

			sizeSelect.appendChild(sizeOption);
		});

		// Add event listener to size select
		sizeSelect.addEventListener("input", function () {
			const newSize = sizeSelect.value;
			cart[i].selectedSize = newSize;
			localStorage.setItem("cartItems", JSON.stringify(cart));
		});

		// Append size select to container
		sizeSelectContainer.appendChild(sizeSelect);
		sizeDropdown.appendChild(sizeSelectContainer);
		dropdowns.appendChild(sizeDropdown);

		// Create dropdown for quantity
		const quantityDropdown = document.createElement("div");
		quantityDropdown.classList.add("grid", "grid--right");

		// Create quantityDropdown elements
		// Create title
		const quantityTitle = document.createElement("p");
		quantityTitle.innerText = "Quantity";
		// Append title
		quantityDropdown.appendChild(quantityTitle);

		//Create quantitySelect container
		const quantitySelectContainer = document.createElement("div");
		quantitySelectContainer.classList.add("select");

		// Create quantitySelect label
		const quantitySelectLabel = document.createElement("label");
		quantitySelectLabel.setAttribute("for", "quantity-" + cart[i].id);
		quantitySelectLabel.classList.add("visually-hidden");
		quantitySelectLabel.innerText = "Quantity";
		// Append label to container
		quantitySelectContainer.appendChild(quantitySelectLabel);

		// Create quantitySelect
		const quantitySelect = document.createElement("select");
		quantitySelect.id = "quantity-" + cart[i].id;
		quantitySelect.name = "quantity-" + cart[i].id;

		// Create quantity options
		const quantity = cart[i].quantity;
		for (let j = 1; j <= 5; j++) {
			// Create option
			const quantityOption = document.createElement("option");
			quantityOption.value = j;
			quantityOption.innerText = j;

			if (quantity == j) {
				quantityOption.selected = true;
			}

			quantitySelect.appendChild(quantityOption);
		}

		// Add event listener to quantity select
		quantitySelect.addEventListener("input", function () {
			const newQuantity = quantitySelect.value;
			const itemIndex = parseInt(cardContainer.getAttribute("data-index"));

			if (!isNaN(itemIndex) && cart[itemIndex]) {
				cart[itemIndex].quantity = newQuantity;
				localStorage.setItem("cartItems", JSON.stringify(cart));

				const newPrice =
					cart[itemIndex].prices.price.slice(0, -2) * newQuantity;
				const formattedPrice = newPrice.toFixed(0);
				price.innerText = formattedPrice + " kr";

				ui.renderTotal(cart);
			}
		});

		// Append quantity select to container
		quantitySelectContainer.appendChild(quantitySelect);
		quantityDropdown.appendChild(quantitySelectContainer);
		dropdowns.appendChild(quantityDropdown);
		cardInfoContainer.appendChild(dropdowns);

		// Create card bottom container
		const cardBottomContainer = document.createElement("div");
		cardBottomContainer.classList.add("grid", "checkout--card-bottom");

		// Create card bottom elements
		// Create price
		const priceElement = document.createElement("div");
		const price = document.createElement("strong");
		price.ariaDescription = "Price";
		const priceAmount = cart[i].prices.price.slice(0, -2) * cart[i].quantity;
		const priceFormatted = priceAmount.toFixed(0);
		price.innerText = priceFormatted + " kr";
		priceElement.appendChild(price);

		// Append price
		cardBottomContainer.appendChild(priceElement);

		//Create remove
		const removeElement = document.createElement("div");
		const removeIcon = document.createElement("i");
		removeIcon.classList.add("fa-solid", "fa-trash-can", "float--right");
		removeIcon.ariaLabel = "Remove from cart";
		removeElement.appendChild(removeIcon);

		// Add event listener to remove element
		removeElement.addEventListener("click", function () {
			const indexToRemove = parseInt(cardContainer.getAttribute("data-index")); // Get the index from the data attribute

			if (!isNaN(indexToRemove)) {
				cart.splice(indexToRemove, 1);

				// Update data-index attribute for the remaining items
				const cardContainers = document.querySelectorAll(".checkout--card");
				cardContainers.forEach((container, index) => {
					container.setAttribute("data-index", index);
				});

				localStorage.setItem("cartItems", JSON.stringify(cart));

				cardContainer.remove();
				ui.setCartCount();
			}
		});

		// Append remove
		cardBottomContainer.appendChild(removeElement);

		// Append
		cardInfoContainer.appendChild(cardBottomContainer);
		cardContainer.appendChild(cardInfoContainer);
		const secondChild = cartListElement.children[1];
		cartListElement.insertBefore(cardContainer, secondChild);
	}
}
