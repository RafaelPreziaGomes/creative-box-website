// Add the following code to your existing main.js

const globalFunctions = {
  hideCursorClasses: function () {
    const classesToHide = [
      "cursor",
      "cursor-content-wrap",
      "cursor-content",
      "cursor-highlight",
    ];

    classesToHide.forEach((className) => {
      const elements = document.querySelectorAll(`.${className}`);
      elements.forEach((el) => (el.style.display = "none"));
    });
  },

  showCursorClasses: function () {
    const classesToShow = [
      "cursor",
      "cursor-content-wrap",
      "cursor-content",
      "cursor-highlight",
    ];

    classesToShow.forEach((className) => {
      const elements = document.querySelectorAll(`.${className}`);
      elements.forEach((el) => (el.style.display = ""));
    });
  },

  // sub-packs global functions

  sanitizeMode: function (mode) {
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
  },

  capitalizeFirstLetter: function (str) {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  },

  changeOverviewPrice: function (...prices) {
    // Ensure all prices are numbers and calculate the total price
    let totalPrice = prices
      .map((price) => parseFloat(price))
      .reduce((sum, price) => sum + price, 0);

    // Update localStorage with the new total price and item count
    localStorage.setItem("totalPrice", totalPrice.toFixed(2));
    localStorage.setItem("itemCount", prices.length);

    // Update the DOM elements
    document.querySelector("#items").innerHTML = "items " + prices.length;
    document.querySelector("#totalprice").innerHTML =
      "(Per pack) U$" + totalPrice.toFixed(2);

    document.querySelector("#price").innerHTML =
      "(Per pack) U$" + totalPrice.toFixed(2);
  },

  removePriceFromOverview: function (priceToRemove) {
    let totalPrice = parseFloat(localStorage.getItem("totalPrice")) || 0;
    let itemCount = parseInt(localStorage.getItem("itemCount")) || 0;

    // Subtract the price to remove from the total price
    totalPrice -= priceToRemove;
    // Ensure totalPrice doesn't go negative
    totalPrice = Math.max(totalPrice, 0);

    // Decrease item count, but not less than zero
    if (itemCount > 0) itemCount--;

    // Update localStorage with the new values
    localStorage.setItem("totalPrice", totalPrice.toFixed(2));
    localStorage.setItem("itemCount", itemCount);

    // Update the DOM elements
    document.querySelector("#items").innerHTML = "items " + itemCount;
    document.querySelector("#price").innerHTML = "U$ " + totalPrice.toFixed(2);
    document.querySelector("#total-price").innerHTML =
      "U$ " + totalPrice.toFixed(2); // Assuming this is the correct ID
  },

  updateMode: function (selectedOptions) {
    // Check if there are any selected options
    if (Object.keys(selectedOptions).length === 0) {
      // If no options are selected, set the mode to 'None'
      document.querySelector("#mode").innerHTML = "None";
    } else {
      // If there are selected options, determine the mode based on them
      const selectedModes = Object.values(selectedOptions).map(
        (option) => option.mode
      );

      // Example logic to determine the mode to display
      let modeToDisplay =
        selectedModes.length > 0 ? selectedModes[0] : "Default";

      // Update the mode in the DOM
      document.querySelector("#mode").innerHTML = modeToDisplay;
    }
  },
};

// mode.js Code
function modeSpecificFunctions(globalFunctions) {
  function showTooltip(element, message) {
    // Create the tooltip element
    const tooltip = document.createElement("div");
    tooltip.className = "tooltip";
    tooltip.style.position = "absolute"; // Changed to 'absolute' for correct positioning
    document.querySelector(".container").appendChild(tooltip); // Assuming there is a container element to append to

    // Create the close button
    const closeButton = document.createElement("span");
    closeButton.innerText = "";
    closeButton.className = "tooltip-close-button";
    closeButton.style.position = "absolute"; // Changed to 'absolute'
    closeButton.style.top = "5px"; // Adjust as needed
    closeButton.style.right = "5px"; // Adjust as needed
    closeButton.style.cursor = "pointer";
    closeButton.style.fontWeight = "bold";
    closeButton.style.fontSize = "16px";
    closeButton.style.color = "white"; // Assuming the tooltip has a white background

    // Append the close button to the tooltip
    tooltip.appendChild(closeButton);

    // Add the message text to the tooltip
    const messageDiv = document.createElement("div");
    messageDiv.innerText = message;
    tooltip.appendChild(messageDiv);

    // Position the tooltip relative to the element
    const rect = element.getBoundingClientRect();
    tooltip.style.top =
      rect.top + window.scrollY - tooltip.offsetHeight - 10 + "px";
    tooltip.style.left =
      rect.left +
      window.scrollX -
      tooltip.offsetWidth / 2 +
      rect.width / 2 +
      "px";

    // Make the tooltip visible
    tooltip.style.visibility = "visible";
    tooltip.style.opacity = 1;

    // Add the event listener for the close button to hide the tooltip on click
    closeButton.addEventListener("click", function () {
      tooltip.remove(); // Removes the tooltip from the DOM instead of just hiding it
    });
  }

  function hideTooltip() {
    const tooltip = document.querySelector(".tooltip");
    if (tooltip) {
      tooltip.style.visibility = "hidden";
      tooltip.style.opacity = 0;
    }
  }

  var modeButtons = document.querySelectorAll(".btn-light");
  var forwardButton = document.querySelector("button.foward.btn.btn-primary");

  forwardButton.addEventListener("click", function (event) {
    var isModeSelected = Array.from(modeButtons).some((button) => {
      var style = window.getComputedStyle(button);
      console.log(button, style.backgroundColor); // Log the button and its background color
      hideTooltip();
      return style.backgroundColor === "rgb(211, 212, 213)"; // Adjust based on logged color
    });

    if (!isModeSelected) {
      event.preventDefault();
      showTooltip(forwardButton, "Please select a mode before proceeding.");
    }
  });

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

  function soldOut() {
    // Select all elements with classes col.order-2, col.order-3, and col.order-4
    var columns = document.querySelectorAll(
      ".col.order-2, .col.order-3, .col.order-4"
    );
    columns.forEach(function (div) {
      div.classList.add("mb-4");

      // Create the lock image
      var lockImg = document.createElement("img");
      lockImg.className = "lock";
      lockImg.src = "graphics/sold-out.png";

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
        "This service isn't available at this moment. Please check back later."
      );

      // Disable all buttons in the div
      var buttons = div.getElementsByTagName("button");
      for (var i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true;
      }
    });
  }

  function selectModes() {
    const buttonData = {
      select1_1: {
        mode: "Value",
        price: 99.99,
      },
      select2_1: {
        mode: "Agile",
        price: 499.99,
      },
      select3_1: {
        mode: "Default",
        price: 999.99,
      },
      select4_1: {
        mode: "Personalized",
        price: 1499.99,
      },
      select5_1: {
        mode: "Budget",
        price: 24.99,
      },
    };

    let selectedButton = null;
    let selectedOptions = {};
    // New dictionary to store the selected option
    function handleButtonClick(event) {
      const buttonId = event.target.id;

      // If the clicked button is already selected
      if (event.target === selectedButton) {
        selectedButton.style.backgroundColor = ""; // Deselect it
        console.log(`Data of ${selectedButton.id} erased.`);
        delete selectedOptions[buttonId]; // Remove from the selectedOptions dictionary
        selectedButton = null; // Reset selectedButton
        localStorage.removeItem("selectedButton");

        // Gather prices from remaining selected options
        const prices = Object.values(selectedOptions).map(
          (option) => option.price
        );
        globalFunctions.changeOverviewPrice(...prices);
        globalFunctions.updateMode(selectedOptions);
      } else {
        // Check if clicked button is in our buttonData dictionary
        if (buttonData.hasOwnProperty(buttonId)) {
          // Deselect the previous button if there was one
          if (selectedButton) {
            selectedButton.style.backgroundColor = "";
            delete selectedOptions[selectedButton.id]; // Remove the previous option
            console.log(`Data of ${selectedButton.id} erased.`);
          }

          event.target.style.backgroundColor = "#d3d4d5";
          selectedButton = event.target;

          // Update the selectedOptions dictionary
          selectedOptions[buttonId] = buttonData[buttonId];

          // Gather prices from selected options
          const prices = Object.values(selectedOptions).map(
            (option) => option.price
          );
          globalFunctions.changeOverviewPrice(...prices);
          globalFunctions.updateMode(selectedOptions);

          // Save the selected button's ID to localStorage
          localStorage.setItem("selectedButton", buttonId);

          console.log(
            `Mode: ${buttonData[buttonId].mode}, Price: ${buttonData[buttonId].price}`
          );
        }
      }

      // Save the updated selectedOptions to localStorage
      localStorage.setItem("selectedOptions", JSON.stringify(selectedOptions));
    }

    function restoreSelectedOptions() {
      const savedOptions = JSON.parse(localStorage.getItem("selectedOptions"));
      if (savedOptions) {
        Object.keys(savedOptions).forEach((buttonId) => {
          const button = document.getElementById(buttonId);
          if (button) {
            button.style.backgroundColor = "#d3d4d5";
            selectedButton = button; // Set the selectedButton to the restored button
            selectedOptions[buttonId] = savedOptions[buttonId];
          }
        });
        // Update any other UI elements as needed

        // Gather prices from selected options
        const prices = Object.values(selectedOptions).map(
          (option) => option.price
        );
        globalFunctions.changeOverviewPrice(...prices);
        globalFunctions.updateMode(selectedOptions);
      }
    }

    Object.keys(buttonData).forEach((buttonId) => {
      const button = document.getElementById(buttonId);
      if (button) {
        button.addEventListener("click", handleButtonClick);
      }
    });

    restoreSelectedOptions();

    function render() {
      const storedButtonId = localStorage.getItem("selectedButton");
      if (storedButtonId && buttonData.hasOwnProperty(storedButtonId)) {
        const button = document.getElementById(storedButtonId);
        if (button) {
          button.style.backgroundColor = "#d3d4d5";
          selectedButton = button;

          // Update the selectedOptions dictionary from localStorage
          selectedOptions[storedButtonId] = buttonData[storedButtonId];
        }
      }
    }
  }

  // Adding event listener for the first "Learn More" button and "Close" button
  document
    .getElementById("learnMoreBtn")
    .addEventListener("click", function () {
      showModal("modal-doc");
    });

  document
    .querySelector(".close-btn-doc")
    .addEventListener("click", function () {
      hideModal("modal-doc");
    });

  // Function to show the modal
  function showModal(modalId) {
    document.getElementById(modalId).style.display = "block";
    document.getElementById("main-content").classList.add("blur-effect");
    document.body.style.overflow = "hidden";
    globalFunctions.hideCursorClasses();
  }

  // Function to hide the modal
  function hideModal(modalId) {
    document.getElementById(modalId).style.display = "none";
    document.getElementById("main-content").classList.remove("blur-effect");
    document.body.style.overflow = "auto";
    globalFunctions.showCursorClasses();
  }

  // Loop starting from 2 as per the naming pattern

  function runModalMode() {
    for (let i = 2; i <= 5; i++) {
      document
        .getElementById(`learnMoreBtn${i}`)
        .addEventListener("click", function () {
          showModal(`modal-doc${i}`);
        });

      document
        .querySelector(`.close-btn-doc${i}`)
        .addEventListener("click", function () {
          hideModal(`modal-doc${i}`);
        });
    }
  }

  function runWidthAjustor() {
    var width = screen.width;
    console.log("Screen width:", width);

    var iframes = document.querySelectorAll(".iframe-style");

    iframes.forEach(function (iframe) {
      // Assuming you've defined width somewhere above this code
      if (width >= 920) {
        var heightValue = width * 0.675; // 37.5% of the width
        console.log("67.5% of width:", heightValue);

        var newHeight = width - heightValue;
        console.log("New height:", newHeight);

        iframe.style.height = newHeight + "px"; // Assigning with units
      } else if (width <= 920) {
        var btns = document.querySelectorAll(".BUTTON_RDV111");

        btns.forEach(function (btn) {
          btn.style.display = "inline-block";
          iframe.style.display = "none";
        });
      } else {
        console.log("iframe not found");
      }
    });
  }

  runWidthAjustor();
  runModalMode();
  selectModes();
  soldOut();
  render();

  return selectedOptions;
}
const selectedOptionsFromMode = JSON.parse(
  localStorage.getItem("selectedOptions")
);

var developmentPackData = JSON.parse(
  localStorage.getItem("developmentPackData")
) || { totalPrice: "0.00", selectedServices: [], mode: "none" };

var designPackData = JSON.parse(localStorage.getItem("designPackData")) || {
  totalPrice: "0.00",
  selectedServices: [],
  mode: "none",
};

