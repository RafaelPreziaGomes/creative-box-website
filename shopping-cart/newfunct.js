function addTooltip(element, message) {
  // Create the tooltip element
  const tooltip = document.createElement("div");
  tooltip.className = "tooltip";
  tooltip.innerText = message;
  document.body.appendChild(tooltip);

  // Position the tooltip above the element
  element.addEventListener("mouseover", function (e) {
    const rect = element.getBoundingClientRect();
    tooltip.style.top = rect.top + window.scrollY - tooltip.offsetHeight + "px"; // Removed the -8px offset
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

var ExpensiveMode = [10, 12, 16, 25, 26, 28, 30];

function UselectExpensiveMode(ExpensiveMode) {
  var serviceDivs = document.querySelectorAll(
    ".col-lg-2.col-md-3.col-sm-4.col-6.mb-"
  );
  serviceDivs.forEach((div, index) => {
    const checkbox = div.querySelector(".form-check-input");
    const label = div.querySelector(".form-check-label");
    // We need to check if the index is included in the ExpensiveMode array.
    if (ExpensiveMode.includes(index + 1)) {
      // Assuming the index corresponds to your mode numbers
      checkbox.checked = false; // Otherwise, leave it unchecked mode
      // Add the service-unavailable class and the lock image
      // Add tooltip for available services
      addTooltip(
        div,
        "This premium service is not included by default. Selecting this service will increase your monthly cost."
      );
    } else {
      checkbox.checked = true; // Otherwise, leave it unchecked mode
      addTooltip(
        div,
        "This service is included in your chosen plan. Uncheck the box to remove it and reduce your monthly cost"
      );
    }
  });
}

// To use the function:
UselectExpensiveMode(ExpensiveMode);
