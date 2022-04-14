// function takes individual map objects and uses to create map list html
const createMapListItem = function(map, favList) {
  let $favIcon = $(`<i class="fa-solid fa-heart fav-icon" id="${map.id}"></i>`)
  for (const fav of favList) {
    if (fav.map_id === map.id) {
      $favIcon.addClass("liked");
    }
  }
  // console.log($favIcon.attr("class"));

  const $button = $("<button>").attr("type", "submit").addClass("fav-button").append($favIcon);
  const $form = $("<form>").attr("action", `/favs/${map.id}`).attr("method", "POST").append($button);
  const $listItem = $("<li>").append(`<a href="/maps/${map.id}">${map.map_name}</a><span>by ${map.owner_name}</span>`).append($form);

  // console.log("maplistItem inside create function", $listItem);
  return $listItem;
};

// function takes 'maps' object and renders into html using 'create map list element' function
const renderMapList = function(mapList, favList) {
  console.log("does it get to render function?")
  for (const mapObj of mapList) {
    const $mapListItem = createMapListItem(mapObj, favList);
    // console.log("maplistItem inside render function", $mapListItem);
    $(".list-container").append($mapListItem);
  }
};

const loadMapList = function() {
  // empty existing containers
  $(".list-header").empty();
  $(".list-container").empty();
  $(".list-header").text("Available Maps"); // add header to map list
  $.ajax("/maps/maplist")
  .then((values) => {
    const mapList = values[0];  // array of maps object (id, name)
    console.log("mapList", mapList)
    const favList = values[1];  //array of favs object (map_id)
    console.log("favList", favList)
    renderMapList(mapList, favList);
  }).catch(err => {
    console.log("loadMapList Error: ", err.message);
  });
};

// use document.ready to wait for page to load before loading map list
$(document).ready(function() {
  loadMapList();
});
