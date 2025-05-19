
// Function for auto-erase animation for your name
function typeAndEraseName() {
    const nameDisplay = document.getElementById("name-display");
    const name = "Ayaan ali"; // Replace with your name
    let index = 0;
    let isTyping = true;

    function type() {
        if (isTyping) {
            // Typing phase
            if (index < name.length) {
                nameDisplay.textContent += name.charAt(index);
                index++;
                setTimeout(type, 150); // Typing speed (150ms per character)
            } else {
                // Switch to erasing phase after a delay
                setTimeout(() => {
                    isTyping = false;
                    type();
                }, 2000); // Delay before erasing (2 seconds)
            }
        } else {
            // Erasing phase
            if (index > 0) {
                nameDisplay.textContent = nameDisplay.textContent.slice(0, -1);
                index--;
                setTimeout(type, 100); // Erasing speed (100ms per character)
            } else {
                // Switch back to typing phase after a delay
                setTimeout(() => {
                    isTyping = true;
                    type();
                }, 1000); // Delay before typing again (1 second)
            }
        }
    }

    type(); // Start the animation
}

// Function to append value to the display
function append(value) {
    const displaySpan = document.querySelector("#display span");
    if (displaySpan.textContent === "0" && value !== ".") {
        displaySpan.textContent = value;
    } else {
        displaySpan.textContent += value;
    }
    blinkDisplay(); // Trigger blinking effect
}

// Function to clear the display
function clearDisplay() {
    const displaySpan = document.querySelector("#display span");
    displaySpan.textContent = "0";
}

// Function to delete the last character
function deleteLast() {
    const displaySpan = document.querySelector("#display span");
    if (displaySpan.textContent.length === 1) {
        displaySpan.textContent = "0";
    } else {
        displaySpan.textContent = displaySpan.textContent.slice(0, -1);
    }
}

// Function to add blinking effect to the display text
function blinkDisplay() {
    const displaySpan = document.querySelector("#display span");
    displaySpan.style.animation = "none"; // Reset animation
    setTimeout(() => {
        displaySpan.style.animation = "blink 1s infinite"; // Restart animation
    }, 10);
}
// Call the function when the page loads
window.onload = function () {
    typeAndEraseName(); // Start name animation
};

// Rest of the calculator functions
function playSound() {
    const sound = document.getElementById("click-sound");
    sound.currentTime = 0;
    sound.play();
}

function append(value) {
    const display = document.getElementById("display");
    if (display.textContent === "0" && value !== ".") {
        display.textContent = value;
    } else {
        display.textContent += value;
    }
}

function clearDisplay() {
    const display = document.getElementById("display");
    display.textContent = "0";
}

function deleteLast() {
    const display = document.getElementById("display");
    if (display.textContent.length === 1) {
        display.textContent = "0";
    } else {
        display.textContent = display.textContent.slice(0, -1);
    }
}

function calculate() {
    const display = document.getElementById("display");
    try {
        const result = eval(display.textContent);
        display.textContent = result;
    } catch (error) {
        display.textContent = "Error";
    }
}

// Function to update battery percentage and level
function updateBattery(percentage) {
    const batteryPercentage = document.getElementById("battery-percentage");
    const batteryLevel = document.getElementById("battery-level");

    // Update the battery percentage text
    batteryPercentage.textContent = `${percentage}%`;

    // Update the battery level width
    batteryLevel.style.width = `${percentage}%`;

    // Change battery level color based on percentage
    if (percentage <= 20) {
        batteryLevel.style.background = "linear-gradient(145deg, #ff4444, #ff6666)"; // Red for low battery
    } else if (percentage <= 50) {
        batteryLevel.style.background = "linear-gradient(145deg, #ffbb33, #ffcc66)"; // Yellow for medium battery
    } else {
        batteryLevel.style.background = "linear-gradient(145deg, #4caf50, #81c784)"; // Green for high battery
    }
}

// Function to fetch real-time battery health
function fetchBatteryHealth() {
    if ("getBattery" in navigator) {
        navigator.getBattery().then((battery) => {
            // Update battery level initially
            updateBattery(Math.floor(battery.level * 100));

            // Update battery level when it changes
            battery.addEventListener("levelchange", () => {
                updateBattery(Math.floor(battery.level * 100));
            });

            // Update battery level when charging status changes
            battery.addEventListener("chargingchange", () => {
                updateBattery(Math.floor(battery.level * 100));
            });
        });
    } else {
        // Fallback: Simulate battery level if Battery API is not supported
        console.log("Battery Status API not supported. Simulating battery level.");
        let percentage = 100;
        setInterval(() => {
            percentage = Math.max(0, percentage - 1); // Decrease by 1% every 5 seconds
            updateBattery(percentage);
        }, 5000);
    }
}

// Call the function to initialize the battery display
fetchBatteryHealth();
