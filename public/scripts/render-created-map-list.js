// function takes individual map objects and uses to create map list html
const createMyMapListItem = function(map, favList) {
  let $favIcon = $(`<i class="fa-solid fa-heart fav-icon"></i>`)
  for (const fav of favList) {
    if (fav.map_id === map.id) {
      $favIcon.addClass("liked");
    }
  }
  // console.log($favIcon.attr("class"));

  const $button = $("<button>").attr("type", "submit").addClass("fav-button").append($favIcon);
  const $form = $("<form>").attr("action", `/favs/${map.id}`).attr("method", "POST").append($button);
  const $listItem = $("<li>").append(`<a href="/maps/${map.id}">${map.name}</a>`).append($form);

  console.log("myMapListItem inside create function", $listItem);
  return $listItem;
};

// function takes 'maps' object and renders into html using 'create map list element' function
const renderMyMapList = function(mapList, favList) {
  console.log("does it get to render function?")
  for (const mapObj of mapList) {
    const $mapListItem = createMyMapListItem(mapObj, favList);
    console.log("maplistItem inside render function", $mapListItem);
    $("#created-maps-list .list-container").append($mapListItem);
  }
};

const loadMyMapList = function() {
  // empty existing containers

  $("#created-maps-list .list-header").empty();
  $("#created-maps-list .list-container").empty();
  $("#created-maps-list .list-header").text("Created Maps"); // add header to map list
  $.ajax("/users/myMapList")
  .then((values) => {
    const mapList = values[0];  // array of maps object (id, name)
    console.log("mapList", mapList)
    const favList = values[1];  //array of favs object (map_id)
    console.log("favList", favList)
    renderMyMapList(mapList, favList);
  }).catch(err => {
    console.log("loadMapList Error: ", err.message);
  });
};
console.log("Do we get here?------------------------>");

// use document.ready to wait for page to load before loading map list
$(document).ready(function() {
  loadMyMapList();
});
