const initializeMap = function(){

  $(document).ready(function() {

    let map = L.map('map-container').setView([51.505, -0.09], 13);

    const accessToken = 'pk.eyJ1IjoiaWFhbi1qIiwiYSI6ImNsMXY1NHY0ODJ5aG0zY29iamU3cHFvcXQifQ.4OFadZGYpsL6nf49SxkW_A';

    L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}`, {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: accessToken

    }).addTo(map);

    return map;
  });
};

module.exports = initializeMap;