var marketingPackData = JSON.parse(
  localStorage.getItem("marketingPackData")
) || {
  totalPrice: "0.00",
  selectedServices: [],
  mode: "none",
};
// Pack.js Code

var generalPackData = JSON.parse(localStorage.getItem("generalPackData")) || {
  totalPrice: "0.00",
  itemCount: 0,
  mode: "none",
};

function packSpecificFunctions(
  globalFunctions,
  selectedOptionsFromMode,
  developmentPackData,
  designPackData
) {
  document
    .querySelectorAll("button.btn.btn-primary")[1]
    .addEventListener("click", function () {
      localStorage.setItem("visitedPack", true);
    });

  const modeSavedOptions = JSON.parse(
    localStorage.getItem("selectedOptionsFromMode")
  );

  // Function to reset generalPackData on page reload
  function resetPackDataOnReload() {
    window.addEventListener("load", () => {
      generalPackData.totalPrice = "0.00";
      generalPackData.itemCount = 0;
      generalPackData.mode = "none";
      // Additionally, update any UI elements that display this data
      // For example:
      // document.getElementById('totalPriceElement').textContent = "0.00";
      // document.getElementById('itemCountElement').textContent = "0";
    });
  }

  // Call the function to activate the reset behavior
  resetPackDataOnReload();

  function showTooltip(element, message) {
    // Create the tooltip element
    const tooltip = document.createElement("div");
    tooltip.className = "tooltip";
    tooltip.style.position = "absolute"; // Changed to 'absolute' for correct positioning
    document.querySelector(".container").appendChild(tooltip); // Assuming there is a container element to append to

    // Create the close button
    const closeButton = document.createElement("span");
    closeButton.innerText = "";
    closeButton.className = "tooltip-close-button";
    closeButton.style.position = "absolute"; // Changed to 'absolute'
    closeButton.style.top = "5px"; // Adjust as needed
    closeButton.style.right = "5px"; // Adjust as needed
    closeButton.style.cursor = "pointer";
    closeButton.style.fontWeight = "bold";
    closeButton.style.fontSize = "16px";
    closeButton.style.color = "white"; // Assuming the tooltip has a white background

    // Append the close button to the tooltip
    tooltip.appendChild(closeButton);

    // Add the message text to the tooltip
    const messageDiv = document.createElement("div");
    messageDiv.innerText = message;
    tooltip.appendChild(messageDiv);

    // Position the tooltip relative to the element
    const rect = element.getBoundingClientRect();
    tooltip.style.top =
      rect.top + window.scrollY - tooltip.offsetHeight - 10 + "px";
    tooltip.style.left =
      rect.left +
      window.scrollX -
      tooltip.offsetWidth / 2 +
      rect.width / 2 +
      "px";

    // Make the tooltip visible
    tooltip.style.visibility = "visible";
    tooltip.style.opacity = 1;

    // Add the event listener for the close button to hide the tooltip on click
    closeButton.addEventListener("click", function () {
      tooltip.remove(); // Removes the tooltip from the DOM instead of just hiding it
    });
  }

  function hideTooltip() {
    const tooltip = document.querySelector(".tooltip");
    if (tooltip) {
      tooltip.style.visibility = "hidden";
      tooltip.style.opacity = 0;
    }
  }

  // Function to open the modal
  function openModal() {
    document.getElementById("popup").style.display = "block";
    // Optionally, add a blur effect to the main content
    document.getElementById("main-content").classList.add("blur-effect");
  }

  // Function to close the modal
  function closeModal() {
    document.getElementById("popup").style.display = "none";
    document.getElementById("main-content").classList.remove("blur-effect");
  }

  // Function for the 'Make Changes' button
  function makeChanges() {
    closeModal();
    // Add any additional logic for making changes
  }

  // Function for the 'Confirm' button
  function confirmSelection() {
    // Implement your logic for confirming the selection
    // For example, save the selection, and redirect to the next page
    closeModal();

    if (document.querySelector("#mode").innerHTML === "Mixed") {
      generalPackData.mode = document.getElementById("mode").innerHTML;
      localStorage.setItem("generalPackData", JSON.stringify(generalPackData));
      window.location.href =
        "file:///C:/Users/raffp/OneDrive/Documents/Company/CreativeBox/Website/shopping-cart/signup-shopping-cart.html"; // Uncomment and replace with your URL
    } else {
      generalPackData.mode = document.getElementById("mode").innerHTML;
      localStorage.setItem("generalPackData", JSON.stringify(generalPackData));
      window.location.href =
        "file:///C:/Users/raffp/OneDrive/Documents/Company/CreativeBox/Website/shopping-cart/tokens.html"; // Uncomment and replace with your URL
    }
  }

  function setupModalListeners() {
    const modal = document.getElementById("popup");
    const makeChangesButton = document.getElementById("makeChangesButton");
    const confirmButton = document.getElementById("confirmButton");

    makeChangesButton.addEventListener("click", makeChanges);
    confirmButton.addEventListener("click", confirmSelection);

    // Your existing logic for nextPageButton
    const nextPageButton = document.querySelectorAll(
      "button.btn.btn-primary"
    )[1]; // Adjust the selector as needed
    nextPageButton.addEventListener("click", function (event) {
      if (
        generalPackData.totalPrice !== "0.00" &&
        generalPackData.itemCount !== 0 &&
        document.querySelector("#mode").innerHTML !== "Mixed"
      ) {
        event.preventDefault();
        openModal();
      } else if (document.querySelector("#mode").innerHTML === "Mixed") {
        event.preventDefault();
        // Handle no selection case
      }
    });
  }

  // Call setupModalListeners in your initialization code
  setupModalListeners();

  const selectAllButton = document.querySelectorAll(
    "button.btn.btn-primary"
  )[1];
  selectAllButton.addEventListener("click", function (event) {
    // Check if generalPackData.totalPrice is "0.00" or generalPackData.itemCount is 0
    if (generalPackData.totalPrice === 0 || generalPackData.itemCount === 0) {
      event.preventDefault(); // Prevent the default button click behavior

      // Show the tooltip with the message
      showTooltip(this, "Please select a pack or service before proceeding");
    }
  });

  selectAllButton.addEventListener("click", function (event) {
    // Check if generalPackData.totalPrice is "0.00" or generalPackData.itemCount is 0
    if (document.querySelector("#mode").innerHTML === "Mixed") {
      event.preventDefault(); // Prevent the default button click behavior

      // Show the tooltip with the message
      showTooltip(
        this,
        "Currently Mixed Mode is not available, please change your selection to proceed"
      );
    }
  });

  let totalPrice = 0.0;

  // Update the 'items' count
  let itemsCount = Object.keys(selectedOptionsFromMode).length;

  // Calculate and update the total price
  let packPrice = Object.values(selectedOptionsFromMode).reduce(
    (sum, option) => sum + option.price,
    0
  );

  document
    .querySelector("button.btn.btn-primary")
    .addEventListener("click", function () {
      delete selectedOptionsFromMode; // assuming selectedOptionsFromMode is defined elsewhere
    });

  document.querySelectorAll(".pack-price").forEach((packPriceElement) => {
    packPriceElement.textContent = `U$ ${packPrice.toFixed(2)}`;
  });
  // Update the 'mode' field - assuming there's one mode in selectedOptions
  // If there are multiple modes, you'll need to decide how to display them
  const mode =
    selectedOptionsFromMode[Object.keys(selectedOptionsFromMode)[0]]?.mode ||
    "None";
  document.getElementById("mode").textContent = mode;

  function hideCursorClasses() {
    const classesToHide = [
      "cursor",
      "cursor-content-wrap",
      "cursor-content",
      "cursor-highlight",
    ];

    classesToHide.forEach((className) => {
      const elements = document.querySelectorAll(`.${className}`);
      elements.forEach((el) => (el.style.display = "none"));
    });
  }

  // Function to show all elements with the specified classes
  function showCursorClasses() {
    const classesToShow = [
      "cursor",
      "cursor-content-wrap",
      "cursor-content",
      "cursor-highlight",
    ];

    classesToShow.forEach((className) => {
      const elements = document.querySelectorAll(`.${className}`);
      elements.forEach((el) => (el.style.display = ""));
    });
  }

  // Retrieve saved data when the pack page is loaded
  const savedOptions = JSON.parse(
    localStorage.getItem("selectedOptionsFromMode")
  );
  if (savedOptions) {
    updatePackPage(savedOptions);
  }

  function updatePackPage(savedOptions) {
    // Update the 'items' field
    if (savedOptions.items) {
      document.getElementById(
        "items"
      ).textContent = `Items ${savedOptions.items}`;
    }

    // Update the 'price' field
    if (savedOptions.price) {
      document.getElementById(
        "price"
      ).textContent = `U$ ${savedOptions.price.toFixed(2)}`;
    }

    // Update the 'mode' field
    if (savedOptions.mode) {
      document.getElementById("mode").textContent = savedOptions.mode;
    }

    // Update the 'total price' field
    if (savedOptions.totalPrice) {
      document.getElementById(
        "totalprice"
      ).textContent = `U$ ${savedOptions.totalPrice.toFixed(2)}`;
    }

    // Additional logic can be added here if there are more fields to update
  }

  itemsCount--;

  function updateModeText() {
    // Retrieve modes from localStorage or set default values
    const developmentMode =
      (JSON.parse(localStorage.getItem("developmentPackData")) || {}).mode ||
      "None";
    const designMode =
      (JSON.parse(localStorage.getItem("designPackData")) || {}).mode || "None";
    const marketingMode =
      (JSON.parse(localStorage.getItem("marketingPackData")) || {}).mode ||
      "None";

    let modeText;

    // Compare the modes and set modeText accordingly
    if (developmentMode === designMode && designMode === marketingMode) {
      modeText = globalFunctions.capitalizeFirstLetter(developmentMode); // All modes are the same
    } else {
      modeText = "Mixed"; // Modes are different
    }

    // Update generalPackData.mode and save to localStorage
    var generalPackData =
      JSON.parse(localStorage.getItem("generalPackData")) || {};
    generalPackData.mode = modeText;
    localStorage.setItem("generalPackData", JSON.stringify(generalPackData));

    // Update the #mode element's text
    const modeElement = document.getElementById("mode");
    if (modeElement) {
      modeElement.textContent = modeText;
    }
  }

  function updatePackPriceDisplay(packType, price) {
    const packPriceElement = document.querySelector(`.${packType}-pack-price`);
    if (packPriceElement) {
      packPriceElement.textContent = `U$ ${Number(price).toFixed(2)}`;
    }
  }

  function updateTotalPriceDisplay() {
    document.getElementById(
      "totalprice"
    ).textContent = `U$ ${totalPrice.toFixed(2)}`;

    document.getElementById("price").textContent = `U$ ${totalPrice.toFixed(
      2
    )}`;

    generalPackData.totalPrice = totalPrice.toFixed(2);
    // Save the updated generalPackData in localStorage
    localStorage.setItem("generalPackData", JSON.stringify(generalPackData));
    hideTooltip();
  }

  document.getElementById("select1_2").addEventListener("click", function () {
    document.querySelector("#form1").value = 1;
    itemsCount++;
    document.getElementById("items").textContent = `items ${itemsCount}`;
    generalPackData.itemCount = itemsCount;
    localStorage.setItem("generalPackData", JSON.stringify(generalPackData));
    // Show the modal
    document.getElementById("modal").style.display = "block";
    // Apply the blur effect to the main content
    document.getElementById("main-content").classList.add("blur-effect");
    document.body.style.overflow = "hidden";
    hideCursorClasses();
  });

  document.getElementById("select2_2").addEventListener("click", function () {
    // Show the modal

    document.querySelector("#form2").value = 1;
    itemsCount++;
    generalPackData.itemCount = itemsCount;
    localStorage.setItem("generalPackData", JSON.stringify(generalPackData));
    document.getElementById("items").textContent = `items ${itemsCount}`;

    document.getElementById("modal-design").style.display = "block";
    // Apply the blur effect to the main content
    document.getElementById("main-content").classList.add("blur-effect");
    document.body.style.overflow = "hidden";
    hideCursorClasses();
  });

  document.getElementById("select3_2").addEventListener("click", function () {
    document.querySelector("#form3").value = 1;
    itemsCount++;
    generalPackData.itemCount = itemsCount;
    localStorage.setItem("generalPackData", JSON.stringify(generalPackData));
    document.getElementById("items").textContent = `items ${itemsCount}`;
    // Show the modal
    document.getElementById("modal-marketing").style.display = "block";
    // Apply the blur effect to the main content
    document.getElementById("main-content").classList.add("blur-effect");
    document.body.style.overflow = "hidden";
    hideCursorClasses();
  });

  document.querySelector(".close-btn").addEventListener("click", function () {
    // Hide the modal
    document.getElementById("modal").style.display = "none";

    // Remove the blur effect from the main content
    document.getElementById("main-content").classList.remove("blur-effect");
    document.body.style.overflow = "auto";

    document.querySelector("#remove1").style.display = "block";
    document.getElementById("select1_2").style.display = "none";

    showCursorClasses();
    // Retrieve the latest developmentPackData from localStorage
    var currentDevelopmentPackData = JSON.parse(
      localStorage.getItem("developmentPackData")
    ) || { totalPrice: "0.00" };
    totalPrice += Number(currentDevelopmentPackData.totalPrice) || 0.0;

    document.getElementById("modal").style.display = "none";
    document.getElementById("main-content").classList.remove("blur-effect");
    document.body.style.overflow = "auto";
    document.querySelector("#remove1").style.display = "block";
    showCursorClasses();
    updateModeText();

    updatePackPriceDisplay(
      "development",
      currentDevelopmentPackData.totalPrice
    );

    document.querySelectorAll(".mb-0.pack-price")[0].textContent =
      "U$ " + currentDevelopmentPackData.totalPrice;
    updateTotalPriceDisplay();
  });

  currentDevelopmentPackData = JSON.parse(
    localStorage.getItem("developmentPackData")
  ) || { totalPrice: "0.00" };

  document
    .querySelector(".close-btn-design")
    .addEventListener("click", function () {
      // Hide the modal
      document.getElementById("modal-design").style.display = "none";
      // Remove the blur effect from the main content
      document.getElementById("main-content").classList.remove("blur-effect");
      document.body.style.overflow = "auto";

      document.querySelector("#remove2").style.display = "block";
      document.getElementById("select2_2").style.display = "none";
      showCursorClasses();

      var currentDesignPackData = JSON.parse(
        localStorage.getItem("designPackData")
      ) || { totalPrice: "0.00" };
      totalPrice += Number(currentDesignPackData.totalPrice) || 0.0;

      document.getElementById("modal-design").style.display = "none";
      document.getElementById("main-content").classList.remove("blur-effect");
      document.body.style.overflow = "auto";
      document.querySelector("#remove2").style.display = "block";
      showCursorClasses();
      updateModeText();

      document.querySelectorAll(".mb-0.pack-price")[1].textContent =
        "U$ " + currentDesignPackData.totalPrice;

      updatePackPriceDisplay("design", currentDesignPackData.totalPrice);
      updateTotalPriceDisplay();
    });

  currentDesignPackData = JSON.parse(
    localStorage.getItem("designPackData")
  ) || { totalPrice: "0.00" };

  document
    .querySelector(".close-btn-marketing")
    .addEventListener("click", function () {
      // Hide the modal
      document.getElementById("modal-marketing").style.display = "none";
      // Remove the blur effect from the main content
      document.getElementById("main-content").classList.remove("blur-effect");
      document.body.style.overflow = "auto";

      document.querySelector("#remove3").style.display = "block";
      showCursorClasses();
      document.getElementById("select3_2").style.display = "none";

      var currentmarketingPackData = JSON.parse(
        localStorage.getItem("marketingPackData")
      ) || { totalPrice: "0.00" };
      totalPrice += Number(currentmarketingPackData.totalPrice) || 0.0;

      document.getElementById("modal-design").style.display = "none";
      document.getElementById("main-content").classList.remove("blur-effect");
      document.body.style.overflow = "auto";
      document.querySelector("#remove3").style.display = "block";
      showCursorClasses();
      updateModeText();

      document.querySelectorAll(".mb-0.pack-price")[2].textContent =
        "U$ " + currentmarketingPackData.totalPrice;

      updatePackPriceDisplay("design", currentmarketingPackData.totalPrice);
      updateTotalPriceDisplay();
    });

  currentMarketingPackData = JSON.parse(
    localStorage.getItem("marketingPackData")
  ) || { totalPrice: "0.00" };

  function hideCursorClasses() {
    const classesToHide = [
      "cursor",
      "cursor-content-wrap",
      "cursor-content",
      "cursor-highlight",
    ];

    classesToHide.forEach((className) => {
      const elements = document.querySelectorAll(`.${className}`);
      elements.forEach((el) => (el.style.display = "none"));
    });
  }

  // Function to show all elements with the specified classes
  function showCursorClasses() {
    const classesToShow = [
      "cursor",
      "cursor-content-wrap",
      "cursor-content",
      "cursor-highlight",
    ];

    classesToShow.forEach((className) => {
      const elements = document.querySelectorAll(`.${className}`);
      elements.forEach((el) => (el.style.display = ""));
    });
  }

  document
    .getElementById("learnMoreBtn")
    .addEventListener("click", function () {
      // Show the modal
      document.getElementById("modal-doc4").style.display = "block";
      // Apply the blur effect to the main content
      document.getElementById("main-content").classList.add("blur-effect");
      document.body.style.overflow = "hidden";
      hideCursorClasses();
    });

  document
    .querySelector(".close-btn-doc4")
    .addEventListener("click", function () {
      // Hide the modal
      document.getElementById("modal-doc4").style.display = "none";
      // Remove the blur effect from the main content
      document.getElementById("main-content").classList.remove("blur-effect");
      document.body.style.overflow = "auto";
      showCursorClasses();
    });

  document
    .getElementById("learnMoreBtn2")
    .addEventListener("click", function () {
      // Show the modal
      document.getElementById("modal-doc5").style.display = "block";
      // Apply the blur effect to the main content
      document.getElementById("main-content").classList.add("blur-effect");
      document.body.style.overflow = "hidden";
      hideCursorClasses();
    });

  document
    .querySelector(".close-btn-doc5")
    .addEventListener("click", function () {
      // Hide the modal
      document.getElementById("modal-doc5").style.display = "none";
      // Remove the blur effect from the main content
      document.getElementById("main-content").classList.remove("blur-effect");
      document.body.style.overflow = "auto";
      showCursorClasses();
    });

  document
    .getElementById("learnMoreBtn3")
    .addEventListener("click", function () {
      // Show the modal
      document.getElementById("modal-doc6").style.display = "block";
      // Apply the blur effect to the main content
      document.getElementById("main-content").classList.add("blur-effect");
      document.body.style.overflow = "hidden";
      hideCursorClasses();
    });

  document
    .querySelector(".close-btn-doc6")
    .addEventListener("click", function () {
      // Hide the modal
      document.getElementById("modal-doc6").style.display = "none";
      // Remove the blur effect from the main content
      document.getElementById("main-content").classList.remove("blur-effect");
      document.body.style.overflow = "auto";
      showCursorClasses();
    });

  document.querySelector("#remove1").addEventListener("click", function () {
    document.querySelector("#form1").value = 0;

    document.querySelector("#remove1").style.display = "none";

    // Retrieve the price of the item being removed
    // Assuming each item's price is stored in developmentPackData with a key matching its form ID
    var currentDevelopmentPackData = JSON.parse(
      localStorage.getItem("developmentPackData")
    ) || { totalPrice: "0.00" };
    var itemPrice = currentDevelopmentPackData.totalPrice || 0; // Replace 'form1Price' with the correct key

    // Subtract the item's price from totalPrice and ensure it doesn't go negative
    totalPrice = Math.max(totalPrice - itemPrice, 0);

    // Update the item count and display
    itemsCount--;
    generalPackData.itemCount = itemsCount;
    localStorage.setItem("generalPackData", JSON.stringify(generalPackData));
    var formattedPrice = `U$ ${totalPrice.toFixed(2)}`;
    document.getElementById("price").textContent = formattedPrice;
    document.getElementById("totalprice").textContent = formattedPrice;
    document.getElementById("items").textContent = `items ${itemsCount}`;
    document.getElementById("select1_2").style.display = "block";
    generalPackData.totalPrice = totalPrice.toFixed(2);
    // Save the updated generalPackData in localStorage
    localStorage.setItem("generalPackData", JSON.stringify(generalPackData));
  });

  document.querySelector("#remove2").addEventListener("click", function () {
    document.querySelector("#form2").value = 0;

    document.querySelector("#remove2").style.display = "none";

    var currentDesignPackData = JSON.parse(
      localStorage.getItem("designPackData")
    ) || { totalPrice: "0.00" };
    var itemPrice = currentDesignPackData.totalPrice || 0; // Replace 'form1Price' with the correct key

    // Subtract the item's price from totalPrice and ensure it doesn't go negative
    totalPrice = Math.max(totalPrice - itemPrice, 0);

    // Update the item count and display
    itemsCount--;
    generalPackData.itemCount = itemsCount;
    localStorage.setItem("generalPackData", JSON.stringify(generalPackData));
    var formattedPrice = `U$ ${totalPrice.toFixed(2)}`;
    document.getElementById("price").textContent = formattedPrice;
    document.getElementById("totalprice").textContent = formattedPrice;
    document.getElementById("items").textContent = `items ${itemsCount}`;
    document.getElementById("select2_2").style.display = "block";
    generalPackData.totalPrice = totalPrice.toFixed(2);
    // Save the updated generalPackData in localStorage
    localStorage.setItem("generalPackData", JSON.stringify(generalPackData));
  });

  document.querySelector("#remove3").addEventListener("click", function () {
    document.querySelector("#form3").value = 0;

    document.querySelector("#remove3").style.display = "none";

    var currentMarketingPackData = JSON.parse(
      localStorage.getItem("marketingPackData")
    ) || { totalPrice: "0.00" };
    var itemPrice = currentMarketingPackData.totalPrice || 0; // Replace 'form1Price' with the correct key

    // Subtract the item's price from totalPrice and ensure it doesn't go negative
    totalPrice = Math.max(totalPrice - itemPrice, 0);

    // Update the item count and display
    itemsCount--;
    generalPackData.itemCount = itemsCount;
    localStorage.setItem("generalPackData", JSON.stringify(generalPackData));
    var formattedPrice = `U$ ${totalPrice.toFixed(2)}`;
    document.getElementById("price").textContent = formattedPrice;
    document.getElementById("totalprice").textContent = formattedPrice;
    document.getElementById("items").textContent = `items ${itemsCount}`;
    document.getElementById("select3_2").style.display = "block";
    generalPackData.totalPrice = totalPrice.toFixed(2);
    // Save the updated generalPackData in localStorage
    localStorage.setItem("generalPackData", JSON.stringify(generalPackData));

    // Update totalPrice in currentDevelopmentPackData and localStorage
  });

  // iframe

  var width = screen.width;
  console.log("Screen width:", width);

  // For modal
  var modalContent = document.querySelector("#modal .modal-content");
  var iframe = document.querySelector("#modal .iframe-style");

  var modalContentMarketing = document.querySelector(
    "#modal-marketing .modal-content-marketing"
  );
  var iframeMarketing = document.querySelector(
    "#modal-marketing .iframe-style"
  );

  var modalContentDesign = document.querySelector(
    "#modal-design .modal-content-design"
  );
  var iframeDesign = document.querySelector("#modal-design .iframe-style");

  // Logic for modal2 (#1)

  // For modal2
  var modalContent2 = document.querySelector("#modal2 .modal-content2");
  var iframes2 = document.querySelectorAll(".iframe-style2");

  iframes2.forEach(function (iframe) {
    // Assuming you've defined width somewhere above this code
    if (width >= 920) {
      var heightValue = width * 0.675; // 37.5% of the width
      console.log("67.5% of width:", heightValue);

      var newHeight = width - heightValue;
      console.log("New height:", newHeight);

      iframe.style.height = newHeight + "px"; // Assigning with units
    } else if (width <= 920) {
      var btns = document.querySelectorAll(".BUTTON_RDV111");

      btns.forEach(function (btn) {
        btn.style.display = "inline-block";
        iframe.style.display = "none";
      });
    } else {
      console.log("iframe not found");
    }
  });

  // Logic for modal (#2)
  if (iframe || iframeDesign || iframeMarketing) {
    if (width > 1900) {
      iframe.style.width = "85vw";
      iframe.style.height = "75vh";
      iframe.style.display = "block";
      modalContent.style.width = "90%";

      // design

      iframeDesign.style.width = "85vw";
      iframeDesign.style.height = "75vh";
      iframeDesign.style.display = "block";
      modalContentDesign.style.width = "90%";

      // marketing

      iframeMarketing.style.width = "85vw";
      iframeMarketing.style.height = "75vh";
      iframeMarketing.style.display = "block";
      modalContentMarketing.style.width = "90%";
    } else if (width <= 920) {
      iframe.style.width = "80vw"; // 100% of the viewport width
      iframe.style.height = "65vh"; // 90% of the viewport height (you can adjust this value as needed)
      iframe.style.display = "block";
      modalContent.style.width = "90%";

      // design

      iframeDesign.style.width = "80vw";
      iframeDesign.style.height = "65vh";
      iframeDesign.style.display = "block";
      modalContentDesign.style.width = "90%";

      // marketing

      iframeMarketing.style.width = "80vw";
      iframeMarketing.style.height = " 65vh";
      iframeMarketing.style.display = "block";
      modalContentMarketing.style.width = "90%";
    } else if (width >= 920) {
      iframe.style.width = "88vw"; // 100% of the viewport width
      iframe.style.height = "75vh"; // 90% of the viewport height (you can adjust this value as needed)
      iframe.style.display = "block";
      modalContent.style.width = "95%";

      // design

      iframeDesign.style.width = "88vw";
      iframeDesign.style.height = "75vh";
      iframeDesign.style.display = "block";
      modalContentDesign.style.width = "95%";

      // marketing

      iframeMarketing.style.width = "88vw";
      iframeMarketing.style.height = "75vh";
      iframeMarketing.style.display = "block";
      modalContentMarketing.style.width = "95%";
    } else {
      console.log("iframe not found");
    }
  }
}

