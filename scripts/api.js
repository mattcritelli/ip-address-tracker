import { updateMap } from './map.js';

// Default IP
let ipAddress = '8.8.8.8';

// DOM SELECTORS
const ipEl = document.querySelector('#ip-address');
const locationEl = document.querySelector('#location');
const timezoneEl = document.querySelector('#timezone');
const ispEl = document.querySelector('#isp');
const searchBtn = document.querySelector('#search-btn');
const loader = document.querySelector('#loader');

searchBtn.addEventListener('click', function (e) {
  e.preventDefault();
  const seachText = document.querySelector('#site-search').value;
  onLoad(seachText);
})

async function fetchUserIP() {
  const ipApi = 'https://api.ipify.org/?format=json'
  const response = await fetch(ipApi);
  const ipData = await response.json();
  ipAddress = ipData.ip;
  return ipAddress;
}

async function fetchIPLocData(ip, callback) {
  const apiUrl = `https://geo.ipify.org/api/v1?apiKey=${apiKey}&domain=${ip}`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  callback(data)
}

function updateDisplayWithResponse({ location, isp, ip }) {
  ipEl.innerText = ip;
  locationEl.innerText = `${location.city}, ${location.region} ${location.postalCode} `;
  timezoneEl.innerText = `${location.timezone} UTC`;
  ispEl.innerText = isp;
  updateMap(location.lat, location.lng)
  loader.style.display = "none";
}


async function onLoad(query = null) {
  loader.style.display = "block";
  const ip = query ? query : await fetchUserIP();
  fetchIPLocData(ip, updateDisplayWithResponse);
}

onLoad();