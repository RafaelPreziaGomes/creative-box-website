document.addEventListener("DOMContentLoaded", function () {
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
      document.getElementById("modal-doc").style.display = "block";
      // Apply the blur effect to the main content
      document.getElementById("main-content").classList.add("blur-effect");
      document.body.style.overflow = "hidden";
      hideCursorClasses();
    });

  document
    .querySelector(".close-btn-doc")
    .addEventListener("click", function () {
      // Hide the modal
      document.getElementById("modal-doc").style.display = "none";
      // Remove the blur effect from the main content
      document.getElementById("main-content").classList.remove("blur-effect");
      document.body.style.overflow = "auto";
      showCursorClasses();
    });

  document
    .getElementById("learnMoreBtn2")
    .addEventListener("click", function () {
      // Show the modal
      document.getElementById("modal-doc2").style.display = "block";
      // Apply the blur effect to the main content
      document.getElementById("main-content").classList.add("blur-effect");
      document.body.style.overflow = "hidden";
      hideCursorClasses();
    });

  document
    .querySelector(".close-btn-doc2")
    .addEventListener("click", function () {
      // Hide the modal
      document.getElementById("modal-doc2").style.display = "none";
      // Remove the blur effect from the main content
      document.getElementById("main-content").classList.remove("blur-effect");
      document.body.style.overflow = "auto";
      showCursorClasses();
    });

  document
    .getElementById("learnMoreBtn3")
    .addEventListener("click", function () {
      // Show the modal
      document.getElementById("modal-doc3").style.display = "block";
      // Apply the blur effect to the main content
      document.getElementById("main-content").classList.add("blur-effect");
      document.body.style.overflow = "hidden";
      hideCursorClasses();
    });

  document
    .querySelector(".close-btn-doc3")
    .addEventListener("click", function () {
      // Hide the modal
      document.getElementById("modal-doc3").style.display = "none";
      // Remove the blur effect from the main content
      document.getElementById("main-content").classList.remove("blur-effect");
      document.body.style.overflow = "auto";
      showCursorClasses();
    });

  document
    .getElementById("learnMoreBtn4")
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

  // iframe
  var width = screen.width;
  console.log("Screen width:", width);

  var iframes = document.querySelectorAll("iframe");

  if (width >= 920 && iframes.length > 0) {
    var heightValue = width * 0.675; // 67.5% of the width
    console.log("67.5% of width:", heightValue);

    var newHeight = width - heightValue;
    console.log("New height:", newHeight);

    iframes.forEach(function (iframe) {
      iframe.style.height = newHeight + "px"; // Assigning with units
    });
  } else if (width <= 920) {
    var btns = document.querySelectorAll(".BUTTON_RDV111");
    btns.forEach(function (btn) {
      btn.style.display = "inline-block";
    });

    iframes.forEach(function (iframe) {
      iframe.style.display = "none";
    });
  } else {
    console.log("iframe not found");
  }

  const sliderEl = document.querySelector("#range1");
  const sliderValue = document.querySelector(".value2");

  sliderEl.addEventListener("input", (event) => {
    const tempSliderValue = event.target.value;
    sliderValue.textContent = tempSliderValue;

    const progress = (tempSliderValue / sliderEl.max) * 100;

    sliderEl.style.background = `linear-gradient(to right, #2427ed ${progress}%, #ccc ${progress}%)`;
  });

  // 2

  const sliderEl3 = document.querySelector("#range3");
  const sliderValue3 = document.querySelector(".value3");

  sliderEl3.addEventListener("input", (event) => {
    const tempSliderValue = Number(event.target.value);

    sliderValue3.textContent = tempSliderValue;

    const progress = (tempSliderValue / sliderEl3.max) * 100;

    sliderEl3.style.background = `linear-gradient(to right, #2427ed ${progress}%, #ccc ${progress}%)`;

    sliderEl3.style.setProperty(
      "--thumb-rotate",
      `${(tempSliderValue / 100) * 2160}deg`
    );
  });

  // 2

  const sliderEl4 = document.querySelector("#range4");
  const sliderValue4 = document.querySelector(".value4");

  sliderEl4.addEventListener("input", (event) => {
    const tempSliderValue = event.target.value;
    sliderValue4.textContent = tempSliderValue;

    const progress = (tempSliderValue / sliderEl4.max) * 100;

    sliderEl4.style.background = `linear-gradient(to right, #2427ed ${progress}%, #ccc ${progress}%)`;
  });

  // Add event listeners for Learn More buttons
  for (let i = 1; i <= 4; i++) {
    document
      .getElementById(`learnMoreBtn${i}`)
      .addEventListener("click", function () {
        openModal(`modal-doc${i}`);
      });
  }

  // Add event listeners for close buttons in modals
  let closeButtons = document.querySelectorAll(".close-btn");
  for (let btn of closeButtons) {
    btn.addEventListener("click", function () {
      let modal = btn.closest("[id^='modal-doc']");
      if (modal) {
        closeModal(modal.id);
      }
    });
  }

  (function () {
    // Dictionary to hold the mode and price for each button
    const buttonData = {
      select1_1: { mode: "Buget", price: 149.99 },
      select2_1: { mode: "Agile", price: 499.99 },
      select3_1: { mode: "Default", price: 999.99 },
      select4_1: { mode: "Personalized", price: 1499.99 },
    };

    let selectedButton = null; // Keep track of the currently selected button

    // Function to handle button click
    function handleButtonClick(event) {
      const buttonId = event.target.id;

      // Check if clicked button is in our buttonData dictionary
      if (buttonData.hasOwnProperty(buttonId)) {
        // Deselect the previous button if there was one
        if (selectedButton) {
          selectedButton.style.backgroundColor = ""; // Reset to default color
          // Erase the data of the old button (for now, we'll just log it)
          console.log(`Data of ${selectedButton.id} erased.`);
        }

        // Select the new button
        event.target.style.backgroundColor = "#d3d4d5";
        selectedButton = event.target;

        // Save the mode and price (for now, we'll just log it to the console)
        console.log(
          `Mode: ${buttonData[buttonId].mode}, Price: ${buttonData[buttonId].price}`
        );
      }
    }

    // Attach the event listener to each button
    Object.keys(buttonData).forEach((buttonId) => {
      const button = document.getElementById(buttonId);
      if (button) {
        button.addEventListener("click", handleButtonClick);
      }
    });
  })();
});
