const renderPinsInMap = (pins, map) => {
  const mapId = window.location.href.split("/").pop();
  for (const pin of pins) {
    const lat = Number(pin.latitude);
    const lng = Number(pin.longitude);
    let marker = L.marker([lat, lng])
      .addTo(map)
      .bindPopup(`
        <h3>${pin.title}</h3>
        <p>${pin.description}</p>
        <img src=${pin.image_url}>
      `)
      .on('mou', function() {
        this.openPopup();
        // console.log("pin",pin);
      })
      // .on('mouseout', function() {
      //   this.closePopup();
      //   // console.log("pin",pin);
      // })
      .on('dblclick', function() {
        this.getPopup().setContent(`
        <form action="/maps/${mapId}/${pin.id}/update" method="POST">
        <input value=${pin.title} name="title"></input>
        <input value=${pin.description} name="desc"></input>
        <input value=${pin.image_url} name="img"></input>
        <button id="editButton" type="submit">Save Changes</button>
        </form>
        <form action="/maps/${pin.id}/delete" method="DELETE">
        <button>Delete</button>
        </form>
        `).openOn(map)
      })
      .on("popupclose", function() {
        // console.log("this", this);
        this.getPopup().setContent(`
        <h3>${pin.title}</h3>
        <p>${pin.description}</p>
        <img src=${pin.image_url}></img>
      `)
      });

    // add event listener for mouse click with


      // let marker = L.marker([lat, lng], {
      //   // icon:
      //   // title: Text for the browser tooltip that appear on marker hover (no tooltip by default)
      // }).addTo(map);
    // })

  }
};

const initMapAndPins = function () {

  const mapId = window.location.href.split("/").pop();

  $.ajax(`/maps/${mapId}/pins`)
    .then((values) => {
      const pins = values[0];
      const bound = values[1];
      let map;

      console.log("pins;",pins);
      console.log("bound;",bound);

      console.log("pins object keys length: ", Object.keys(pins).length)
      if (!Object.keys(pins).length) {
        map = L.map('map-container').setView([20, 0], 1.5);
      } else {
        map = L.map('map-container').fitBounds([
          [bound.min_lat, bound.min_lng],
          [bound.max_lat, bound.max_lng]
        ]);
        if (map) console.log("fitBound map exist");
      }

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

      // Event listner to create pin when map is clicked
      map.on("click", (event) => {
        console.log("event.latlng", event.latlng);
        const { lat, lng } = event.latlng;
        let popup = L.popup().setLatLng([lat, lng])
        .setContent(`
        <form action="/maps/${mapId}/${lat}/${lng}/pins" method="POST">
        <input placeholder="Title" name="title"></input>
        <input placeholder="Description" name="desc"></input>
        <input placeholder="Image URL" name="img"></input>
        <button id="newPinButton" type="submit">Create Pin</button>
        </form>
        `).openOn(map);

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