var tokenData = JSON.parse(localStorage.getItem("tokenData")) || {
  tokens: 0,
  additionalPrice: 0.0,
  estimatedProjectCompletion: "", // This could be a date or a string
};

// Token.js
function tokensSpecificFunctions() {
  var confirmButton = document.querySelector("#confirmButton");
  if (confirmButton) {
    confirmButton.addEventListener("click", function (event) {
      event.preventDefault();
      window.open("signup-shopping-cart.html", "_blank");
    });
  }

  function resetTokenOnReload() {
    window.addEventListener("load", () => {
      tokenData.tokens = 0;
      tokenData.itemCount = 0;
      tokenData.estimatedProjectCompletion = "";
      // Additionally, update any UI elements that display this data
      // For example:
      // document.getElementById('totalPriceElement').textContent = "0.00";
      // document.getElementById('itemCountElement').textContent = "0";
    });
  }

  // Call the function to activate the reset behavior
  resetTokenOnReload();
  console.log("tokenData", tokenData);
  // Function to open the modal
  function openModal() {
    document.getElementById("popup").style.display = "block";
    // Optionally, add a blur effect to the main content
    document.getElementById("main-content").classList.add("blur-effect");
  }

  // Function to close the modal
  function closeModal() {
    document.getElementById("popup").style.display = "none";
    document.getElementById("main-content").classList.remove("blur-effect");
  }

  // Function for the 'Make Changes' button
  function makeChanges() {
    closeModal();
    // Add any additional logic for making changes
  }

  // Function for the 'Confirm' button
  function confirmSelection() {
    // Implement your logic for confirming the selection
    // For example, save the selection, and redirect to the next page
    closeModal();
    // Uncomment and replace with your URL
  }

  function setupModalListeners() {
    const modal = document.getElementById("popup");
    const makeChangesButton = document.getElementById("makeChangesButton");
    const confirmButton = document.getElementById("confirmButton");

    makeChangesButton.addEventListener("click", makeChanges);
    confirmButton.addEventListener("click", confirmSelection);

    // Your existing logic for nextPageButton
    const nextPageButton = document.querySelectorAll(
      "button.btn.btn-primary"
    )[1]; // Adjust the selector as needed
    nextPageButton.addEventListener("click", function (event) {
      if (
        generalPackData.totalPrice !== "0.00" &&
        generalPackData.itemCount !== 0
      ) {
        event.preventDefault();
        openModal();
      } else {
        // Handle no selection case
      }
    });
  }

  // Call setupModalListeners in your initialization code
  setupModalListeners();

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

  document.querySelector("#mode").innerHTML = generalPackData.mode;

  function setInitialTokenPrice(mode) {
    var initialTokens = {
      budget: 15,
      value: 25,
      agile: 50,
      default: 100,
      personalized: 150,
    };

    var tokenCost = 6;
    var initialTokenCount = initialTokens[mode];
    var initialPrice = initialTokenCount * tokenCost;

    var additionalPriceElement = document.getElementById("additionalPrice");
    if (additionalPriceElement) {
      additionalPriceElement.textContent = initialPrice.toFixed(2); // Display price with two decimal places
    } else {
      console.error("Element with id 'additionalPrice' not found!");
    }
  }

  // Call this function with the selected mode
  setInitialTokenPrice(generalPackData.mode.toLowerCase()); // Replace "budget" with the selected mode

  // Function to reset tokenData on page reload
  var initialTokenData = {
    tokens: 0,
    additionalPrice: 0.0,
    estimatedProjectCompletion: "",
  };

  var tokenData =
    JSON.parse(localStorage.getItem("tokenData")) || initialTokenData; // Initialize tokenData

  function updateUIWithTokenData(tokenData) {
    // Assuming tokenData has properties: tokens and additionalPrice
    var tokensElement = document.getElementById("tokens");
    var tokenPriceElement = document.getElementById("tokenPrice");

    if (tokensElement) {
      tokensElement.textContent = "tokens " + tokenData.tokens;
    } else {
      console.error("Element with id 'tokens' not found!");
    }

    if (tokenPriceElement) {
      tokenPriceElement.textContent =
        "U$ " + tokenData.additionalPrice.toFixed(2);
    } else {
      console.error("Element with id 'tokenPrice' not found!");
    }
  }

  function addToTokenData() {
    var tokens = parseInt(document.querySelector(".value2").innerHTML) || 0;
    var additionalPrice =
      parseFloat(document.getElementById("additionalPrice").innerHTML) || 0.0;
    var estimatedCompletion =
      document.getElementById("completionTime").innerHTML;

    var tokenData = {
      tokens: tokens,
      additionalPrice: additionalPrice,
      estimatedProjectCompletion: estimatedCompletion,
    };

    localStorage.setItem("tokenData", JSON.stringify(tokenData));

    updateUIWithTokenData(tokenData);
  }

  function resetTokenData() {
    localStorage.setItem("tokenData", JSON.stringify(initialTokenData));
    updateUIWithTokenData(initialTokenData);
  }

  document
    .querySelector("#remove.btn.btn-secondary")
    .addEventListener("click", function () {
      document.querySelector("#remove").style.display = "none";
      document.getElementById("addButton").style.display = "block";
      resetTokenData();
    });

  // Attach this function to the 'Add' button
  document.getElementById("addButton").addEventListener("click", function () {
    document.querySelector("#remove").style.display = "block";
    document.getElementById("addButton").style.display = "none";
    addToTokenData();
  });

  function updateDisplayFromGeneralPackData() {
    // Retrieve the stored data
    var storedData = JSON.parse(localStorage.getItem("generalPackData"));

    if (storedData) {
      // Update the elements with the retrieved data
      document.getElementById("price").textContent =
        "U$ " + storedData.totalPrice;
      document.getElementById("totalprice").textContent =
        "U$ " + storedData.totalPrice;
      document.getElementById("items").textContent =
        "items " + String(storedData.itemCount);
    } else {
      console.error("No generalPackData found in storage");
    }
  }

  // Call the function to update the display when the page loads
  updateDisplayFromGeneralPackData();

  function setTokenRangeForMode(mode) {
    var modes = {
      budget: 15,
      value: 25,
      agile: 50,
      default: 100,
      personalized: 150,
    };

    var sliderElement = document.getElementById("range1");
    var tokenValueElement = document.querySelector(".value2"); // Assuming this is where the token value is displayed

    if (modes[mode] === undefined) {
      console.error("Invalid mode selected");
      return;
    }

    var startingTokens = modes[mode];

    // Set the minimum, starting value, and the maximum value of the slider
    sliderElement.min = startingTokens;
    sliderElement.value = startingTokens;
    sliderElement.max = startingTokens * 2;

    // Update the display of starting tokens if it exists
    if (tokenValueElement) {
      tokenValueElement.innerHTML = startingTokens;
    } else {
      console.error("Token value display element not found");
    }

    // Update the display when the slider value changes
    sliderElement.oninput = function () {
      if (tokenValueElement) {
        tokenValueElement.innerHTML = this.value;
      }
    };
  }

  setTokenRangeForMode(generalPackData.mode.toLowerCase()); // Replace "budget" with the selected mode

  function updateCompletionTime(modeSelected) {
    var tokenElement = document.querySelector(".value2");
    var initialTokensForMode = {
      // Initial tokens per mode in lowercase first letter
      budget: 15,
      value: 25,
      agile: 50,
      default: 100,
      personalized: 150,
    };
    var defaultCompletionDaysForMode = {
      // Default completion days per mode in lowercase first letter
      budget: 90,
      value: 90,
      agile: 120,
      default: 120,
      personalized: 150,
    };

    // Ensure modeSelected is in lowercase before accessing the properties
    modeSelected = modeSelected.charAt(0).toLowerCase() + modeSelected.slice(1);

    var initialTokenCount = initialTokensForMode[modeSelected];
    var defaultCompletionTimeInDays =
      defaultCompletionDaysForMode[modeSelected];

    if (tokenElement) {
      var currentTokenCount = parseInt(tokenElement.innerHTML, 10);
      if (isNaN(currentTokenCount) || currentTokenCount <= 0) {
        console.error("Invalid token count.");
        return; // Exit the function if token count is invalid
      }

      // Calculate the adjustment factor based on the initial and current token count
      var adjustmentFactor = initialTokenCount / currentTokenCount;

      // Calculate the new completion date
      var currentDate = new Date();
      currentDate.setDate(
        currentDate.getDate() +
          Math.round(defaultCompletionTimeInDays * adjustmentFactor)
      );

      // Update the display
      var completionElement = document.getElementById("completionTime");
      if (completionElement) {
        // Ensure we get the correct month and day including leading zeros if necessary
        var formattedDate =
          ("0" + (currentDate.getMonth() + 1)).slice(-2) +
          "/" +
          ("0" + currentDate.getDate()).slice(-2) +
          "/" +
          currentDate.getFullYear();
        completionElement.innerHTML = formattedDate;
      } else {
        console.error("Element with id 'completionTime' not found!");
      }
    } else {
      console.error("Element with class 'value2' not found!");
    }
  }

  var tokenElement = document.querySelector(".value2");
  // Usage example:
  updateCompletionTime(generalPackData.mode.toLowerCase());

  function attachSliderListener() {
    var slider = document.getElementById("range1");
    if (slider) {
      slider.oninput = function () {
        // Assuming that the `tokenElement` updates its innerHTML with the slider's value
        var tokenElement = document.querySelector(".value2");
        if (tokenElement) {
          tokenElement.innerHTML = this.value;
          updateCompletionTime(generalPackData.mode.toLowerCase()); // Call the function whenever the slider value changes
        } else {
          console.error("Element with class 'value2' not found!");
        }
      };
    } else {
      console.error("Slider element with id 'tokenSlider' not found!");
    }
  }

  // Call this function to attach the event listener to the slider
  attachSliderListener();

  function updatePriceBasedOnTokens() {
    var tokenSlider = document.getElementById("range1");
    tokenSlider.addEventListener("input", function () {
      // Get the number of tokens from the slider
      var tokens = parseInt(tokenSlider.value) || 0;

      // Cost per token in dollars
      var tokenCost = 6;

      // Calculate the additional cost
      var additionalPrice = tokens * tokenCost;

      // Update the HTML element that displays the additional price
      var additionalPriceElement = document.getElementById("additionalPrice");
      additionalPriceElement.textContent = additionalPrice.toFixed(2); // Display price with two decimal places
    });
  }

  // When the DOM is fully loaded, call the function

  updatePriceBasedOnTokens();
}

