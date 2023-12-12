// Get all products
export async function getAllProducts(apiUrl) {
	if (!sessionStorage.products) {
		try {
			const response = await fetch(apiUrl);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data = await response.json();
			sessionStorage.setItem("products", JSON.stringify(data));
			return data;
		} catch (error) {
			console.log(error);
		}
	} else {
		return JSON.parse(sessionStorage.products);
	}
}

// Get a spesific product
export async function getProduct(apiUrl) {
	const product = findProduct(apiUrl);

	if (!product) {
		try {
			const response = await fetch(apiUrl);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data = await response.json();
			return data;
		} catch (error) {
			console.log(error);
		}
	} else {
		return product;
	}
}

// Function to find a spesific product in session storage
function findProduct(apiUrl) {
	const id = Number(apiUrl.substring(apiUrl.lastIndexOf("/") + 1));

	if (!sessionStorage.products) {
		return null;
	}

	const products = JSON.parse(sessionStorage.products);
	const product = products.find((product) => product.id === id);
	if (!product) {
		return null;
	}
	return product;
}
