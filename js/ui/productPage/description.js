// Render description
export function renderDetailDescription(product) {
	const descriptionContainer = document.querySelector(
		`.product--description-container`
	);
	//Render header
	const descHeader = document.createElement("h2");
	descHeader.classList.add("product--description-header");
	descHeader.innerText = product.name + " description";
	// Render description
	const descParagraph = document.createElement("p");
	descParagraph.innerHTML = product.description;
	// Append to description container
	descriptionContainer.innerHTML = "";
	descriptionContainer.appendChild(descHeader);
	descriptionContainer.appendChild(descParagraph);

	// Grab rating containers
	const waterproof = document.querySelector(`#rating-waterproof`);
	const windproof = document.querySelector(`#rating-windproof`);
	const durable = document.querySelector(`#rating-durable`);
	const lightweight = document.querySelector(`#rating-lightweight`);

	// Grab rating values
	const waterproofRating = Number(getRating(product.attributes, "Waterproof"));
	const windproofRating = Number(getRating(product.attributes, "Windproof"));
	const durableRating = Number(getRating(product.attributes, "Durable"));
	const lightweightRating = Number(
		getRating(product.attributes, "Lightweight")
	);

	// Function to find ratings
	function getRating(attributes, feature) {
		for (let i = 0; i < attributes.length; i++) {
			if (attributes[i].name === feature) {
				return attributes[i].terms[0].name;
			}
		}
		return null; // Return null if the attribute is not found
	}

	// Render rating
	renderRating(waterproofRating, waterproof);
	renderRating(windproofRating, windproof);
	renderRating(durableRating, durable);
	renderRating(lightweightRating, lightweight);

	// Function to render rating graphics
	function renderRating(rating, container) {
		container.innerHTML = "";
		for (let i = 0; i < 10; i++) {
			if (i < rating) {
				// Render empty dots
				const emptyDot = document.createElement("div");
				emptyDot.classList.add("scale", "scale--dot", "flex", "center");
				container.appendChild(emptyDot);
			} else if (i === rating) {
				// Render the rating dot
				const ratingDot = document.createElement("div");
				ratingDot.classList.add("scale", "scale--dot", "flex", "center");
				ratingDot.ariaLabel = `Rating out of 10`;
				ratingDot.innerText = rating;
				container.appendChild(ratingDot);
			} else if (i > rating) {
				// Render empty rings
				const emptyRing = document.createElement("div");
				emptyRing.classList.add("scale", "scale--ring", "flex", "center");
				container.appendChild(emptyRing);
			}
		}
	}

	// Grab features container (ul)
	const featuresContainer = document.querySelector(`#features`);

	// Render features
	let attributesArray = getFeatures();
	for (let a = 0; a < attributesArray.length; a++) {
		const li = document.createElement("li");
		li.innerText = attributesArray[a];
		featuresContainer.appendChild(li);
	}

	// Function to get features
	function getFeatures() {
		featuresContainer.innerHTML = "";
		let attArray = [];
		for (let i = 0; i < product.attributes.length; i++) {
			if (product.attributes[i].name === "Features") {
				let attArray = product.attributes[i].terms;
				let attArrayNames = [];
				for (let j = 0; j < attArray.length; j++) {
					attArrayNames.push(attArray[j].name);
				}
				return attArrayNames;
			}
		}
	}

	// Render weight
	for (let i = 0; i < product.attributes.length; i++) {
		if (product.attributes[i].name === "Weight") {
			const li = document.createElement("li");
			li.innerText = product.attributes[i].terms[0].name;
			featuresContainer.appendChild(li);
		}
	}
}
