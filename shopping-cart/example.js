var divTexts = {};
var selectedServices = [];

document.addEventListener("DOMContentLoaded", function () {
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
  function getInitialMode() {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("mode") || "budget"; // default to 'budget' if no mode is specified
  }

  var initialMode = getInitialMode();

  var dropdownLabel = document.querySelector("#navbarDropdownMenuLink");
  dropdownLabel.textContent = "Mode: " + capitalizeFirstLetter(initialMode);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // Set the initial page state
  resetServices();
  transformServicesToMode(initialMode);
  updateSelectedServices();

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

  function transformServicesToMode(mode) {
    // Mode lists
    var bugetMode = [1, 5, 18, 19, 20, 21];
    var AgileMode = [0, 1, 2, 3, 5, 10, 18, 19, 20, 21, 22, 23];
    var DefaultMode = [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 13, 14, 16, 18, 19, 20, 21, 22, 23, 25,
      28,
    ];
    var PersonlizedMode = [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23, 24, 25, 26, 27, 28, 29,
    ];

    // Determine the active mode
    var activeMode;
    switch (mode) {
      case "budget":
        activeMode = bugetMode;
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
      if (activeMode.includes(index)) {
        checkbox.checked = true; // Check the checkbox by default
        // Add the service-unavailable class and the lock image
        // Add tooltip for available services
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
    });
    updateSelectedServices();
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
        } else {
          // Remove the service from the list if unchecked
          var serviceIndex = selectedServices.indexOf(serviceName);
          if (serviceIndex > -1) {
            selectedServices.splice(serviceIndex, 1);
          }
        }

        console.log("Selected Services: ", selectedServices);
      });
    });
  }

  trackSelectedServices();

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

  function getInitialMode() {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("mode") || "budget"; // default to 'budget' if no mode is specified
  }

  var initialMode = getInitialMode();

  function updateModeAndPrice(selectedMode) {
    // Update Dropdown Label
    var dropdownLabel = document.querySelector("#navbarDropdownMenuLink");
    dropdownLabel.textContent = "Mode: " + selectedMode;

    // Update Price
    var price;
    switch (selectedMode.toLowerCase()) {
      case "budget":
        price = "149.99";
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
    priceLink.textContent = "Current Price: " + price;

    // Update Dropdown Items
    var modes = ["Budget", "Agile", "Default", "Personalized"];
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

  // Logic for modal (#2)
  if (iframe) {
    if (width > 1900) {
      iframe.style.width = "85vw";
      iframe.style.height = "75vh";
      iframe.style.display = "block";
      modalContent.style.width = "90%";
    } else if (width <= 920) {
      iframe.style.width = "80vw"; // 100% of the viewport width
      iframe.style.height = "75vh"; // 90% of the viewport height (you can adjust this value as needed)
      iframe.style.display = "block";
      modalContent.style.width = "90%";
    } else if (width >= 920) {
      var heightValueModal = width * 0.675; // 37.5% of the width
      console.log("67.5% of width:", heightValueModal);

      var newHeightModal = width - heightValueModal;
      console.log("New height:", newHeightModal);

      iframe.style.height = newHeightModal + "px"; // Assigning with units
    } else {
      console.log("iframe not found");
    }
  }

  // Call the function immediately
  adjustHrWidth();

  // Adjust the width of the hr elements when the screen size changes
  window.addEventListener("resize", adjustHrWidth);
});
