function designPackSpecificFunctions(selectedOptionsFromMode) {
  var designPackData = JSON.parse(localStorage.getItem("designPackData"));

  function updateMode(selectedMode) {
    designPackData.mode = selectedMode.toLowerCase();
    localStorage.setItem("developmentPackData", JSON.stringify(designPackData));
  }

  function onModeChange(newMode) {
    // Update developmentPackData with the new mode
    designPackData.mode = newMode.toLowerCase();
    updateLocalStorage(); // Save the changes to localStorage

    // Update UI elements related to the mode change
    var dropdownLabel = document.querySelector("#navbarDropdownMenuLink");
    dropdownLabel.textContent = "Mode: " + capitalizeFirstLetter(newMode);
    transformServicesToMode(newMode);

    // ... any other UI updates related to the mode change ...
  }

  var divTexts = {};
  var selectedServices = [];

  function updateLocalStorage() {
    localStorage.setItem("developmentPackData", JSON.stringify(designPackData));
  }

  function runThisCode() {
    function sanitizeMode(mode) {
      // Define the allowed modes
      const allowedModes = [
        "budget",
        "value",
        "agile",
        "default",
        "personalized",
      ];
      // Remove any characters that are not spaces or alphanumerics and convert to lowercase
      const sanitized = mode.replace(/[^a-zA-Z0-9\s]/g, "").toLowerCase();
      // Split by spaces and filter out any words that are not in the allowed modes
      const filteredWords = sanitized
        .split(" ")
        .filter((word) => allowedModes.includes(word));
      // Return the first allowed mode found or an empty string if none are found
      return filteredWords.length > 0 ? filteredWords[0] : "";
    }

    function capitalizeFirstLetter(str) {
      return str
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }

    function extractAndFormatModeFromElementContent(selector) {
      // Select the element by the CSS selector provided
      const element = document.querySelector(selector);
      // Get the text content of the element
      const content = element.textContent || element.innerText;

      // Regular expression to find "Mode:" followed by any text
      const modeRegex = /Mode:\s*(\S+)/;
      const match = content.match(modeRegex);

      if (match && match[1]) {
        // Convert to lowercase and remove spaces
        const mode = match[1].toLowerCase().replace(/\s/g, "");
        return mode;
      } else {
        // If "Mode:" is not found in the content, return an empty string or handle it as needed
        return "";
      }
    }

    // Example usage:
    // Assuming you want to select the element with the class "nav-link dropdown-toggle"
    const selector = ".nav-link.dropdown-toggle";
    const mode = extractAndFormatModeFromElementContent(selector);

    if (mode) {
      developmentPackData.mode = mode;
      updateLocalStorage(); // Save the changes to localStorage
    }

    console.log(`Mode: ${mode}`);

    var modePrices = {
      Budget: {
        // Total to reach: 24.99, Original sum: 24.99, Scaling factor: 24.99 / 24.99 = 1
        Instagram: 3.12375,
        FaceBook: 3.12375,
        Twitter: 3.12375,
        "Display Advertising": 3.12375,
        "Email Copy": 3.12375,
        Copywriting: 3.12375,
        PowerPoint: 3.12375,
        Logo: 3.12375,
      },
      Value: {
        // Total to reach: 99.99, Original sum: 102.99, Scaling factor: 99.99 / 102.99

        Instagram: 8.3325,
        FaceBook: 8.3325,
        Twitter: 8.3325,
        Copywriting: 8.3325,
        "Display Advertising": 8.3325,
        "Email Copy": 8.3325,
        Copywriting: 8.3325,
        PowerPoint: 8.3325,
        Logo: 8.3325,
        "Landing Page": 8.3325,
        Banner: 8.3325,
        "Post-production": 8.3325,
      },
      Agile: {
        // Total to reach: 99.99, Original sum: 102.99, Scaling factor: 99.99 / 102.99

        Instagram: 31.249375,
        FaceBook: 31.249375,
        Twitter: 31.249375,
        Copywriting: 31.249375,
        "Display Advertising": 31.249375,
        "Email Copy": 31.249375,
        Copywriting: 31.249375,
        PowerPoint: 31.249375,
        Logo: 31.249375,
        "Landing Page": 31.249375,
        Banner: 31.249375,
        "Post-production": 31.249375,
        Storytelling: 31.249375,
        Brochure: 31.249375,
        "Business Card": 31.249375,
        Poster: 31.249375,
      },
      // ... (other modes) ...

      // ... (any other modes if necessary) ...
      Default: {
        Instagram: 41.66625,
        FaceBook: 41.66625,
        Twitter: 41.66625,
        Copywriting: 41.66625,
        "Display Advertising": 41.66625,
        "Email Copy": 41.66625,
        Copywriting: 41.66625,
        PowerPoint: 41.66625,
        Logo: 41.66625,
        "Landing Page": 41.66625,
        Banner: 41.66625,
        "Post-production": 41.66625,
        Storytelling: 41.66625,
        Brochure: 41.66625,
        "Business Card": 41.66625,
        Poster: 41.66625,
        Snapchat: 41.66625,
        Tiktok: 41.66625,
        Print: 41.66625,
        Digital: 41.66625,
        PDF: 41.66625,
        "Portrait Photography": 41.66625,
        Photography: 41.66625,
        "Video Production": 41.66625,
      },

      Personalized: {
        Instagram: 55.5185185,
        FaceBook: 55.5185185,
        Twitter: 55.5185185,
        Copywriting: 55.5185185,
        "Display Advertising": 55.5185185,
        "Email Copy": 55.5185185,
        Copywriting: 55.5185185,
        PowerPoint: 55.5185185,
        Logo: 55.5185185,
        "Landing Page": 55.5185185,
        Banner: 55.5185185,
        "Post-production": 55.5185185,
        Storytelling: 55.5185185,
        Brochure: 55.5185185,
        "Business Card": 55.5185185,
        Poster: 55.5185185,
        Snapchat: 55.5185185,
        Tiktok: 55.5185185,
        Print: 55.5185185,
        Digital: 55.5185185,
        PDF: 55.5185185,
        "Portrait Photography": 55.5185185,
        Photography: 55.5185185,
        "Video Production": 55.5185185,
        Packaging: 55.5185185,
        Magazine: 55.5185185,
        Letter: 55.5185185 + 0.99,
        "Event Videography": 55.5185185,
        Infographic: 55.5185185,
        "Aerial Photography": 55.5185185,
      },

      Expensive: {
        // New total to scale towards is arbitrarily chosen for illustrative purposes
        // Current total: 980, New total: 1200, Scaling factor: 1200 / 980
      },
    };

    function calculateTotalPrice(selectedServices, mode) {
      const formattedMode = mode
        .toLowerCase()
        .replace(/\s/g, "_")
        .split("_")
        .map(capitalizeFirstLetter)
        .join("_");

      // Debug: Log the formattedMode to see if it matches the keys in modePrices
      console.log("Formatted Mode:", formattedMode);

      if (!modePrices[formattedMode]) {
        console.error(`The mode "${mode}" is not available.`);
        return "0.00"; // Return a default price or handle the error as needed
      }

      let totalPrice = 0;
      selectedServices.forEach((service) => {
        const formattedService = capitalizeFirstLetter(service);

        // Debug: Check if the service exists for this mode
        if (!modePrices[formattedMode][formattedService]) {
          console.warn(
            `The service "${formattedService}" is not available in the "${formattedMode}" mode.`
          );
          return; // Skip this service and continue with the next
        }

        const servicePrice = modePrices[formattedMode][formattedService];
        totalPrice += parseFloat(servicePrice);
      });

      return totalPrice.toFixed(2);
    }

    const formattedSelectedServices = selectedServices.map((service) =>
      capitalizeFirstLetter(service)
    );
    const totalPrice = calculateTotalPrice(
      formattedSelectedServices,
      sanitizeMode(mode)
    );

    designPackData.totalPrice = totalPrice;
    updateLocalStorage();

    localStorage.setItem(
      "totalPriceForDesignPackData",
      JSON.stringify(totalPrice)
    );

    var priceLink = document.querySelector(".nav-link.active");
    priceLink.textContent =
      "Current Price: " +
      JSON.parse(localStorage.getItem("totalPriceForDesignPackData"));
  }

  // Assuming this 'modePrices' object exists and contains the pricing info

  // Create a dictionary of DivNumber: Text from divisions with the specified classes
  var divs = document.querySelectorAll(
    ".col-lg-2, .col-md-3, .col-sm-4, .col-6"
  );
  divs.forEach((div, index) => {
    var titleDiv = div.querySelector(".info-div h6.text-black.mb-0");
    if (titleDiv) {
      divTexts[index] = titleDiv.innerText.trim();
    }
  });
  console.log("Div Texts Dictionary:", divTexts);

  // Assuming mode is passed as a query parameter
  function getInitialMode(selectedOptionsFromMode, designPackData) {
    // Check if mode is present in selectedOptionsFromMode
    let mode =
      selectedOptionsFromMode[Object.keys(selectedOptionsFromMode)[0]]?.mode ||
      "none";

    // Update developmentPackData if necessary
    if (designPackData && designPackData.mode !== mode) {
      designPackData.mode = mode;
      localStorage.setItem(
        "developmentPackData",
        JSON.stringify(designPackData)
      );
    }

    return mode;
  }

  // In developmentPackSpecificFunctions
  var initialMode = getInitialMode(selectedOptionsFromMode, designPackData);
  onModeChange(initialMode);
  transformServicesToMode(initialMode);

  var dropdownLabel = document.querySelector("#navbarDropdownMenuLink");
  dropdownLabel.textContent = "Mode: " + capitalizeFirstLetter(initialMode);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // Set the initial page state
  // resetServices();
  // transformServicesToMode(initialMode);
  // updateSelectedServices();
  // runThisCode();

  function addTooltip(element, message) {
    // Create the tooltip element
    const tooltip = document.createElement("div");
    tooltip.className = "tooltip";
    tooltip.innerText = message;
    document.body.appendChild(tooltip);

    // Position the tooltip above the element
    element.addEventListener("mouseover", function (e) {
      const rect = element.getBoundingClientRect();
      tooltip.style.top =
        rect.top + window.scrollY - tooltip.offsetHeight + "px"; // Removed the -8px offset
      tooltip.style.left =
        rect.left +
        window.scrollX +
        rect.width / 2 -
        tooltip.offsetWidth / 2 +
        "px";
      tooltip.style.visibility = "visible";
      tooltip.style.opacity = 1;
    });

    element.addEventListener("mouseout", function () {
      tooltip.style.visibility = "hidden";
      tooltip.style.opacity = 0;
    });
  }

  // To use the function:

  function transformServicesToMode(mode) {
    // Mode lists
    var budgetMode = [0, 1, 2, 5, 7, 8, 13, 15];
    var valueMode = [0, 1, 2, 5, 6, 7, 8, 12, 13, 15, 17, 19, 29];
    var AgileMode = [0, 1, 2, 5, 6, 7, 8, 11, 12, 13, 15, 17, 18, 19, 20, 29];
    var DefaultMode = [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 16, 17, 18, 19, 20, 24,
      25, 27, 29,
    ];
    var PersonlizedMode = [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23, 24, 25, 26, 27, 28, 29,
    ];
    var ExpensiveMode = [14, 26, 28];

    // Determine the active mode
    var activeMode;
    switch (mode) {
      case "budget":
        activeMode = budgetMode;
        break;
      case "value":
        activeMode = valueMode;
        break;
      case "agile":
        activeMode = AgileMode;
        break;
      case "default":
        activeMode = DefaultMode;
        break;
      case "personalized":
        activeMode = PersonlizedMode;
        break;
      default:
        console.error("Invalid mode provided");
        return;
    }

    // Get all service divisions
    var serviceDivs = document.querySelectorAll(
      ".col-lg-2.col-md-3.col-sm-4.col-6.mb-"
    );
    serviceDivs.forEach((div, index) => {
      const checkbox = div.querySelector(".form-check-input");
      const label = div.querySelector(".form-check-label");

      // For personalized mode, we delegate to a specific function
      if (mode === "personalized") {
        UselectExpensiveMode(ExpensiveMode);
      } else {
        if (activeMode.includes(index)) {
          checkbox.checked = true; // Check the checkbox by default
          addTooltip(
            div,
            "This service is included in your chosen plan. Uncheck the box to remove it and reduce your monthly cost"
          );
        } else {
          div.classList.add("mb-4");

          // Create the lock image
          var lockImg = document.createElement("img");
          lockImg.className = "lock";
          lockImg.src = "graphics/padlock.png";

          // Append the lock image to the div
          div.insertBefore(lockImg, div.firstChild);

          var serviceContent = document.createElement("div");
          serviceContent.className = "service-unavailable";
          while (div.children.length > 1) {
            serviceContent.appendChild(div.children[1]);
          }
          div.appendChild(serviceContent);

          // Now add the tooltip to the .service-unavailable div
          addTooltip(
            serviceContent,
            "This service isn't available in your selected mode. Choose a different mode to access it."
          );
        }
      }
    });

    // This function must be defined elsewhere in your code
    updateSelectedServices();
    designPackData.selectedServices = selectedServices;
    updateLocalStorage();
    runThisCode();
  }

  // Make sure this function is only called once per mode switch
  function UselectExpensiveMode(ExpensiveMode) {
    var serviceDivs = document.querySelectorAll(
      ".col-lg-2.col-md-3.col-sm-4.col-6.mb-"
    );
    serviceDivs.forEach((div, index) => {
      const checkbox = div.querySelector(".form-check-input");
      const label = div.querySelector(".form-check-label");

      if (!ExpensiveMode.includes(index)) {
        // Changed logic here
        checkbox.checked = true; // Check the checkbox
        addTooltip(div, "This service is included in your chosen plan.");
      } else {
        checkbox.checked = false; // Uncheck the checkbox
        addTooltip(
          div,
          "This premium service is not included by default. By adding it your price will be increased."
        );
      }
    });
  }

  function updateSelectedServices() {
    selectedServices = []; // Reset the selectedServices array

    var checkboxes = document.querySelectorAll(".form-check-input");
    checkboxes.forEach((checkbox, index) => {
      var serviceName = divTexts[index];
      if (checkbox.checked) {
        selectedServices.push(serviceName);
      }
    });
    console.log("Updated Selected Services: ", selectedServices);
  }

  // Create a dictionary for the "Learn More" buttons with their respective numbers
  var learnMoreButtons = document.querySelectorAll("button.btn.btn-primary");
  var buttonNumbers = {};
  learnMoreButtons.forEach((button, index) => {
    buttonNumbers[index] = button;
  });
  console.log("Button Numbers Dictionary:", buttonNumbers);

  function trackSelectedServices() {
    var checkboxes = document.querySelectorAll(".form-check-input");

    checkboxes.forEach(function (checkbox, index) {
      checkbox.addEventListener("change", function () {
        var serviceName = divTexts[index];

        if (checkbox.checked) {
          // Add the service to the list if checked
          selectedServices.push(serviceName);
          runThisCode();
        } else {
          // Remove the service from the list if unchecked
          var serviceIndex = selectedServices.indexOf(serviceName);
          if (serviceIndex > -1) {
            selectedServices.splice(serviceIndex, 1);
            runThisCode();
          }
        }

        console.log("Selected Services: ", selectedServices);
        console.log(designPackData);
      });
      // Update the localStorage when services are selected or deselected
      designPackData.selectedServices = selectedServices;
      updateLocalStorage();
    });
  }

  trackSelectedServices();
  updateModeAndPrice(capitalizeFirstLetter(designPackData.mode));
  console.log(designPackData);

  // Add event listeners to the "Learn More" buttons
  learnMoreButtons.forEach((button, index) => {
    button.addEventListener("click", function () {
      // Match the button's number with the div number to extract the corresponding title
      var titleText = divTexts[index];
      console.log("Clicked Button Index:", index, "Title Text:", titleText);

      // var baseSearchURL = "http://www.google.com/custom?q=";
      // var googleSearchURL = baseSearchURL + encodeURIComponent("What is a " + titleText + "?") + "&btnG=Search";

      // var baseCSEURL = "https://www.google.com/cse?cx=b018f681b1c654a68&q=";
      // var googleCSEURL = baseCSEURL + encodeURIComponent("What is a " + titleText + "?");
      // console.log("Constructed Google CSE URL:", googleCSEURL);

      // Construct the Wikipedia URL using the extracted title
      var wikipediaURL =
        "https://en.wikipedia.org/wiki/" + encodeURIComponent(titleText);
      console.log("Constructed Wikipedia URL:", wikipediaURL);

      // Find the associated modal (assuming there's a single modal for all buttons)
      var modal = document.getElementById("modal");
      if (modal) {
        // Find the iframe within the modal
        var iframe = modal.querySelector(".iframe-style");
        if (iframe) {
          // Update the iframe's src attribute
          iframe.src = wikipediaURL;
          console.log("Iframe src updated:", wikipediaURL);
        }

        // Show the modal
        modal.style.display = "block";
        console.log("Modal displayed");

        // Apply the blur effect to the main content
        document.getElementById("main-content").classList.add("blur-effect");
        document.body.style.overflow = "hidden";
        hideCursorClasses();
        console.log("Blur effect applied and cursor classes hidden");
      }
    });
  });

  document.querySelector(".close-btn").addEventListener("click", function () {
    // Hide the modal
    document.getElementById("modal").style.display = "none";
    // Remove the blur effect from the main content
    document.getElementById("main-content").classList.remove("blur-effect");
    document.body.style.overflow = "auto";
    showCursorClasses();
  });

  function resetServices() {
    // Remove all tooltips
    var tooltips = document.querySelectorAll(".tooltip");
    tooltips.forEach(function (tooltip) {
      tooltip.remove();
    });

    // Reset all service divisions
    var serviceDivs = document.querySelectorAll(
      ".col-lg-2.col-md-3.col-sm-4.col-6.mb-"
    );
    serviceDivs.forEach((div) => {
      // Remove the lock images
      var lockImg = div.querySelector(".lock");
      if (lockImg) {
        lockImg.remove();
      }

      // Remove the service-unavailable class and its contents
      var serviceContent = div.querySelector(".service-unavailable");
      if (serviceContent) {
        while (serviceContent.firstChild) {
          div.insertBefore(serviceContent.firstChild, serviceContent);
        }
        serviceContent.remove();
      }

      div.classList.remove("mb-4");

      // Uncheck all checkboxes
      const checkbox = div.querySelector(".form-check-input");
      checkbox.checked = false;
    });
  }

  var dropdownItems = document.querySelectorAll(".dropdown-item");
  for (var i = 0; i < dropdownItems.length; i++) {
    dropdownItems[i].addEventListener("click", function (event) {
      updateModeAndPrice(event.target.textContent.trim());
    });
  }

  function updateModeAndPrice(selectedMode) {
    // Update Dropdown Label
    var dropdownLabel = document.querySelector("#navbarDropdownMenuLink");
    dropdownLabel.textContent = "Mode: " + selectedMode;

    // Update Price
    var price;
    switch (selectedMode.toLowerCase()) {
      case "budget":
        price = "24.99";
        break;
      case "value":
        price = "99.99";
        break;
      case "agile":
        price = "499.99";
        break;
      case "default":
        price = "999.99";
        break;
      case "personalized":
        price = "1499.99";
        break;
      default:
        price = "0.00";
    }
    var priceLink = document.querySelector(".nav-link.active");
    runThisCode();

    // Update Dropdown Items
    var modes = ["Budget", "Value", "Agile", "Default", "Personalized"];

    modes.splice(modes.indexOf(selectedMode), 1); // Remove the selected mode

    var dropdownMenu = document.querySelector(".dropdown-menu");
    dropdownMenu.innerHTML = ""; // Clear the dropdown
    for (var i = 0; i < modes.length; i++) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.textContent = modes[i];
      a.classList.add("dropdown-item");
      a.href = "#";
      a.addEventListener("click", function (event) {
        updateModeAndPrice(event.target.textContent.trim());
      });
      li.appendChild(a);
      dropdownMenu.appendChild(li);
    }

    // Call resetServices before transforming to the new mode
    resetServices();
    transformServicesToMode(selectedMode.toLowerCase());
  }
}
