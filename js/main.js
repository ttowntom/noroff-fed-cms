import * as ui from "./ui/index.js";
import * as pages from "./pages/index.js";

// Shopping cart
ui.setCartCount();
let cart = ui.getCart();

// Render mobile navigation
ui.mobileNav();

// Page spesific functions
if (location.pathname === "/") {
	pages.home();
}

if (location.pathname === "/products/") {
	pages.products();
}

if (
	location.pathname === "/products/productdetails/" ||
	location.pathname === "/products/productDetails/"
) {
	pages.productDetails();
}

if (location.pathname === "/checkout/") {
	pages.checkout(cart);
}

if (location.pathname === "/checkout/success/") {
	pages.checkoutSuccess(cart);
}
