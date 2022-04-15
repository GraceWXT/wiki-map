const createMyFavListItem = function(map) {
  let $favIcon = $(`<i class="fa-solid fa-heart faved fav-icon" id="${map.map_id}"></i>`).addClass("liked");
  // console.log($favIcon.attr("class"));

  // const $button = $("<button>").attr("type", "submit").addClass("fav-button").append($favIcon);
  // const $form = $("<form>").attr("action", `/favs/${map.map_id}`).attr("method", "POST").append($button);
  const $listItem = $("<li>").append(`<a href="/maps/${map.map_id}">${map.name}</a>`).append($favIcon);

  console.log("myFavListItem inside create function", $listItem);
  return $listItem;
};

// function takes 'maps' object and renders into html using 'create map list element' function
const renderFavList = function(favMaps) {
  console.log("does it get to render function?")
  for (const mapObj of favMaps) {
    const $favListItem = createMyFavListItem(mapObj);
    console.log("favListItem inside render function", $favListItem);
    $("#favorited-maps-list .list-container").append($favListItem);
  }

  $(`.faved.fav-icon`).on("click", function(event) {
    console.log("this is", this);
    console.log("event target", event.target);
    // console.log(`POST to /favs/${map.id}`);
    const mapId = $(this).attr("id");
    $.ajax({
      method: "POST",
      url: `/favs/${mapId}`,
    }).then(()=> {
      favList();
    }).catch((err => {
      console.log(`ajax POST /favs/${mapId} error: `, err);
    }))
  })

};

const favList = function() {
  // empty existing containers
  $("#favorited-maps-list .list-header").empty();
  $("#favorited-maps-list .list-container").empty();
  $("#favorited-maps-list .list-header").text("Favorited Maps"); // add header to fav list
  $.ajax("/users/myFavMaps")
  .then((favMaps) => {
    console.log("favMaps", favMaps);
    renderFavList(favMaps);
  }).catch(err => {
    console.log("favList Error: ", err.message);
  });
};

// use document.ready to wait for page to load before loading map list
$(document).ready(function() {
  favList();

});
