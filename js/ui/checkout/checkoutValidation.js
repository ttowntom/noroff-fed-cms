export function formValidation() {
  const emailInput = document.querySelector("#email-input");
  const firstNameInput = document.querySelector("#first-name-input");
  const lastNameInput = document.querySelector("#last-name-input");
  const phoneInput = document.querySelector("#phone-input");
  const addressInput = document.querySelector("#address-input");
  const zipInput = document.querySelector("#zip-input");
  const cityInput = document.querySelector("#city-input");

  const form = document.querySelector(".checkout--shipping-form");
  const fields = form.querySelectorAll("div[id]");
  const payButton = document.querySelector(
    '.checkout--shipping-form input[type="submit"]'
  );
  const payError = document.querySelector("#error");

  // Display error
  function displayError(field, error) {
    field.innerHTML = `<p>${error}</p>`;
    field.classList.remove("display--none");
    payButton.id = "btn--disable";
    payError.classList.remove("display--none");
  }

  // Function to hide the error message
  function hideError(field) {
    field.innerHTML = "";
    field.classList.add("display--none");
    payButton.id = "";
    payError.classList.add("display--none");
  }

  // Add dirty listeners
  function addDirtyListeners() {
    const form = document.querySelector(".checkout--shipping-form");
    let inputs = form.getElementsByTagName("input");
    for (let i = 0; i < inputs.length; i++) {
      let input = inputs[i];
      input.addEventListener("blur", handleBlurValidation);
    }
  }

  // Create an object to store custom error messages from the title attribute of input elements
  const customErrorMessages = {};

  // Get all input elements within the form and extract their title attributes for custom error messages
  function extractErrorMessages() {
    const form = document.querySelector(".checkout--shipping-form");
    const inputs = form.querySelectorAll("input");

    inputs.forEach((input) => {
      const fieldName = input.getAttribute("name");
      const title = input.getAttribute("title");
      if (fieldName && title) {
        customErrorMessages[fieldName] = title.trim();
      }
    });
  }

  // Call the function to extract error messages on page load
  window.addEventListener("load", extractErrorMessages);

  // Handle validation on blur event
  function handleBlurValidation(evt) {
    let element = evt.target;
    if (element.nodeName === "INPUT") {
      element.classList.add("dirty");

      // Get the name and corresponding div in fields collection
      const fieldName = element.getAttribute("name");
      const correspondingDiv = Array.from(fields).find(
        (div) => div.id === fieldName
      );

      if (correspondingDiv) {
        if (!element.validity.valid) {
          const errorMessage =
            customErrorMessages[fieldName] || "Invalid input";
          displayError(
            correspondingDiv.querySelector(".validation"),
            errorMessage
          );
        } else {
          hideError(correspondingDiv.querySelector(".validation"));
        }
      }
    }
  }

  // Key filtering
  class FormKeyFiler {
    handleEvent(evt) {
      let element = evt.srcElement;
      let key = evt.key;

      // Allow navigation keys
      if (
        key === "Backspace" ||
        key === "Delete" ||
        key === "ArrowLeft" ||
        key === "ArrowRight" ||
        key === "Tab" ||
        key === "ArrowUp" ||
        key === "ArrowDown" ||
        key === "End" ||
        key === "Home" ||
        key === "PageUp" ||
        key === "PageDown" ||
        key === "Shift"
      )
        return;

      // Allow modifiers
      if (!evt.ctrlKey && !evt.metaKey && !evt.altKey) {
        // Use data-allow to allow specific characters
        if (element.hasAttribute("data-allow")) {
          let allowregex = element.getAttribute("data-allow");
          let testexpr = new RegExp(allowregex, "g");
          if (testexpr.test(key)) return;

          evt.preventDefault();
        }

        // Use data-block to block specific characters
        if (element.hasAttribute("data-block")) {
          let blockregex = element.getAttribute("data-block");
          let testexpr = new RegExp(blockregex, "g");
          if (testexpr.test(key)) evt.preventDefault();
        }
      }
    }
  }

  // Use key filtering
  const filter = new FormKeyFiler();
  emailInput.addEventListener("keydown", filter);
  firstNameInput.addEventListener("keydown", filter);
  lastNameInput.addEventListener("keydown", filter);
  phoneInput.addEventListener("keydown", filter);
  addressInput.addEventListener("keydown", filter);
  zipInput.addEventListener("keydown", filter);
  cityInput.addEventListener("keydown", filter);

  // Add dirty listeners
  addDirtyListeners();
}
