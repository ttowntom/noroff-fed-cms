// Suggestion by Kevin Powell: https://youtu.be/HbBMp6yUXO0
export function mobileNav() {
	const mobileNav = document.querySelector("#nav--mobile");
	const navToggle = document.querySelector("#sidecart--button");

	navToggle.addEventListener("click", () => {
		const visibility = mobileNav.getAttribute("data-visible");

		if (visibility === "false") {
			mobileNav.setAttribute("data-visible", "true");
			navToggle.setAttribute("aria-expanded", "true");
		} else if (visibility === "true") {
			mobileNav.setAttribute("data-visible", "false");
			navToggle.setAttribute("aria-expanded", "false");
		}
	});
}
