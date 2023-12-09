// Get query string
export function getQueryString() {
	const url = new URL(location.href);
	return url;
}
