$(() => {
  $.ajax("/users/img").then((imgUrl) => {
    console.log("imgURL: ", `${imgUrl}`)
    $(".profile-info img").attr("src", `${imgUrl}`);
  })
})
