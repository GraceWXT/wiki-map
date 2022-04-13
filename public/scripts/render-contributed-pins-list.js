  // function takes individual map objects and uses to create map list html
const createPinListItem = function(pin) {

  const $listItem = $("<li>").append(`<a href="/maps/${pin.map_id}">${pin.title}</a>`);

  console.log("PinListItem inside create function", $listItem);
  return $listItem;
};

// function takes 'maps' object and renders into html using 'create map list element' function
const renderMyPinList = function(pinList) {
  console.log("does it get to render function?")
  for (const pin of pinList) {
    const $pinListItem = createPinListItem(pin);
    console.log("pinlistItem inside render function", $pinListItem);
    $("#contributed-pins-list .list-container").append($pinListItem);
  }
};

const loadMyPinList = function() {
  // empty existing containers

  $("#contributed-pins-list .list-header").empty();
  $("#contributed-pins-list .list-container").empty();
  $("#contributed-pins-list .list-header").text("Contributed Pins"); // add header to map list
  $.ajax("/users/myPins")
  .then((pinList) => {
    renderMyPinList(pinList);
  }).catch(err => {
    console.log("loadPinList Error: ", err.message);
  });
};
console.log("Do we get here?------------------------>");

// use document.ready to wait for page to load before loading map list
$(document).ready(function() {
  loadMyPinList();
});

