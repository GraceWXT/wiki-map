// function takes individual map objects and uses to create map list html
const createPinListItem = function (pin) {

  // const $listItem = $("<li>").append(`<a href="/maps/${pin.map_id}">${pin.title}</a>`);
  const $listItem = $("<li>").append(`<span>${pin.title}</span>`);

  console.log("PinListItem inside create function", $listItem);
  return $listItem;
};

// function takes 'maps' object and renders into html using 'create map list element' function
const renderMyPinList = function (pinList) {
  console.log("does it get to render function?")
  for (const pin of pinList) {
    const $pinListItem = createPinListItem(pin);
    console.log("pinlistItem inside render function", $pinListItem);
    $("#pin-list-by-map .list-container").append($pinListItem);
  }
};

const loadMyPinList = function () {
  // empty existing containers

  const mapId = window.location.href.split("/").pop();

  $("#pin-list-by-map .list-header").empty();
  $("#pin-list-by-map .list-container").empty();


  $.ajax(`/maps/${mapId}/pins`)   // How to get the map ID from browser?
  .then((values) => {
    const pinList = values[0];
    const mapName = values[1].name;
    $("#pin-list-by-map .list-header").text(`${mapName}`); // add header to map list
      renderMyPinList(pinList);
    }).catch(err => {
      console.log("loadPinList Error: ", err.message);
    });
};

console.log("Do we get here?------------------------>");

// use document.ready to wait for page to load before loading map list
$(document).ready(function () {
  loadMyPinList();
});
