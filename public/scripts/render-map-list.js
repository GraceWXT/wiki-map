// function takes 'maps' object and renders into html using 'create map list element' function
const renderMapList = function(maps) {

  // get count of maps to add to list
  const numberOfMaps = maps.length;
  const container = $('#map-container');

  // empty existing container
  container.empty();

  // add header to map list
  const listHeader = "Available Maps";
  container.prepend(`<span id="list-header">${listHeader}</span>`);

  // loop through for n list items to create html from function createMapListElement
  for (let i = 0; i < numberOfMaps; i++) {
    const $mapListItem = createMapListElement(maps[i]);
    container.prepend($mapListItem);
  }
};



// function takes individual map objects and uses to create map list html
const createMapListElement = function(mapElement) {

  // assign map_id and map_name to convenience variables
  const map_id = mapElement.id;
  const map_name = mapElement.name;

  // create html using convenience variables
  const $mapListElement = $(
    `<li>
      <span>${map_name}</span>
      <form action="/favs/${map_id}" method="POST">
        <button type="submit" class="fav-button">
          <i class="fa-solid fa-heart fav-icon" id="${map_id}"></i>
        </button>
      </form>
    </li>`
  );

  // return html
  return $mapListElement;
};