function developmentPackSpecificFunctions(selectedOptionsFromMode) {
  var developmentPackData = JSON.parse(
    localStorage.getItem("developmentPackData")
  );

  function updateMode(selectedMode) {
    developmentPackData.mode = selectedMode.toLowerCase();
    localStorage.setItem(
      "developmentPackData",
      JSON.stringify(developmentPackData)
    );
  }

  function onModeChange(newMode) {
    // Update developmentPackData with the new mode
    developmentPackData.mode = newMode.toLowerCase(); // Replace "budget" with the new mode
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
    localStorage.setItem(
      "developmentPackData",
      JSON.stringify(developmentPackData)
    );
  }

  // Initialize or retrieve data from localStorage

  function updateLocalStorage() {
    localStorage.setItem(
      "developmentPackData",
      JSON.stringify(developmentPackData)
    );
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
      console.log(developmentPackData);
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
        "Conversion Funnel": 10.0, // No change as the original sum matches the target
        Newsletter: 5.0, // No change
        "Email Marketing Development": 6.0, // No change
        "Marketing Automation": 3.99, // No change
      },
      Value: {
        // Total to reach: 99.99, Original sum: 102.99, Scaling factor: 99.99 / 102.99
        Website: 35.0,
        Blog: 15.0,
        "Conversion Funnel": 20.0,
        Newsletter: 10.0,
        "Email Marketing Development": 12.0,
        "Marketing Automation": 7.99,
      },
      Agile: {
        Ecommerce: 106.18,
        Website: 68.78,
        "Web Application": 77.12,
        "System Integration": 51.49,
        Blog: 28.8,
        "Progressive Web App": 31.02,
        "Conversion Funnel": 41.9,
        Newsletter: 15.79,
        "Email Marketing Development": 26.28,
        "Marketing Automation": 21.03,
        "Conversion Rate Optimization": 21.03,
        Subscriber: 10.57, // Adjusted to ensure the total is 499.99
      },
      // ... (other modes) ...

      // ... (any other modes if necessary) ...
      Default: {
        Ecommerce: 165.0,
        Website: 110.0,
        "Web Application": 87.5,
        "System Integration": 98.5,
        Blog: 26.1,
        Android: 31.7,
        IPhone: 37.3,
        "Cross-platform_software": 54.0,
        "Progressive Web App": 42.9,
        "Microsoft Windows": 37.3,
        MacOS: 31.7,
        "Command-line Interface": 20.55,
        "Conversion Funnel": 31.7,
        Newsletter: 27.78,
        "Email Marketing Development": 31.7,
        "Marketing Automation": 20.55,
        "Conversion Rate Optimization": 26.1,
        Subscriber: 9.45,
        "Application Programming Interface": 30.6,
        "Generative AI": 12.78,
      },

      Personalized: {
        Ecommerce: 194.99,
        Website: 148.802,
        "System Integration": 128.162,
        Blog: 48.53,
        Android: 58.91,
        IPhone: 69.28,
        "Cross-platform_software": 45.102,
        "Progressive Web App": 24.692,
        "Microsoft Windows": 69.28,
        MacOS: 58.91,
        "Command-line Interface": 38.71,
        "Conversion Funnel": 58.91,
        Newsletter: 27.84,
        "Email Marketing Development": 58.91,
        "Marketing Automation": 38.2,
        "Conversion Rate Optimization": 48.53,
        Subscriber: 17.52,
        "Application Programming Interface": 56.89,
        "Web Application": 87.7,
        "Generative AI": 87.51,
        "Embedded System": 87.61,
        "Generative AI Implementation": 54.898,
        "Mobile Game": 180.0,
        "Augmented Reality": 180.0,
        "Machine Learning": 180.0,
        "PC Game": 150.0,
        "Deep Learning": 100.0,
        "Natural Language Processing": 100.0,
        "Data Science": 90.0,
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
      sanitizeMode(developmentPackData.mode)
    );

    developmentPackData.totalPrice = totalPrice;
    updateLocalStorage();

    localStorage.setItem(
      "totalPriceForDevelopmentPack",
      JSON.stringify(totalPrice)
    );

    var priceLink = document.querySelector(".nav-link.active");
    priceLink.textContent =
      "Current Price: " +
      JSON.parse(localStorage.getItem("totalPriceForDevelopmentPack"));
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
  function getInitialMode(selectedOptionsFromMode, developmentPackData) {
    // Check if mode is present in selectedOptionsFromMode
    let mode =
      selectedOptionsFromMode[Object.keys(selectedOptionsFromMode)[0]]?.mode ||
      "none";

    // Update developmentPackData if necessary
    if (developmentPackData && developmentPackData.mode !== mode) {
      developmentPackData.mode = mode;
      localStorage.setItem(
        "developmentPackData",
        JSON.stringify(developmentPackData)
      );
    }

    return mode;
  }

  // In developmentPackSpecificFunctions
  var initialMode = getInitialMode(
    selectedOptionsFromMode,
    developmentPackData
  );
  onModeChange(initialMode);
  transformServicesToMode(initialMode);

  var dropdownLabel = document.querySelector("#navbarDropdownMenuLink");
  dropdownLabel.textContent = "Mode: " + capitalizeFirstLetter(initialMode);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // Set the initial page state

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
    var budgetMode = [18, 19, 20, 21];
    var valueMode = [1, 5, 18, 19, 20, 21];
    var AgileMode = [0, 1, 2, 3, 5, 10, 18, 19, 20, 21, 22, 23];
    var DefaultMode = [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 13, 14, 16, 18, 19, 20, 21, 22, 23, 26,
      28,
    ];
    var PersonlizedMode = [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23, 24, 25, 26, 27, 28, 29,
    ];
    var ExpensiveMode = [9, 11, 15, 17, 24, 25, 27, 29];

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
    developmentPackData.selectedServices = selectedServices;
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
        console.log(developmentPackData);
      });
      // Update the localStorage when services are selected or deselected
      developmentPackData.selectedServices = selectedServices;
      updateLocalStorage();
    });
  }

  trackSelectedServices();
  updateModeAndPrice(capitalizeFirstLetter(developmentPackData.mode));
  console.log(developmentPackData);

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
    var modes = ["Budget", "Value"];
    // , "Agile", "Default", "Personalized"

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

