const express = require('express');
const router = express.Router();
//require db

module.exports = (db) => {
  router.post('/', (req, res) => {
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
        db.query(`INSERT INTO favs (map_id, user_id)
        VALUES ($1, $2)`, [id, id])
          .then(CSS).catch()
      } else {
        db.query(`DELETE`)
        // delete row where id = favs.id
        // .then(CSS)
      }
    }).catch()
  })
}



