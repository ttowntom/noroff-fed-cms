// Render description
export function renderDetailDescription(product) {
	const descriptionContainer = document.querySelector(
		`.product--description-container`
	);
	//Render header
	const descHeader = document.createElement("h2");
	descHeader.classList.add("product--description-header");
	descHeader.innerText = "The ultimate protection against the elements";
	// Render description
	const descParagraph = document.createElement("p");
	descParagraph.innerText = product.description;
	// Append to description container
	descriptionContainer.innerHTML = "";
	descriptionContainer.appendChild(descHeader);
	descriptionContainer.appendChild(descParagraph);
}