function designPackSpecificFunctions(selectedOptionsFromMode) {
  // Initialize designPackData with an empty object if it's not found in localStorage
  var designPackData = JSON.parse(localStorage.getItem("designPackData"));

  function updateMode(selectedMode) {
    if (designPackData) {
      designPackData.mode = selectedMode.toLowerCase();
      localStorage.setItem("designPackData", JSON.stringify(designPackData));
    }
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
    localStorage.setItem("designPackData", JSON.stringify(designPackData));
  }

  // Initialize or retrieve data from localStorage

  function updateLocalStorage() {
    localStorage.setItem("designPackData", JSON.stringify(designPackData));
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
      console.log(designPackData);
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
      designPackData.mode = mode;
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
        "Social Media Copy": 3.12375,
        PowerPoint: 3.12375,
        Logo: 3.12375,
      },
      Value: {
        // Total to reach: 99.99, Original sum: 102.99, Scaling factor: 99.99 / 102.99

        Instagram: 8.3325,
        FaceBook: 8.3325,
        Twitter: 8.3325,
        "Social Media Copy": 8.3325,
        "Display Advertising": 8.3325,
        "Email Copy": 8.3325,
        "Website Copy": 8.3325,
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
        "Social Media Copy": 31.249375,
        "Display Advertising": 31.249375,
        "Email Copy": 31.249375,
        "Website Copy": 31.249375,
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
        "Social Media Copy": 41.66625,
        "Display Advertising": 41.66625,
        "Email Copy": 41.66625,
        "Website Copy": 41.66625,
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
        "Social Media Copy": 55.5185185,
        "Display Advertising": 55.5185185,
        "Email Copy": 55.5185185,
        "Website Copy": 55.5185185,
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
      console.log("Mode received for price calculation:", mode); // Debug log

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
    // Calculate the total price here instead
    const totalPrice = calculateTotalPrice(
      formattedSelectedServices,
      sanitizeMode(designPackData.mode)
    );

    designPackData.totalPrice = totalPrice;
    updateLocalStorage();

    // Update the display of total price
    var priceLink = document.querySelector(".nav-link.active");
    priceLink.textContent = "Current Price: U$ " + totalPrice;
    localStorage.setItem("totalPriceForDesignPack", JSON.stringify(totalPrice));
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
      localStorage.setItem("designPackData", JSON.stringify(designPackData));
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
    var valueMode = [0, 1, 2, 5, 6, 7, 8, 12, 13, 15, 17, 29];
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
    var modes = ["Budget", "Value"];
    // , "Agile", "Default", "Personalized"

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

// design - pack.html;

function marketingPackSpecificFunctions(selectedOptionsFromMode) {
  // Initialize designPackData with an empty object if it's not found in localStorage
  var marketingPackData = JSON.parse(localStorage.getItem("marketingPackData"));

  function updateMode(selectedMode) {
    if (marketingPackData) {
      marketingPackData.mode = selectedMode.toLowerCase();
      localStorage.setItem(
        "marketingPackData",
        JSON.stringify(marketingPackData)
      );
    }
  }

  function onModeChange(newMode) {
    // Update developmentPackData with the new mode
    marketingPackData.mode = newMode.toLowerCase();
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
    localStorage.setItem(
      "marketingPackData",
      JSON.stringify(marketingPackData)
    );
  }

  // Initialize or retrieve data from localStorage

  function updateLocalStorage() {
    localStorage.setItem(
      "marketingPackData",
      JSON.stringify(marketingPackData)
    );
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
      console.log(marketingPackData);
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
      marketingPackData.mode = mode;
      updateLocalStorage(); // Save the changes to localStorage
    }

    console.log(`Mode: ${mode}`);

    var modePrices = {
      Budget: {
        // Total to reach: 24.99, Original sum: 24.99, Scaling factor: 24.99 / 24.99 = 1
        "Instagram Ads": 3.12375,
        "FaceBook Ads": 3.12375,
        "Twitter Ads": 3.12375,
        "Google Ads": 3.12375,
        "Bing Ads": 3.12375,
        "Email Marketing": 3.12375,
        "Two Way SMS": 3.12375,
        "Display Advertising Promotion": 3.12375,
      },
      Value: {
        // Total to reach: 99.99, Original sum: 102.99, Scaling factor: 99.99 / 102.99

        "Instagram Ads": 9.999,
        "FaceBook Ads": 9.999,
        "Twitter Ads": 9.999,
        "Google Ads": 9.999,
        "Bing Ads": 9.999,
        "Email Marketing": 9.999,
        "Mobile Marketing": 9.999,
        "Two Way SMS": 9.999,
        "Display Advertising Promotion": 9.999,
        "Marketing Automation Promotion": 9.999,
      },
      Agile: {
        // Total to reach: 99.99, Original sum: 102.99, Scaling factor: 99.99 / 102.99

        "Instagram Ads": 41.6658333,
        "FaceBook Ads": 41.6658333,
        "Twitter Ads": 41.6658333,
        "Google Ads": 41.6658333,
        "Bing Ads": 41.6658333,
        "Email Marketing": 41.6658333,
        "Mobile Marketing": 41.6658333,
        "Two Way SMS": 9.999,
        "Display Advertising Promotion": 41.6658333,
        "Marketing Automation Promotion": 41.6658333,
        Robocall: 41.6658333,
        "Interactive Voice Response": 41.6658333,
      },
      // ... (other modes) ...

      // ... (any other modes if necessary) ...
      Default: {
        "Instagram Ads": 71.4278571,
        "FaceBook Ads": 71.4278571,
        "Twitter Ads": 71.4278571,
        "Google Ads": 71.4278571,
        "Bing Ads": 71.4278571,
        "Email Marketing": 71.4278571,
        "Mobile Marketing": 71.4278571,
        "Two Way SMS": 9.999,
        "Display Advertising Promotion": 71.4278571,
        "Marketing Automation Promotion": 71.4278571,
        Robocall: 71.4278571,
        "Interactive Voice Response": 71.4278571,
        "Advertising Mail": 71.4278571,
        Sponsorship: 71.4278571,
      },

      Personalized: {
        "Instagram Ads": 107.142143,
        "FaceBook Ads": 107.142143,
        "Twitter Ads": 107.142143,
        "Google Ads": 107.142143,
        "Bing Ads": 107.142143,
        "Email Marketing": 107.142143,
        "Mobile Marketing": 107.142143,
        "Two Way SMS": 9.999,
        "Display Advertising Promotion": 107.142143,
        "Marketing Automation Promotion": 107.142143,
        Robocall: 107.142143,
        "Interactive Voice Response": 107.142143,
        "Advertising Mail": 107.142143,
        Sponsorship: 107.142143,
        Billboard: 107.142143,
        "Pop-up Retail": 107.142143,
        "Trade Show": 107.142143,
        "Street Team": 107.142143,
      },

      Expensive: {
        // New total to scale towards is arbitrarily chosen for illustrative purposes
        // Current total: 980, New total: 1200, Scaling factor: 1200 / 980
      },
    };

    function calculateTotalPrice(selectedServices, mode) {
      console.log("Mode received for price calculation:", mode); // Debug log

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
    // Calculate the total price here instead
    const totalPrice = calculateTotalPrice(
      formattedSelectedServices,
      sanitizeMode(marketingPackData.mode)
    );

    marketingPackData.totalPrice = totalPrice;
    updateLocalStorage();

    // Update the display of total price
    var priceLink = document.querySelector(".nav-link.active");
    priceLink.textContent = "Current Price: U$ " + totalPrice;
    localStorage.setItem(
      "totalPriceForMarketingPack",
      JSON.stringify(totalPrice)
    );
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
  function getInitialMode(selectedOptionsFromMode, marketingPackData) {
    // Check if mode is present in selectedOptionsFromMode
    let mode =
      selectedOptionsFromMode[Object.keys(selectedOptionsFromMode)[0]]?.mode ||
      "none";

    // Update developmentPackData if necessary
    if (marketingPackData && marketingPackData.mode !== mode) {
      marketingPackData.mode = mode;
      localStorage.setItem(
        "marketingPackData",
        JSON.stringify(marketingPackData)
      );
    }

    return mode;
  }
  // In developmentPackSpecificFunctions
  var initialMode = getInitialMode(selectedOptionsFromMode, marketingPackData);
  onModeChange(initialMode);
  transformServicesToMode(initialMode);

  var dropdownLabel = document.querySelector("#navbarDropdownMenuLink");
  dropdownLabel.textContent = "Mode: " + capitalizeFirstLetter(initialMode);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // Set the initial page state

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
    var budgetMode = [0, 1, 2, 3, 4, 5, 6, 9];
    var valueMode = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    var AgileMode = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    var DefaultMode = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 15, 17];
    var PersonlizedMode = [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
    ];
    var ExpensiveMode = [12, 13, 14, 16];

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
    marketingPackData.selectedServices = selectedServices;
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
        console.log(marketingPackData);
      });
      // Update the localStorage when services are selected or deselected
      marketingPackData.selectedServices = selectedServices;
      updateLocalStorage();
    });
  }

  trackSelectedServices();
  updateModeAndPrice(capitalizeFirstLetter(marketingPackData.mode));
  console.log(marketingPackData);

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
    var modes = ["Budget", "Value"];
    // , "Agile", "Default", "Personalized"

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

