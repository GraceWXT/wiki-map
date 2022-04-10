//require db

$ (document).ready(function() {
  $(".fav-icon").on("click", function () {
    //get ids from website/element
    // (userID)
    const mapID = $(".fav-icon").attr("id")
    const userID =
    // a function todetermine whether the fav exists
    db.query(`SELECT favs.id
    FROM favs
    WHERE map_id = $1
    AND user_id = $2`, [mapID, userID]).then(res => {
      favsID =res.rows[0].id
      if (!favsID)  {
        db.query(`INSERT`, [id, id])
          .then(CSS).catch()
      } else {
        // delete row where id = favs.id
        // .then(CSS)
      }
    }).catch()
  })
});

