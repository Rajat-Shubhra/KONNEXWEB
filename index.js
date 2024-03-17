
const API_URL = 'https://kdss.konnexions.dev/simulation/devices'; 
 
const sliders = document.querySelectorAll('.device-slider');
const ledSwitch = document.querySelector('.switch input[data-device="led_strip"]'); // Assuming LED switch
const colorPicker = document.getElementById('led-color-picker');
const ledPowerButton = document.getElementById('led-power-button');
const acPowerButton = document.getElementById('ac-power-button');
const acTempUpButton = document.getElementById('ac-temp-up');
const acTempDownButton = document.getElementById('ac-temp-down');
const acTempDisplay = document.getElementById('ac-temp-display');


function acPowerButton(){
    let isOn = acPowerButton.classList.contains("active");
}
async function fetchData() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json(); // Parse JSON response
    console.log(data); // Your API data
  } catch (error) {
    console.error('API Error:', error);
  }
}

fetchData();


// function sendAPIRequest(endpoint, method, data = null) {
//   return fetch(`https://kdss.konnexions.dev/simulation/devices/SgkhbB`, {
//     method:,
//     headers: {
//       'Content-Type': 'application/json', // Adjust if necessary based on API requirements
//       // Add authorization headers if required by the API
//     },
//     body: data ? JSON.stringify(data) : null,
//   })
//   .then(response => response.json())
//   .catch(error => console.error('API Error:', error));
// }

// const API_URL = 'https://kdss.konnexions.dev/simulation/devices/SgkhbB';

// ... other code elements (sliders, buttons, etc.)


const fs = require('fs');
function readFanSpeedData() {
  try {
    const data = fs.readFileSync('fan_speed_data.json', 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading fan speed data:', error);
    return null; // Handle errors gracefully, provide defaults if needed
  }
} 

// const API_URL = 'https://kodessphere-api.vercel.app/devices'; // Replace with your API URL
const API_HEADERS = { 'Content-Type': 'application/json' }; // Adjust headers if necessary

function sendFanSpeedRequest(newSpeed) {
    const data = { speed: newSpeed }; // Prepare JSON data to send
  
    fetch(`https://kodessphere-api.vercel.app/devices`, {
      method: 'POST',
      headers: API_HEADERS,
      body: JSON.stringify(data)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("API request failed with status ${response.status}");
      }
      console.log('Fan speed change request successful!');
    })
    .catch(error => {
      console.error('Error sending fan speed request:', error);
    });
  }


function sendAPIRequest(endpoint, method, data = null) {
  return fetch(`https://kdss.konnexions.dev/simulation/devices/SgkhbB`, {
    method,
    headers: {
      'Content-Type': 'application/json', // Adjust if necessary based on API requirements
      // Add authorization headers if required by the API
    },
    body: data ? JSON.stringify(data) : null,
  })
    .then(response => response.json())
    .catch(error => console.error('API Error:', error));
}

// Handle LED brightness slider change
const brightnessSlider = document.getElementById('led-brightness-slider');

brightnessSlider.addEventListener('input', async () => {
  const brightness = brightnessSlider.value; // Get the new brightness value

  try {
    const response = await sendAPIRequest('/led-brightness', 'POST', { brightness }); // Assuming the API endpoint is '/led-brightness' and expects 'brightness' in the request body

    if (response.success) {
      console.log('LED brightness updated successfully!');

    } else {
      console.error('API Error:', response.error);

    }
  } catch (error) {
    console.error('Error:', error);
  }
});


function updateSliderValue(slider, value) {
  slider.value = value;
  const sliderValueElement = slider.nextElementSibling;
  sliderValueElement.textContent = ${value}%;
}


function updateACDisplay(temperature) {
  acTempDisplay.textContent = ${temperature}°C;
}


// Handle slider changes
sliders.forEach(slider => {
  slider.addEventListener('input', async () => {
    const device = slider.dataset.device;
    const value = slider.value;
    const data = { value }; // Assuming the API expects a "value" property


    const response = await sendAPIRequest(devices/${device}, 'PUT', data);
    if (response.success) {
      updateSliderValue(slider, value);
    } else {
      console.error('API Error:', response.error);
      // Implement error handling UI (e.g., toast notification)
    }
  });
});


// Handle LED switch
ledSwitch.addEventListener('change', async () => {
  const device = 'led_strip'; // Assuming 'led_strip' is the correct device name
  const state = ledSwitch.checked ? 'on' : 'off';
  const data = { state }; // Assuming the API expects a "state" property


  const response = await sendAPIRequest(devices/${device}, 'PUT', data);
  if (response.success) {
    // Update UI based on switch state (e.g., change LED icon)
  } else {
    console.error('API Error:', response.error);
    // Implement error handling UI
  }
});


// Handle LED color picker
colorPicker.addEventListener('change', async () => {
  const device = 'led_strip'; // Assuming 'led_strip' is the correct device name
  const color = colorPicker.value;
  const data = { color }; // Assuming the API expects a "color" property


  const response = await sendAPIRequest(devices/${device}, 'PUT', data);
  if (response.success) {
    // Update LED strip preview color (optional)
  } else {
    console.error('API Error:', response.error);
    // Implement error handling UI
  }
});


// Handle LED power button
ledPowerButton.addEventListener('click', async () => {
  const device = 'led_strip'; // Assuming 'led_strip' is the correct device name
  const state = ledPowerButton.textContent === 'Off' ? 'on' : 'off';
  const data = { state }; // Assuming the API expects a "state" property


  try {
    const response = await sendAPIRequest(devices/${device}, 'PUT', data);
    if (response.success) {
      ledPowerButton.textContent = state === 'on' ? 'Off' : 'On'; // Update button text
      // Optionally update other UI elements (e.g., LED icon)
      console.log('LED state updated successfully!');
    } else {
      console.error('API Error:', response.error);
      // Implement error handling UI (e.g., toast notification)
    }
    } catch (err) {
        console.error("Error sending request", err);
    }
});