// function marketingPackSpecificFunctions() {
//   var divTexts = {};
//   var selectedServices = [];

//   function runThisCode() {
//     function sanitizeMode(mode) {
//       // Define the allowed modes
//       const allowedModes = [
//         "budget",
//         "value",
//         "agile",
//         "default",
//         "personalized",
//       ];
//       // Remove any characters that are not spaces or alphanumerics and convert to lowercase
//       const sanitized = mode.replace(/[^a-zA-Z0-9\s]/g, "").toLowerCase();
//       // Split by spaces and filter out any words that are not in the allowed modes
//       const filteredWords = sanitized
//         .split(" ")
//         .filter((word) => allowedModes.includes(word));
//       // Return the first allowed mode found or an empty string if none are found
//       return filteredWords.length > 0 ? filteredWords[0] : "";
//     }

//     function capitalizeFirstLetter(str) {
//       return str
//         .split(" ")
//         .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//         .join(" ");
//     }

//     function extractAndFormatModeFromElementContent(selector) {
//       // Select the element by the CSS selector provided
//       const element = document.querySelector(selector);
//       // Get the text content of the element
//       const content = element.textContent || element.innerText;

//       // Regular expression to find "Mode:" followed by any text
//       const modeRegex = /Mode:\s*(\S+)/;
//       const match = content.match(modeRegex);

//       if (match && match[1]) {
//         // Convert to lowercase and remove spaces
//         const mode = match[1].toLowerCase().replace(/\s/g, "");
//         return mode;
//       } else {
//         // If "Mode:" is not found in the content, return an empty string or handle it as needed
//         return "";
//       }
//     }

//     // Example usage:
//     // Assuming you want to select the element with the class "nav-link dropdown-toggle"
//     const selector = ".nav-link.dropdown-toggle";
//     const mode = extractAndFormatModeFromElementContent(selector);
//     console.log(`Mode: ${mode}`);

//     var modePrices = {
//       Budget: {
//         // Total to reach: 24.99, Original sum: 24.99, Scaling factor: 24.99 / 24.99 = 1
//         Instagram: 3.12375,
//         FaceBook: 3.12375,
//         Twitter: 3.12375,
//         "Display Advertising": 3.12375,
//         "Email Copy": 3.12375,
//         Copywriting: 3.12375,
//         PowerPoint: 3.12375,
//         Logo: 3.12375,
//       },
//       Value: {
//         // Total to reach: 99.99, Original sum: 102.99, Scaling factor: 99.99 / 102.99

//         Instagram: 8.3325,
//         FaceBook: 8.3325,
//         Twitter: 8.3325,
//         Copywriting: 8.3325,
//         "Display Advertising": 8.3325,
//         "Email Copy": 8.3325,
//         Copywriting: 8.3325,
//         PowerPoint: 8.3325,
//         Logo: 8.3325,
//         "Landing Page": 8.3325,
//         Banner: 8.3325,
//         "Post-production": 8.3325,
//       },
//       Agile: {
//         // Total to reach: 99.99, Original sum: 102.99, Scaling factor: 99.99 / 102.99

//         Instagram: 31.249375,
//         FaceBook: 31.249375,
//         Twitter: 31.249375,
//         Copywriting: 31.249375,
//         "Display Advertising": 31.249375,
//         "Email Copy": 31.249375,
//         Copywriting: 31.249375,
//         PowerPoint: 31.249375,
//         Logo: 31.249375,
//         "Landing Page": 31.249375,
//         Banner: 31.249375,
//         "Post-production": 31.249375,
//         Storytelling: 31.249375,
//         Brochure: 31.249375,
//         "Business Card": 31.249375,
//         Poster: 31.249375,
//       },
//       // ... (other modes) ...

//       // ... (any other modes if necessary) ...
//       Default: {
//         Instagram: 41.66625,
//         FaceBook: 41.66625,
//         Twitter: 41.66625,
//         Copywriting: 41.66625,
//         "Display Advertising": 41.66625,
//         "Email Copy": 41.66625,
//         Copywriting: 41.66625,
//         PowerPoint: 41.66625,
//         Logo: 41.66625,
//         "Landing Page": 41.66625,
//         Banner: 41.66625,
//         "Post-production": 41.66625,
//         Storytelling: 41.66625,
//         Brochure: 41.66625,
//         "Business Card": 41.66625,
//         Poster: 41.66625,
//         Snapchat: 41.66625,
//         Tiktok: 41.66625,
//         Print: 41.66625,
//         Digital: 41.66625,
//         PDF: 41.66625,
//         "Portrait Photography": 41.66625,
//         Photography: 41.66625,
//         "Video Production": 41.66625,
//       },

//       Personalized: {
//         Instagram: 55.5185185,
//         FaceBook: 55.5185185,
//         Twitter: 55.5185185,
//         Copywriting: 55.5185185,
//         "Display Advertising": 55.5185185,
//         "Email Copy": 55.5185185,
//         Copywriting: 55.5185185,
//         PowerPoint: 55.5185185,
//         Logo: 55.5185185,
//         "Landing Page": 55.5185185,
//         Banner: 55.5185185,
//         "Post-production": 55.5185185,
//         Storytelling: 55.5185185,
//         Brochure: 55.5185185,
//         "Business Card": 55.5185185,
//         Poster: 55.5185185,
//         Snapchat: 55.5185185,
//         Tiktok: 55.5185185,
//         Print: 55.5185185,
//         Digital: 55.5185185,
//         PDF: 55.5185185,
//         "Portrait Photography": 55.5185185,
//         Photography: 55.5185185,
//         "Video Production": 55.5185185,
//         Packaging: 55.5185185,
//         Magazine: 55.5185185,
//         Letter: 55.5185185 + 0.99,
//         "Event Videography": 55.5185185,
//         Infographic: 55.5185185,
//         "Aerial Photography": 55.5185185,
//       },

//       Expensive: {
//         // New total to scale towards is arbitrarily chosen for illustrative purposes
//         // Current total: 980, New total: 1200, Scaling factor: 1200 / 980
//       },
//     };

//     function calculateTotalPrice(selectedServices, mode) {
//       const formattedMode = mode
//         .toLowerCase()
//         .replace(/\s/g, "_")
//         .split("_")
//         .map(capitalizeFirstLetter)
//         .join("_");

//       // Debug: Log the formattedMode to see if it matches the keys in modePrices
//       console.log("Formatted Mode:", formattedMode);

//       if (!modePrices[formattedMode]) {
//         console.error(`The mode "${mode}" is not available.`);
//         return "0.00"; // Return a default price or handle the error as needed
//       }

//       let totalPrice = 0;
//       selectedServices.forEach((service) => {
//         const formattedService = capitalizeFirstLetter(service);

//         // Debug: Check if the service exists for this mode
//         if (!modePrices[formattedMode][formattedService]) {
//           console.warn(
//             `The service "${formattedService}" is not available in the "${formattedMode}" mode.`
//           );
//           return; // Skip this service and continue with the next
//         }

//         const servicePrice = modePrices[formattedMode][formattedService];
//         totalPrice += parseFloat(servicePrice);
//       });

//       return totalPrice.toFixed(2);
//     }

//     const formattedSelectedServices = selectedServices.map((service) =>
//       capitalizeFirstLetter(service)
//     );
//     const totalPrice = calculateTotalPrice(
//       formattedSelectedServices,
//       sanitizeMode(marketingPackData.mode)
//     );

//     var priceLink = document.querySelector(".nav-link.active");
//     priceLink.textContent = "Current Price: " + totalPrice;
//   }

//   // Assuming this 'modePrices' object exists and contains the pricing info

//   // Create a dictionary of DivNumber: Text from divisions with the specified classes
//   var divs = document.querySelectorAll(
//     ".col-lg-2, .col-md-3, .col-sm-4, .col-6"
//   );
//   divs.forEach((div, index) => {
//     var titleDiv = div.querySelector(".info-div h6.text-black.mb-0");
//     if (titleDiv) {
//       divTexts[index] = titleDiv.innerText.trim();
//     }
//   });
//   console.log("Div Texts Dictionary:", divTexts);

//   // Assuming mode is passed as a query parameter
//   function getInitialMode() {
//     let mode =
//       selectedOptionsFromMode[Object.keys(selectedOptionsFromMode)[0]]?.mode ||
//       "none";
//     return mode; // default to 'budget' if no mode is specified
//   }

//   var initialMode = getInitialMode();

//   var dropdownLabel = document.querySelector("#navbarDropdownMenuLink");
//   dropdownLabel.textContent = "Mode: " + capitalizeFirstLetter(initialMode);

//   function capitalizeFirstLetter(string) {
//     return string.charAt(0).toUpperCase() + string.slice(1);
//   }

//   // Set the initial page state
//   resetServices();
//   transformServicesToMode(initialMode);
//   updateSelectedServices();
//   runThisCode();

//   function addTooltip(element, message) {
//     // Create the tooltip element
//     const tooltip = document.createElement("div");
//     tooltip.className = "tooltip";
//     tooltip.innerText = message;
//     document.body.appendChild(tooltip);

//     // Position the tooltip above the element
//     element.addEventListener("mouseover", function (e) {
//       const rect = element.getBoundingClientRect();
//       tooltip.style.top =
//         rect.top + window.scrollY - tooltip.offsetHeight + "px"; // Removed the -8px offset
//       tooltip.style.left =
//         rect.left +
//         window.scrollX +
//         rect.width / 2 -
//         tooltip.offsetWidth / 2 +
//         "px";
//       tooltip.style.visibility = "visible";
//       tooltip.style.opacity = 1;
//     });

//     element.addEventListener("mouseout", function () {
//       tooltip.style.visibility = "hidden";
//       tooltip.style.opacity = 0;
//     });
//   }

//   // To use the function:

//   function transformServicesToMode(mode) {
//     // Mode lists
//     var budgetMode = [0, 1, 2, 3, 4, 5, 6, 9];
//     var valueMode = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
//     var AgileMode = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
//     var DefaultMode = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 15, 17];
//     var PersonlizedMode = [
//       0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
//     ];
//     var ExpensiveMode = [12, 13, 14, 16];

//     // Determine the active mode
//     var activeMode;
//     switch (mode) {
//       case "budget":
//         activeMode = budgetMode;
//         break;
//       case "value":
//         activeMode = valueMode;
//         break;
//       case "agile":
//         activeMode = AgileMode;
//         break;
//       case "default":
//         activeMode = DefaultMode;
//         break;
//       case "personalized":
//         activeMode = PersonlizedMode;
//         break;
//       default:
//         console.error("Invalid mode provided");
//         return;
//     }

//     // Get all service divisions
//     var serviceDivs = document.querySelectorAll(
//       ".col-lg-2.col-md-3.col-sm-4.col-6.mb-"
//     );
//     serviceDivs.forEach((div, index) => {
//       const checkbox = div.querySelector(".form-check-input");
//       const label = div.querySelector(".form-check-label");

//       // For personalized mode, we delegate to a specific function
//       if (mode === "personalized") {
//         UselectExpensiveMode(ExpensiveMode);
//       } else {
//         if (activeMode.includes(index)) {
//           checkbox.checked = true; // Check the checkbox by default
//           addTooltip(
//             div,
//             "This service is included in your chosen plan. Uncheck the box to remove it and reduce your monthly cost"
//           );
//         } else {
//           div.classList.add("mb-4");

