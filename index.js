const API_URL = 'https://kdss.konnexions.dev/simulation/devices/SgkhbB'; 

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

function sendAPIRequest(endpoint, method, data = null) {
  return fetch(, {
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