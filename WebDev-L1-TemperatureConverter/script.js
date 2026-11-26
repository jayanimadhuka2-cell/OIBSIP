
/* ==========================================
   THERMORA - TEMPERATURE CONVERTER
   Complete JavaScript Functionality
========================================== */


// ==========================================
// 1. GET HTML ELEMENTS
// ==========================================

const converterForm = document.getElementById("converterForm");

const temperatureInput = document.getElementById("temperatureInput");
const unitSelect = document.getElementById("unitSelect");

const inputError = document.getElementById("inputError");
const inputSymbol = document.getElementById("inputSymbol");

const clearButton = document.getElementById("clearButton");
const resultStatus = document.getElementById("resultStatus");

const celsiusResult = document.getElementById("celsiusResult");
const fahrenheitResult = document.getElementById("fahrenheitResult");
const kelvinResult = document.getElementById("kelvinResult");

const celsiusCard = document.getElementById("celsiusCard");
const fahrenheitCard = document.getElementById("fahrenheitCard");
const kelvinCard = document.getElementById("kelvinCard");

const themeToggle = document.getElementById("themeToggle");
const mobileMenu = document.getElementById("mobileMenu");
const navigation = document.querySelector(".navigation");


// ==========================================
// 2. CONSTANTS
// ==========================================

const ABSOLUTE_ZERO_C = -273.15;
const ABSOLUTE_ZERO_F = -459.67;
const ABSOLUTE_ZERO_K = 0;

const UNIT_SYMBOLS = {
    celsius: "°C",
    fahrenheit: "°F",
    kelvin: "K"
};


// ==========================================
// 3. TEMPERATURE CONVERSION FORMULAS
// ==========================================

// Celsius to Fahrenheit
function celsiusToFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
}


// Fahrenheit to Celsius
function fahrenheitToCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}


// Celsius to Kelvin
function celsiusToKelvin(celsius) {
    return celsius + 273.15;
}


// Kelvin to Celsius
function kelvinToCelsius(kelvin) {
    return kelvin - 273.15;
}


// ==========================================
// 4. INPUT VALIDATION
// ==========================================

function validateInput(value, unit) {

    // Check empty input
    if (value.trim() === "") {
        return "Please enter a temperature value.";
    }

    // Accept ordinary decimal numbers and scientific notation
   const numericPattern = /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i;;

    if (!numericPattern.test(value.trim())) {
        return "Invalid input! Please enter a valid numeric value.";
    }

    const temperature = Number(value);

    // Check finite numeric value
    if (!Number.isFinite(temperature)) {
        return "Please enter a valid temperature number.";
    }

    // Celsius absolute zero validation
    if (unit === "celsius" && temperature < ABSOLUTE_ZERO_C) {
        return "Temperature cannot be below absolute zero (-273.15 °C).";
    }

    // Fahrenheit absolute zero validation
    if (unit === "fahrenheit" && temperature < ABSOLUTE_ZERO_F) {
        return "Temperature cannot be below absolute zero (-459.67 °F).";
    }

    // Kelvin absolute zero validation
    if (unit === "kelvin" && temperature < ABSOLUTE_ZERO_K) {
        return "Kelvin cannot be negative. The minimum is 0 K.";
    }

    return "";
}


// ==========================================
// 5. CONVERT ALL TEMPERATURE UNITS
// ==========================================

function convertTemperature(value, unit) {

    let celsius;

    // First convert the selected unit into Celsius
    switch (unit) {

        case "celsius":
            celsius = value;
            break;

        case "fahrenheit":
            celsius = fahrenheitToCelsius(value);
            break;

        case "kelvin":
            celsius = kelvinToCelsius(value);
            break;

        default:
            throw new Error("Unknown temperature unit.");
    }

    // Convert Celsius into the other units
    const fahrenheit = celsiusToFahrenheit(celsius);
    const kelvin = celsiusToKelvin(celsius);

    return {
        celsius: celsius,
        fahrenheit: fahrenheit,
        kelvin: kelvin
    };
}


// ==========================================
// 6. FORMAT TEMPERATURE VALUES
// ==========================================

function formatTemperature(value) {

    // Avoid displaying negative zero
    if (Math.abs(value) < 0.0000001) {
        value = 0;
    }

    return value.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}


// ==========================================
// 7. DISPLAY CONVERSION RESULTS
// ==========================================

function displayResults(results, selectedUnit) {

    // Display Celsius
    celsiusResult.textContent =
        formatTemperature(results.celsius) + " °C";

    // Display Fahrenheit
    fahrenheitResult.textContent =
        formatTemperature(results.fahrenheit) + " °F";

    // Display Kelvin
    kelvinResult.textContent =
        formatTemperature(results.kelvin) + " K";


    // Remove previous highlights
    celsiusCard.classList.remove("active-result");
    fahrenheitCard.classList.remove("active-result");
    kelvinCard.classList.remove("active-result");


    // Highlight the selected input unit
    if (selectedUnit === "celsius") {
        celsiusCard.classList.add("active-result");
    }

    else if (selectedUnit === "fahrenheit") {
        fahrenheitCard.classList.add("active-result");
    }

    else if (selectedUnit === "kelvin") {
        kelvinCard.classList.add("active-result");
    }


    // Show success message
    resultStatus.textContent =
        "✓ Temperature converted successfully!";

    resultStatus.className = "result-status success";
}


