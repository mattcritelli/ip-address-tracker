import { setMap } from './map.js';
const apiKey = 'at_unDaWA0vh2ru7g4JKSPUZ63f4EFGN';

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
  findLocation(seachText);
});

// UPDATE UI WITH API RESPONSE
function updateDisplayWithResponse({ location, isp, ip }) {
  ipEl.innerText = ip;
  locationEl.innerText = `${location.city}, ${location.region} ${location.postalCode}`;
  timezoneEl.innerText = `${location.timezone} UTC`;
  ispEl.innerText = isp;

  setMap(location.lat, location.lng);
  loader.style.display = "none";
};

// TODO: Look to refactor api calls to single function & dry code
// FETCH USER IP ON PAGE LOAD
async function fetchUserIP() {
  const apiUrl = 'https://api.ipify.org/?format=json'
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data.ip;
};

// FETCH LOCATION DATA BASED ON USER SEARCH
async function fetchIPLocData(ip, callback) {
  const apiUrl = `https://geo.ipify.org/api/v1?apiKey=${apiKey}&domain=${ip}`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  callback(data)
};

async function findLocation(ipAddress = null) {
  loader.style.display = "block";

  if(!ipAddress) {
    ipAddress = await fetchUserIP();
  }
  fetchIPLocData(ipAddress, updateDisplayWithResponse);
};

findLocation();
