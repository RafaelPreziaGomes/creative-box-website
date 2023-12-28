function sanitizeMode(mode) {
  // Define the allowed modes
  const allowedModes = ["budget", "value", "agile", "default", "personalized"];
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
console.log(`Mode: ${mode}`);

var modePrices = {
  Budget: {
    // Total to reach: 24.99, Original sum: 24.99, Scaling factor: 24.99 / 24.99 = 1
    "Conversion Funnel": 10.0, // No change as the original sum matches the target
    Newsletter: 5.0, // No change
    "Email Marketing": 6.0, // No change
    "Marketing Automation": 3.99, // No change
  },
  Value: {
    // Total to reach: 99.99, Original sum: 102.99, Scaling factor: 99.99 / 102.99
    Website: 35.0,
    Blog: 15.0,
    "Conversion Funnel": 20.0,
    Newsletter: 10.0,
    "Email Marketing": 12.0,
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
    "Email Marketing": 26.28,
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
    "Email Marketing": 31.7,
    "Marketing Automation": 20.55,
    "Conversion Rate Optimization": 26.1,
    Subscriber: 9.45,
    "Application Programming Interface": 30.6,
    "Generative AI": 12.78,
  },

  Personalized: {
    Ecommerce: 194.99,
    Website: 203.7,
    "System Integration": 183.06,
    Blog: 48.53,
    Android: 58.91,
    IPhone: 69.28,
    "Cross-platform_software": 100.25,
    "Progressive Web App": 79.59,
    "Microsoft Windows": 69.28,
    MacOS: 58.91,
    "Command-line Interface": 38.21,
    "Conversion Funnel": 58.91,
    Newsletter: 27.84,
    "Email Marketing": 58.91,
    "Marketing Automation": 38.2,
    "Conversion Rate Optimization": 48.53,
    Subscriber: 17.52,
    "Application Programming Interface": 56.89,
    "Web Application": 87.7,
    "Generative AI": 87.51,
    "Embedded System": 87.61,
    "Generative AI Implementation": 87.29,
  },

  Expensive: {
    // New total to scale towards is arbitrarily chosen for illustrative purposes
    // Current total: 980, New total: 1200, Scaling factor: 1200 / 980
    "Mobile Game": 180.0,
    "Augmented Reality": 180.0,
    "Machine Learning": 180.0,
    "PC Game": 150.0,
    "Deep Learning": 100.0,
    "Natural Language Processing": 100.0,
    "Data Science": 90.0,
  },
};

function calculateTotalPrice(selectedServices, mode) {
  // Convert mode to Title Case since the keys in modePrices are in Title Case
  const formattedMode = mode
    .toLowerCase() // First, make it all lower case
    .replace(/\s/g, "_") // Replace spaces with underscores
    .split("_") // Split by underscores to capitalize first letter of each segment
    .map(capitalizeFirstLetter) // Capitalize the first letter of each segment
    .join("_"); // Rejoin segments with underscores

  // Check if the mode exists in the modePrices object
  if (!modePrices[formattedMode]) {
    throw new Error(`The mode "${mode}" is not available.`);
  }

  let totalPrice = 0;
  // Loop through the selected services and accumulate the total price
  selectedServices.forEach((service) => {
    // Ensure the service name is capitalized
    const formattedService = capitalizeFirstLetter(service);
    // Ensure the service name is exactly as it appears in the modePrices object
    const servicePrice = modePrices[formattedMode][formattedService];
    if (servicePrice) {
      totalPrice += parseFloat(servicePrice);
    } else {
      console.warn(
        `The service "${formattedService}" is not available in the "${formattedMode}" mode.`
      );
    }
  });

  return totalPrice.toFixed(2); // Return the total price, formatted to two decimal places
}

const formattedSelectedServices = selectedServices.map((service) =>
  capitalizeFirstLetter(service)
);
const totalPrice = calculateTotalPrice(
  formattedSelectedServices,
  sanitizeMode(mode)
);

var priceLink = document.querySelector(".nav-link.active");
priceLink.textContent = "Current Price: " + totalPrice;
