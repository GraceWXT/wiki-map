// function takes individual map objects and uses to create map list html
const createMapListItem = function(map, favList) {
  let $favIcon = $(`<i class="fa-solid fa-heart fav-icon" id="${map.id}"></i>`)
  for (const fav of favList) {
    if (fav.map_id === map.id) {
      $favIcon.addClass("liked");
    }
  }

  // const $button = $("<button>").attr("type", "submit").addClass("fav-button").append($favIcon);
  // const $form = $("<form>").attr("action", `/favs/${map.id}`).attr("method", "POST").append($button);
  const $listItem = $("<li>").append(`<a href="/maps/${map.id}">${map.map_name}</a><span>by ${map.owner_name}</span>`).append($favIcon);

  // console.log("maplistItem inside create function", $listItem);
  return $listItem;
};

// function takes 'maps' object and renders into html using 'create map list element' function
const renderMapList = function(mapList, favList) {
  for (const mapObj of mapList) {
    const $mapListItem = createMapListItem(mapObj, favList);
    // console.log("maplistItem inside render function", $mapListItem);
    $(".list-container").append($mapListItem);
  }
  // Register a event listener for all the fav icons that on click toggles color and sends the POST req
  $(`.fav-icon`).on("click", function() {
    // console.log("this is", this);
    // console.log("event target", event.target);
    // console.log(`POST to /favs/${map.id}`);
    const mapId = $(this).attr("id");
    const eventTarget = this;
    $.ajax({
      method: "POST",
      url: `/favs/${mapId}`,
    }).then(()=> {
      $(eventTarget).toggleClass("liked");
    }).catch((err => {
      console.log(`ajax POST /favs/${mapId} error: `, err);
    }))
  })

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
