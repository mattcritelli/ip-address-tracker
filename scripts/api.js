import { loadMap, updateMap } from './map.js';

// Default IP
// let ipAddress = '8.8.8.8';

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
})

// FETCH USER IP ON PAGE LOAD
async function fetchUserIP() {
  const ipApi = 'https://api.ipify.org/?format=json'
  const response = await fetch(ipApi);
  const ipData = await response.json();
  return ipData.ip;
}

// FETCH LOCATION DATA BASED ON USER SEARCH
async function fetchIPLocData(ip, callback, initialLoad) {
  const apiUrl = `https://geo.ipify.org/api/v1?apiKey=${apiKey}&domain=${ip}`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  callback(data, initialLoad)
}

// UPDATE UI WITH API RESPONSE
function updateDisplayWithResponse({ location, isp, ip }, initialLoad) {
  ipEl.innerText = ip;
  locationEl.innerText = `${location.city}, ${location.region} ${location.postalCode} `;
  timezoneEl.innerText = `${location.timezone} UTC`;
  ispEl.innerText = isp;

  if (initialLoad) {
    loadMap(location.lat, location.lng)
  } else {
    updateMap(location.lat, location.lng)
  }
  loader.style.display = "none";
}


async function findLocation(query = null) {
  loader.style.display = "block";
  const initialLoad = query ? false : true;
  const ipAddress = query ? query : await fetchUserIP();

  if (query) {
    fetchIPLocData(ipAddress, updateDisplayWithResponse, initialLoad);
  } else {
    fetchIPLocData(ipAddress, updateDisplayWithResponse, initialLoad);
  }
}

findLocation();