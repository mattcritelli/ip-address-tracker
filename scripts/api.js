// API SETUP
let ipAddress = '8.8.8.8';
const apiUrl = `https://geo.ipify.org/api/v1?apiKey=${apiKey}&ipAddress=${ipAddress}`;

// DOM SELECTORS
const ipEl = document.querySelector('#ip-address');
const locationEl = document.querySelector('#location');
const timezoneEl = document.querySelector('#timezone');
const ispEl = document.querySelector('#isp');

async function fetchIPLocData() {
  const response = await fetch(apiUrl);
  const data = await response.json();
  console.log('data', data);
  updateDisplayWithResponse(data)
}

function updateDisplayWithResponse({
  location,
  isp,
  ip
}) {
  ipEl.innerText = ip;
  locationEl.innerText = `${location.city}, ${location.region}`;
  timezoneEl.innerText = `${location.timezone} UTC`;
  ispEl.innerText = isp;
}


// fetchIPLocData();