// ==========================================
// 8. RESET CONVERSION RESULTS
// ==========================================

function resetResults() {

    celsiusResult.textContent = "-- °C";
    fahrenheitResult.textContent = "-- °F";
    kelvinResult.textContent = "-- K";

    celsiusCard.classList.remove("active-result");
    fahrenheitCard.classList.remove("active-result");
    kelvinCard.classList.remove("active-result");

    resultStatus.textContent =
        "Enter a temperature and click Convert to see your results.";

    resultStatus.className = "result-status";
}


// ==========================================
// 9. DISPLAY INPUT ERRORS
// ==========================================

function showError(message) {

    // Display error message
    inputError.textContent = message;

    // Highlight input field
    const inputBox = temperatureInput.closest(".input-box");
    inputBox.classList.add("has-error");

    // Reset previous results
    resetResults();

    // Display error status
    resultStatus.textContent =
        "Please correct the input and try again.";

    resultStatus.className = "result-status error";
}


// ==========================================
// 10. CLEAR INPUT ERRORS
// ==========================================

function clearError() {

    inputError.textContent = "";

    const inputBox = temperatureInput.closest(".input-box");

    inputBox.classList.remove("has-error");
}


// ==========================================
// 11. CONVERT BUTTON EVENT
// ==========================================

converterForm.addEventListener("submit", function(event) {

    // Prevent browser page refresh
    event.preventDefault();

    const inputValue = temperatureInput.value.trim();
    const selectedUnit = unitSelect.value;

    // Validate input
    const error = validateInput(inputValue, selectedUnit);

    if (error !== "") {

        showError(error);

        return;
    }

    // Clear old error messages
    clearError();

    // Convert input into a number
    const temperature = Number(inputValue);

    // Perform conversion
    const results = convertTemperature(
        temperature,
        selectedUnit
    );

    // Display all three results
    displayResults(results, selectedUnit);

});


// ==========================================
// 12. UPDATE INPUT UNIT SYMBOL
// ==========================================

function updateInputSymbol() {

    const selectedUnit = unitSelect.value;

    inputSymbol.textContent = UNIT_SYMBOLS[selectedUnit];

}


// ==========================================
// 13. REAL-TIME INPUT VALIDATION
// ==========================================

temperatureInput.addEventListener("input", function() {

    const inputValue = temperatureInput.value.trim();

    clearError();

    // Clear old results when the user changes the input
    resetResults();

    // Do not display an error while the field is empty
    if (inputValue === "") {
        return;
    }

    const error = validateInput(inputValue, unitSelect.value);

    if (error !== "") {

        inputError.textContent = error;

        const inputBox = temperatureInput.closest(".input-box");

        inputBox.classList.add("has-error");

        resultStatus.textContent = "Please check your temperature input.";

        resultStatus.className = "result-status error";
    }

});


// ==========================================
// 14. UNIT SELECTOR EVENT
// ==========================================

unitSelect.addEventListener("change", function() {

    // Update Celsius / Fahrenheit / Kelvin symbol
    updateInputSymbol();

    // Remove old error
    clearError();

    // Clear previous results
    resetResults();

    const inputValue = temperatureInput.value.trim();

    if (inputValue === "") {
        return;
    }

    // Validate the same number using the new unit
    const error = validateInput(inputValue, unitSelect.value);

    if (error !== "") {

        inputError.textContent = error;

        const inputBox = temperatureInput.closest(".input-box");

        inputBox.classList.add("has-error");

        resultStatus.textContent = "Please check the selected unit and value.";

        resultStatus.className = "result-status error";
    }

});


// ==========================================
// 15. CLEAR BUTTON EVENT
// ==========================================

clearButton.addEventListener("click", function() {

    // Reset input
    temperatureInput.value = "";

    // Reset unit to Celsius
    unitSelect.value = "celsius";

    // Reset input symbol
    updateInputSymbol();

    // Clear errors
    clearError();

    // Reset result cards
    resetResults();

    // Focus on input field
    temperatureInput.focus();

});


// ==========================================
// 16. LIGHT / DARK THEME TOGGLE
// ==========================================

themeToggle.addEventListener("click", function() {

    document.body.classList.toggle("light-theme");

});


// ==========================================
// 17. MOBILE NAVIGATION MENU
// ==========================================

mobileMenu.addEventListener("click", function() {

    navigation.classList.toggle("show-menu");

});


// Close mobile menu when a navigation link is clicked
const navigationLinks = document.querySelectorAll(".nav-link");

navigationLinks.forEach(function(link) {

    link.addEventListener("click", function() {

        navigation.classList.remove("show-menu");

    });

});


// ==========================================
// 18. INITIALIZE WEBSITE
// ==========================================

updateInputSymbol();

resetResults();

console.log("THERMORA Temperature Converter loaded successfully!");
