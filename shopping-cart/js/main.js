document.getElementById("learnMoreBtn").addEventListener("click", function () {
  // Show the modal
  document.getElementById("modal").style.display = "block";
  // Apply the blur effect to the main content
  document.getElementById("main-content").classList.add("blur-effect");
});

document.querySelector(".close-btn").addEventListener("click", function () {
  // Hide the modal
  document.getElementById("modal").style.display = "none";
  // Remove the blur effect from the main content
  document.getElementById("main-content").classList.remove("blur-effect");
});

document.getElementById("learnMoreBtn2").addEventListener("click", function () {
  // Show the modal
  document.getElementById("modal").style.display = "block";
  // Apply the blur effect to the main content
  document.getElementById("main-content").classList.add("blur-effect");
});

document.querySelector(".close-btn").addEventListener("click", function () {
  // Hide the modal
  document.getElementById("modal").style.display = "none";
  // Remove the blur effect from the main content
  document.getElementById("main-content").classList.remove("blur-effect");
});

document.getElementById("learnMoreBtn3").addEventListener("click", function () {
  // Show the modal
  document.getElementById("modal").style.display = "block";
  // Apply the blur effect to the main content
  document.getElementById("main-content").classList.add("blur-effect");
});

document.querySelector(".close-btn").addEventListener("click", function () {
  // Hide the modal
  document.getElementById("modal").style.display = "none";
  // Remove the blur effect from the main content
  document.getElementById("main-content").classList.remove("blur-effect");
});

document.getElementById("learnMoreBtn4").addEventListener("click", function () {
  // Show the modal
  document.getElementById("modal").style.display = "block";
  // Apply the blur effect to the main content
  document.getElementById("main-content").classList.add("blur-effect");
});

document.querySelector(".close-btn").addEventListener("click", function () {
  // Hide the modal
  document.getElementById("modal").style.display = "none";
  // Remove the blur effect from the main content
  document.getElementById("main-content").classList.remove("blur-effect");
});

// iframe

var width = screen.width;
console.log("Screen width:", width);

var iframe = document.querySelector(".iframe-style");

if (width >= 920 && iframe) {
  var heightValue = width * 0.675; // 37.5% of the width
  console.log("67.5% of width:", heightValue);

  var newHeight = width - heightValue;
  console.log("New height:", newHeight);

  iframe.style.height = newHeight + "px"; // Assigning with units
} else if (width <= 920) {
  var btn = document.querySelector(".BUTTON_RDV111");
  btn.style.display = "inline-block";
  iframe.style.display = "none";
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

// pages functionality

let i = 1;

console.log(i);

var fowardMotion = document.querySelectorAll(".foward");

for (let i = 0; i <= 1; i++) {
  fowardMotion[i].addEventListener("click", function (event) {
    IncludedInpageShop = IncludedInpageShop + 1;
  });
}
