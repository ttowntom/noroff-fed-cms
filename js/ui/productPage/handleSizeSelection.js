export function handleSizeClick() {
	const sizes = document.querySelectorAll('[aria-label="Sizes"] .size--ring');

	sizes.forEach((size) => {
		size.addEventListener("click", function () {
			// Remove the styling from all size elements
			sizes.forEach((otherSize) => {
				otherSize.classList.remove("size--ring-active");
			});

			// Add the styling to the clicked size element
			this.classList.add("size--ring-active");
		});
	});
}