//           // Create the lock image
//           var lockImg = document.createElement("img");
//           lockImg.className = "lock";
//           lockImg.src = "graphics/padlock.png";

//           // Append the lock image to the div
//           div.insertBefore(lockImg, div.firstChild);

//           var serviceContent = document.createElement("div");
//           serviceContent.className = "service-unavailable";
//           while (div.children.length > 1) {
//             serviceContent.appendChild(div.children[1]);
//           }
//           div.appendChild(serviceContent);

//           // Now add the tooltip to the .service-unavailable div
//           addTooltip(
//             serviceContent,
//             "This service isn't available in your selected mode. Choose a different mode to access it."
//           );
//         }
//       }
//     });

//     // This function must be defined elsewhere in your code
//     updateSelectedServices();
//     runThisCode();
//   }

//   // Make sure this function is only called once per mode switch
//   function UselectExpensiveMode(ExpensiveMode) {
//     var serviceDivs = document.querySelectorAll(
//       ".col-lg-2.col-md-3.col-sm-4.col-6.mb-"
//     );
//     serviceDivs.forEach((div, index) => {
//       const checkbox = div.querySelector(".form-check-input");
//       const label = div.querySelector(".form-check-label");

//       if (!ExpensiveMode.includes(index)) {
//         // Changed logic here
//         checkbox.checked = true; // Check the checkbox
//         addTooltip(div, "This service is included in your chosen plan.");
//       } else {
//         checkbox.checked = false; // Uncheck the checkbox
//         addTooltip(
//           div,
//           "This premium service is not included by default. By adding it your price will be increased."
//         );
//       }
//     });
//   }

//   function updateSelectedServices() {
//     selectedServices = []; // Reset the selectedServices array

//     var checkboxes = document.querySelectorAll(".form-check-input");
//     checkboxes.forEach((checkbox, index) => {
//       var serviceName = divTexts[index];
//       if (checkbox.checked) {
//         selectedServices.push(serviceName);
//       }
//     });
//     console.log("Updated Selected Services: ", selectedServices);
//   }

//   // Create a dictionary for the "Learn More" buttons with their respective numbers
//   var learnMoreButtons = document.querySelectorAll("button.btn.btn-primary");
//   var buttonNumbers = {};
//   learnMoreButtons.forEach((button, index) => {
//     buttonNumbers[index] = button;
//   });
//   console.log("Button Numbers Dictionary:", buttonNumbers);

//   function trackSelectedServices() {
//     var checkboxes = document.querySelectorAll(".form-check-input");

//     checkboxes.forEach(function (checkbox, index) {
//       checkbox.addEventListener("change", function () {
//         var serviceName = divTexts[index];

//         if (checkbox.checked) {
//           // Add the service to the list if checked
//           selectedServices.push(serviceName);
//           runThisCode();
//         } else {
//           // Remove the service from the list if unchecked
//           var serviceIndex = selectedServices.indexOf(serviceName);
//           if (serviceIndex > -1) {
//             selectedServices.splice(serviceIndex, 1);
//             runThisCode();
//           }
//         }

//         console.log("Selected Services: ", selectedServices);
//       });
//     });
//   }

//   trackSelectedServices();

//   // Add event listeners to the "Learn More" buttons
//   learnMoreButtons.forEach((button, index) => {
//     button.addEventListener("click", function () {
//       // Match the button's number with the div number to extract the corresponding title
//       var titleText = divTexts[index];
//       console.log("Clicked Button Index:", index, "Title Text:", titleText);

//       // var baseSearchURL = "http://www.google.com/custom?q=";
//       // var googleSearchURL = baseSearchURL + encodeURIComponent("What is a " + titleText + "?") + "&btnG=Search";

//       // var baseCSEURL = "https://www.google.com/cse?cx=b018f681b1c654a68&q=";
//       // var googleCSEURL = baseCSEURL + encodeURIComponent("What is a " + titleText + "?");
//       // console.log("Constructed Google CSE URL:", googleCSEURL);

//       // Construct the Wikipedia URL using the extracted title
//       var wikipediaURL =
//         "https://en.wikipedia.org/wiki/" + encodeURIComponent(titleText);
//       console.log("Constructed Wikipedia URL:", wikipediaURL);

//       // Find the associated modal (assuming there's a single modal for all buttons)
//       var modal = document.getElementById("modal");
//       if (modal) {
//         // Find the iframe within the modal
//         var iframe = modal.querySelector(".iframe-style");
//         if (iframe) {
//           // Update the iframe's src attribute
//           iframe.src = wikipediaURL;
//           console.log("Iframe src updated:", wikipediaURL);
//         }

//         // Show the modal
//         modal.style.display = "block";
//         console.log("Modal displayed");

//         // Apply the blur effect to the main content
//         document.getElementById("main-content").classList.add("blur-effect");
//         document.body.style.overflow = "hidden";
//         hideCursorClasses();
//         console.log("Blur effect applied and cursor classes hidden");
//       }
//     });
//   });

//   document.querySelector(".close-btn").addEventListener("click", function () {
//     // Hide the modal
//     document.getElementById("modal").style.display = "none";
//     // Remove the blur effect from the main content
//     document.getElementById("main-content").classList.remove("blur-effect");
//     document.body.style.overflow = "auto";
//     showCursorClasses();
//   });

//   function resetServices() {
//     // Remove all tooltips
//     var tooltips = document.querySelectorAll(".tooltip");
//     tooltips.forEach(function (tooltip) {
//       tooltip.remove();
//     });

//     // Reset all service divisions
//     var serviceDivs = document.querySelectorAll(
//       ".col-lg-2.col-md-3.col-sm-4.col-6.mb-"
//     );
//     serviceDivs.forEach((div) => {
//       // Remove the lock images
//       var lockImg = div.querySelector(".lock");
//       if (lockImg) {
//         lockImg.remove();
//       }

//       // Remove the service-unavailable class and its contents
//       var serviceContent = div.querySelector(".service-unavailable");
//       if (serviceContent) {
//         while (serviceContent.firstChild) {
//           div.insertBefore(serviceContent.firstChild, serviceContent);
//         }
//         serviceContent.remove();
//       }

//       div.classList.remove("mb-4");

//       // Uncheck all checkboxes
//       const checkbox = div.querySelector(".form-check-input");
//       checkbox.checked = false;
//     });
//   }

//   var dropdownItems = document.querySelectorAll(".dropdown-item");
//   for (var i = 0; i < dropdownItems.length; i++) {
//     dropdownItems[i].addEventListener("click", function (event) {
//       updateModeAndPrice(event.target.textContent.trim());
//     });
//   }

//   function getInitialMode() {
//     let mode =
//       selectedOptionsFromMode[Object.keys(selectedOptionsFromMode)[0]]?.mode ||
//       "none";
//     return mode; // default to 'budget' if no mode is specified
//   }

//   var initialMode = getInitialMode();

//   function updateModeAndPrice(selectedMode) {
//     // Update Dropdown Label
//     var dropdownLabel = document.querySelector("#navbarDropdownMenuLink");
//     dropdownLabel.textContent = "Mode: " + capitalizeFirstLetter(initialMode);

//     // Update Price
//     var price;
//     switch (selectedMode.toLowerCase()) {
//       case "budget":
//         price = "24.99";
//         break;
//       case "value":
//         price = "99.99";
//         break;
//       case "agile":
//         price = "499.99";
//         break;
//       case "default":
//         price = "999.99";
//         break;
//       case "personalized":
//         price = "1499.99";
//         break;
//       default:
//         price = "0.00";
//     }
//     var priceLink = document.querySelector(".nav-link.active");
//     runThisCode();

//     // Update Dropdown Items
//     var modes = ["Budget", "Value", "Agile", "Default", "Personalized"];

//     modes.splice(modes.indexOf(selectedMode), 1); // Remove the selected mode

//     var dropdownMenu = document.querySelector(".dropdown-menu");
//     dropdownMenu.innerHTML = ""; // Clear the dropdown
//     for (var i = 0; i < modes.length; i++) {
//       var li = document.createElement("li");
//       var a = document.createElement("a");
//       a.textContent = modes[i];
//       a.classList.add("dropdown-item");
//       a.href = "#";
//       a.addEventListener("click", function (event) {
//         updateModeAndPrice(event.target.textContent.trim());
//       });
//       li.appendChild(a);
//       dropdownMenu.appendChild(li);
//     }

//     // Call resetServices before transforming to the new mode
//     resetServices();
//     // Call onModeChange to handle the mode change and synchronize developmentPackData
//     onModeChange(selectedMode.toLowerCase());
//     transformServicesToMode(selectedMode.toLowerCase());
//   }
// }

// For testing: Set a dummy token directly in localStorage
// Initial dummy token for testing
var bearerToken = {
  tokens: "example",
  expiry: Date.now() + 3 * 60 * 60 * 1000,
};

// Function to update the bearerToken globally
function setBearerToken(newToken) {
  bearerToken = newToken;
  console.log("Global bearerToken set to:", bearerToken);
}

