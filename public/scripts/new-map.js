$(()=> {

  $(".button.new-map").on("click", () => {
    $("#new-map").slideToggle();
  });

  $("#submit-new-map").on("click", (event) => {
    event.preventDefault();
    const mapName = $('input[name="mapname"]').val();
    console.log("mapName", mapName);
    if (!mapName || !mapName.trim()) {
      alert("Please give a name to your new map. : )");
    } else {
      const mapNameQueryString = $("section#new-map > form").serialize();
      // console.log("mapNameQueryString", mapNameQueryString);
      $.ajax({
        method: "POST",
        url: "/maps",
        data: mapNameQueryString,
        success:(data) => {
          // console.log("data from server response:", data);
          window.location.href = `http://localhost:8080${data}`;
        }
      }).catch((err => {
        console.log("ajax POST /maps error: ", err);
      }))
    }
  });

});
