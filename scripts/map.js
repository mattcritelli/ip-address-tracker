var mymap = null;

// Set map based with either user IP or search query
function setMap(lat, lng) {
  if(!mymap) {
    mymap = L.map('mapid').setView([lat, lng], 13);
      L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: mapToken
    }).addTo(mymap);
  } else {
    mymap.setView([lat, lng], 13);
  }
}

export { setMap }