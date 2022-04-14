const renderPinsInMap = (pins, map) => {
  for (const pin of pins) {
    const lat = Number(pin.latitude);
    const lng = Number(pin.longitude);
    let marker = L.marker([lat, lng]).addTo(map);
  }
};

const initMapAndPins = function () {

  const mapId = window.location.href.split("/").pop();

  $.ajax(`/maps/${mapId}/pins`)
    .then((values) => {
      const pins = values[0];
      const bound = values[1];

      let map = L.map('map-container').fitBounds([
        [bound.min_lat, bound.min_lng],
        [bound.max_lat, bound.max_lng]
      ]);

      if (map) console.log("fitBound map exist");

      L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}`, {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiYmFuYW5hbmVrbyIsImEiOiJja3YydGt1bnAwMzl4MnBvOHJ1cWU0djl5In0.aAvP-kOL6unp0F5o1dIq4g'
      }).addTo(map);

      return [pins, map];
      })
    .then(([pins, map]) => {
      console.log("starting to load pins in");
      renderPinsInMap(pins, map);
      return map;
    })
    .then((map) => {
      map.on("click", (event) => {
        console.log("event.latlng", event.latlng);
        const { lat, lng } = event.latlng;
        console.log("lat & tpyeof lat:", lat, typeof lat);
        console.log("lng & tpyeof lng:", lng, typeof lng);
        let popup = L.popup().setLatLng([lat, lng])
        // console.log("latlng after popup: ", lat, lng)
        .setContent(`
        <form action="/maps/${mapId}/${lat}/${lng}/pins" method="POST">
        <input placeholder="Title" name="title" width="10em" margin-bottom="1em"></input>
        <input placeholder="Description" name="desc"></input>
        <input placeholder="Image URL" name="img"></input>
        <button id="newPinButton" type="submit">Create Pin</button>
        </form>
        `).openOn(map);



        // let marker = L.marker([lat, lng], {
        //   // icon:
        //   // title: Text for the browser tooltip that appear on marker hover (no tooltip by default)
        // }).addTo(map);
      })
    })
    .catch(err => {
      console.log("loadPinList Error: ", err.message);
    });

};


// document ready
$(() => {
  initMapAndPins();
});