function signupShoppingCartSpecificFunctions() {
  function renderCollectedData() {
    // Fetch generalPackData and tokenData from localStorage
    var generalPackData =
      JSON.parse(localStorage.getItem("generalPackData")) || {};
    var tokenData = JSON.parse(localStorage.getItem("tokenData")) || {};

    // Update UI elements
    if (document.getElementById("price")) {
      document.getElementById("price").textContent =
        "U$ " + (generalPackData.totalPrice || "0.00");
    }
    if (document.getElementById("totalprice")) {
      document.getElementById("totalprice").textContent =
        "U$ " + (generalPackData.totalPrice || "0.00");
    }
    if (document.getElementById("tokens")) {
      document.getElementById("tokens").textContent =
        "tokens " + (tokenData.tokens || "0");
    }
    if (document.getElementById("items")) {
      document.getElementById("items").textContent =
        "items " + (generalPackData.itemCount || "0");
    }
    if (document.getElementById("tokenPrice")) {
      // Assuming tokenPrice is a property in tokenData
      document.getElementById("tokenPrice").textContent =
        "U$ " + (tokenData.additionalPrice || "0.00");
    }

    if (document.getElementById("mode")) {
      // Assuming tokenPrice is a property in tokenData
      document.getElementById("mode").textContent = generalPackData.mode;
    }
  }

  renderCollectedData();

  function createFormSuccessElement(message) {
    var element = document.createElement("div");
    element.classList.add("w-form-done");
    element.setAttribute("role", "region");
    element.setAttribute("aria-label", "Email Form success");
    element.innerHTML = `<div>${message}</div>`;
    element.style.display = "block";
    element.style.margin = "10px 0 0 0"; // Top margin of 10px
    element.style.borderRadius = "15px"; // Border radius of 15px
    return element;
  }

  document
    .getElementById("email-form")
    .addEventListener("submit", function (event) {
      var password = document.getElementById("password").value;
      var confirmPassword = document.getElementById("confirmPassword").value;
      var formFail = document.querySelector(".w-form-fail");
      var formSuccess = document.querySelector(".w-form-done");

      console.log("Form submitted. Validating...");

      // Reset display
      formFail.style.display = "none";
      formSuccess.style.display = "none";

      if (password.length < 8) {
        console.log("Password too short.");
        formFail.innerHTML = "Password must be at least 8 characters long.";
        formFail.style.display = "block";
      } else if (password !== confirmPassword) {
        console.log("Passwords do not match.");
        formFail.innerHTML = "Passwords do not match.";
        formFail.style.display = "block";
      } else {
        var username = document.getElementById("name").value; // Assuming you have an input field for username
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;

        // Create the user data object
        var userData = {
          username: username,
          email: email,
          password: password,
        };

        console.log("Sending data to the server ...", userData);

        // Send the data to the server
        fetch("http://localhost:5000/api/users/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        })
          .then((response) => {
            console.log("Response received", response);
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            // Assuming 'success' is a boolean property in your response
            formSuccess.style.display = "block"; // Show the formSuccess element
            formFail.style.display = "none"; // Hide the formFail element
            console.log("Success:", data);
            formSuccess.innerHTML =
              "Thank you! Your submission has been received!"; // Update success message

            // Store the token in localStorage
            const tokenExpiryTime = new Date().getTime() + 3 * 60 * 60 * 1000;
            const tokenData = {
              token: data.token,
              expiry: tokenExpiryTime,
            };
            localStorage.setItem("bearerToken", JSON.stringify(tokenData));
            console.log(
              "Updated token:",
              JSON.parse(localStorage.getItem("bearerToken"))
            );

            // Delay before redirecting to confirmation page
            setTimeout(() => {
              window.location.href = "confirm-page.html"; // Use relative path for redirection
            }, 2000); // Delay for 2 seconds
          })
          .catch((error) => {
            console.error("Error:", error);
            document.querySelector(".w-form-fail").style.backgroundColor =
              "#f1807e";
            document.querySelector(".w-form-fail").innerHTML =
              "This user either already exists or the email is invalid.";
          });
      }
    });
}

function confirmPageSpecificFunctions() {
  function generateRandomCode() {
    return Math.floor(100000 + Math.random() * 900000);
  }

  function sendEmail(email, name, code) {
    // Create HTML email content with inline CSS
    var emailContent = ` 
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="utf-8">
    <title>Confirm your email</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Inter+Display:wght@400;700&family=Rubik:wght@400;700&display=swap" rel="stylesheet">
    <script>
    (function (emailjs) {
      emailjs.init("jFCMpAWHOU9tyzeB8");
    })();
    </script>
    </head>

    <body>
        <div style="
        font-family: Rubik, sans-serif;
        padding: 2em;
        color: #8080805e;
        width: 80%;
        max-width: 600px;
        margin: 0 auto;
        background-color: #9e9e9e0d;
        border-radius: 20px;
    ">
    <p style="
    font-size: 1.3em;
    text-align: center;
    font-family: Rubik, sans-serif;
    margin-top: 3em;
    ">
    Hi, ${name}
    </p>
    <h1 style="
            color: #333333b5;
            text-align: center;
            font-family: Rubik, sans-serif;
            font-size: 2.5em;
            
        ">
        Welcome to CreativeBox
    </h1>
    <p style="
            font-size: 1.3em;
            text-align: center;
            font-family: Rubik, sans-serif;
        ">
        Use this verification code to complete your signup.
    </p>
    <p style="
            font-size: 1.75em;
            color: gray;
            text-align: center;
            font-family: Rubik, sans-serif;
        ">
        ${code}
    </p>
    <p style="
            font-size: 1em;
            text-align: center;
            font-family: Rubik, sans-serif;
        ">
        Please paste the code in the confirmation page in your browser.
    </p>
    <img src="https://static.dribbble.com/users/1518948/screenshots/8087880/media/856c70fbb729e8d76dd88112d2b77b02.jpg" alt="Styled Image" style="
            display: block;
            margin: 2em auto;
            max-width: 100%;
            height: auto;
            border-radius: 20px;
        ">
        <p style="
        font-size: 1em;
        text-align: center;
        font-family: Rubik, sans-serif;
    ">
    If you dident request this email, please ignore it or contact support.
    </p>
    </div>
    </div>
    </body>
    </html>
    
    `;

    // Simulate sending email
    console.log(emailContent);
    return emailContent;
  }

  function getUserEmail() {
    fetch("http://localhost:5000/api/users/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + bearerToken, // Assuming bearerToken is available
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("User email:", data.email);
        return data.email;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function getUserName() {
    return fetch("http://localhost:5000/api/users/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + bearerToken, // Assuming bearerToken is available
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("User name:", data.username);
        return data.username;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function logBearerToken() {
    var tokenDataString = localStorage.getItem("bearerToken");
    if (tokenDataString) {
      var tokenData = JSON.parse(tokenDataString);
      console.log("Bearer Token:", tokenData.token);
    } else {
      console.log("No bearer token found in localStorage.");
    }
    return tokenData.token;
  }

  bearerToken = logBearerToken();

  function renderCollectedData() {
    // Fetch generalPackData and tokenData from localStorage
    var generalPackData =
      JSON.parse(localStorage.getItem("generalPackData")) || {};
    var tokenData = JSON.parse(localStorage.getItem("tokenData")) || {};

    document.querySelector("#service1price").innerHTML =
      "U$ " + developmentPackData.totalPrice;
    document.querySelector("#service2price").innerHTML =
      "U$ " + designPackData.totalPrice;
    document.querySelector("#service3price").innerHTML =
      "U$ " + marketingPackData.totalPrice;

    // Update UI elements
    if (document.getElementById("price")) {
      document.getElementById("price").textContent =
        "U$ " + (generalPackData.totalPrice || "0.00");
    }
    if (document.getElementById("totalprice")) {
      document.getElementById("totalprice").textContent =
        "U$ " + (generalPackData.totalPrice || "0.00");
    }
    if (document.getElementById("tokens")) {
      document.getElementById("tokens").textContent =
        "tokens " + (tokenData.tokens || "0");
    }
    if (document.getElementById("items")) {
      document.getElementById("items").textContent =
        "items " + (generalPackData.itemCount || "0");
    }
    if (document.getElementById("tokenPrice")) {
      // Assuming tokenPrice is a property in tokenData
      document.getElementById("tokenPrice").textContent =
        "U$ " + (tokenData.additionalPrice || "0.00");
    }

    if (document.getElementById("mode")) {
      // Assuming tokenPrice is a property in tokenData
      document.getElementById("mode").textContent = generalPackData.mode;
    }
  }

  function confirmPageSpecificFunctions() {
    // ... existing renderCollectedData function ...

    function confirmMail() {
      document.querySelector("#popup").style.display = "block";
      document.querySelector("#main-content").style.filter = "blur(20px)";
    }

    // window.onload = function () {
    //   setTimeout(confirmMail, 1500);
    //   var code = generateRandomCode();

    //   var userEmail = Promise.all([getUserName(), getUserEmail()]).then(
    //     ([username, email]) => {
    //       // 'username' and 'email' are now available and can be used as arguments in the 'sendEmail()' function
    //       var userEmail = sendEmail(email, username, code);
    //       return [userEmail, email, username, code];
    //     }
    //   );

    //   userEmailContent = userEmail[0];
    //   email = userEmail[1];
    //   username = userEmail[2];
    //   code = userEmail[3];
    // };

    function createServiceList(packData) {
      var ul = document.createElement("ul");
      ul.id = "service-list-" + packData; // Unique ID for each service list
      ul.style.listStyleType = "none";

      var packDataObject = JSON.parse(localStorage.getItem(packData)) || {};

      if (packDataObject.selectedServices) {
        packDataObject.selectedServices.forEach(function (service) {
          var li = document.createElement("li");
          li.textContent = service;
          ul.appendChild(li);
        });
      }

      return ul;
    }

    function toggleServiceList(arrowSelector, packData) {
      var arrow = document.querySelector(arrowSelector);
      var existingList = document.getElementById("service-list-" + packData);

      if (existingList) {
        existingList.remove();
        arrow.innerHTML = "&#9660;";
      } else {
        var serviceList = createServiceList(packData);
        arrow.parentNode.insertBefore(serviceList, arrow.nextSibling);
        arrow.innerHTML = "&#9650;";
      }
    }

    // Attach the event listeners to the arrows
    var arrows = [".arrow", ".arrow1", ".arrow2"];
    var packDataKeys = [
      "developmentPackData",
      "designPackData",
      "marketingPackData",
    ];

    arrows.forEach(function (arrowSelector, index) {
      var arrow = document.querySelector(arrowSelector);
      if (arrow) {
        arrow.addEventListener("click", function () {
          toggleServiceList(arrowSelector, packDataKeys[index]);
        });
      }
    });

    renderCollectedData();
  }

  var modeIdMap = {
    Budget: "654d60f088cd0fb688dce115",
    Value: "654d60f088cd0fb688dce116",
    Agile: "654d60f088cd0fb688dce117",
    Default: "654d60f088cd0fb688dce118",
    Personalized: "654d60f088cd0fb688dce119",
  };

  var generalPackData =
    JSON.parse(localStorage.getItem("generalPackData")) || {};
  var selectedModeName = generalPackData.mode;
  var selectedModeId = modeIdMap[selectedModeName];

  var developmentPackData =
    JSON.parse(localStorage.getItem("developmentPackData")) || {};
  var designPackData = JSON.parse(localStorage.getItem("designPackData")) || {};
  var marketingPackData =
    JSON.parse(localStorage.getItem("marketingPackData")) || {};

  var selectedPacks = [];
  if (developmentPackData.totalPrice > 0) selectedPacks.push("Development");
  if (designPackData.totalPrice > 0) selectedPacks.push("Design");
  if (marketingPackData.totalPrice > 0) selectedPacks.push("Marketing");

  var packIdMap = {
    Development: "654fda0a9337a38aa21c54be",
    Design: "654fda0b9337a38aa21c5505",
    Marketing: "654fda0b9337a38aa21c553f",
  };

  function selectPacks() {
    selectedPacks.forEach((packName) => {
      var packId = packIdMap[packName];
      var url = "http://localhost:5000/api/packs/select/" + packId;

      fetch(url, {
        method: "POST", // Adjust if needed
        headers: {
          Authorization: "Bearer " + bearerToken,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              "Network response was not ok for pack: " + packName
            );
          }
          return response.json();
        })
        .then((data) => {
          console.log("Pack selected successfully:", data);
          // Additional actions after successful selection
        })
        .catch((error) => {
          console.error("Error selecting pack " + packName + ":", error);
        });
    });
  }

  // Attach this function to a relevant event, such as a button click

  function selectMode() {
    var url = "http://localhost:5000/api/modes/select/" + selectedModeId;

    fetch(url, {
      method: "POST", // or "GET", depending on your API requirement
      headers: {
        Authorization: "Bearer " + bearerToken,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Mode selected successfully:", data);
        // Additional actions after successful mode selection
      })
      .catch((error) => {
        console.error("Error selecting mode:", error);
      });
  }

  // Attach this function to your confirm button
  document
    .getElementById("confirmButton")
    .addEventListener("click", selectMode);

  confirmPageSpecificFunctions();
}

// Function to replace the current history entry
function replaceHistory(url) {
  history.replaceState(null, null, url);
}

// Function to push a new history entry
function pushHistory(url) {
  history.pushState(null, null, url);
}

// Function to handle the special navigation case
function handleSpecialNavigation() {
  const currentPage = window.location.pathname.split("/").pop();

  if (currentPage === "tokens.html") {
    // When navigating to shoppingcart.html from tokens.html
    document.querySelectorAll('a[href="shoppingcart.html"]').forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        replaceHistory("shoppingcart.html");
        window.location.href = "shoppingcart.html";
      });
    });
  } else if (currentPage === "shoppingcart.html") {
    // On shoppingcart.html load, push mode.html into the history
    window.onload = function () {
      pushHistory("mode.html");
    };

    // Handle the back button
    window.onpopstate = function (event) {
      window.location.href = "mode.html";
    };
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const currentPage = window.location.pathname.split("/").pop();

  switch (currentPage) {
    case "mode.html":
      modeSpecificFunctions(globalFunctions);

      break;
    case "pack.html":
      console.log(selectedOptionsFromMode, developmentPackData, designPackData);

      packSpecificFunctions(
        globalFunctions,
        selectedOptionsFromMode,
        developmentPackData,
        designPackData
      );

      break;
    case "tokens.html":
      tokensSpecificFunctions();
      // Add navigation handling for tokens.html
      document
        .querySelectorAll('a[href="shoppingcart.html"]')
        .forEach((link) => {
          link.addEventListener("click", (e) => {
            e.preventDefault();
            history.replaceState(null, null, "shoppingcart.html");
            window.location.href = "shoppingcart.html";
          });
        });
      break;
    case "development-pack.html":
      developmentPackSpecificFunctions(selectedOptionsFromMode);
      console.log("development-pack.html specific functions executed");
      break;

    case "design-pack.html":
      designPackSpecificFunctions(selectedOptionsFromMode);
      console.log("design.html specific functions executed");
      break;

    case "marketing-pack.html":
      marketingPackSpecificFunctions(selectedOptionsFromMode);
      console.log("marketing-pack.html specific functions executed");
      break;

    case "signup-shopping-cart.html":
      signupShoppingCartSpecificFunctions();
      console.log("signup-shopping-cart.html specific functions executed");

      // Move pushHistory outside of window.onload
      pushHistory("mode.html");

      window.onpopstate = function (event) {
        window.location.href = "mode.html";
      };
      break;

    case "confirm-page.html":
      confirmPageSpecificFunctions();

      console.log("signup-shopping-cart.html specific functions executed");
      break;
    default:
      // Execute any default or shared functionalities
      console.log("Default or shared functionalities executed");
  }
});

// document.addEventListener("DOMContentLoaded", function () {
//   selectModes();
//   // // Call the function to modify elements for sold out services
//   soldOut();

//   // Set up event listeners for UI interactions
//   PackEvents();

//   iframeDesign();

//   // Initialize token range and slider for a specific mode
//   // Assuming 'default' is the mode you want to start with
//   setTokenRangeForMode("default");

//   // Attach the slider listener
//   attachSliderListener();

//   // If you have other initializations, add them here

//   // When the DOM is fully loaded, call the function

//   updatePriceBasedOnTokens();
// });
