// Create hero text
export function createHeroText(title, slug) {
	const heroTextContainer = document.createElement("div");

	const heroTitle = document.createElement("h2");
	heroTitle.classList.add("center");
	heroTitle.innerText = title;

	const heroSlug = document.createElement("p");
	heroSlug.innerText = slug;

	heroTextContainer.appendChild(heroTitle);
	heroTextContainer.appendChild(heroSlug);

	return heroTextContainer.innerHTML;
}
