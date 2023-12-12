// Create gallery thumbnail
export function thumbnail(url, alt) {
	let thumbsnails = document.querySelector(`.thumbnails`);
	const thumbnail = document.createElement("img");
	thumbnail.src = url;
	thumbnail.alt = alt;
	thumbsnails.appendChild(thumbnail);
	return thumbnail;
}

// Gallery functions
export function gallery() {
	// Suggested by ChatGTP - after some back and forth :P
	$(document).ready(function () {
		// 	// Get the hero image element
		var heroImg = $("#hero--img-stormChaser");
		// 	// Get the thumbnail images
		var thumbnails = $(".thumbnails img");

		// Set hero image
		const firstThumbSrc = thumbnails[0].currentSrc;
		heroImg.css("--background-img", "url(" + firstThumbSrc + ")");

		// Add click event handler for each thumbnail
		thumbnails.click(function () {
			// Remove the 'active' class from all thumbnails
			thumbnails.removeClass("active");
			// Add the 'active' class to the clicked thumbnail
			$(this).addClass("active");

			// Get the source of the clicked thumbnail
			var newImageSrc = $(this).attr("src");

			// Update the custom property value
			heroImg.css("--background-img", "url(" + newImageSrc + ")");
		});
	});
}
