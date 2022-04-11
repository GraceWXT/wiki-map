const express = require('express');
const router = express.Router();
//require db

//POST /favs/
module.exports = (db) => {
  router.post('/', (req, res) => {
    //get ids from website/element
    // (userID)
    const mapID = $(".fav-icon").attr("id")
    const userID = req.cookies["user_id"]


    db.query(`SELECT favs.id
    FROM favs
    WHERE map_id = $1
    AND user_id = $2`, [mapID, userID])

      // a function todetermine whether the fav exists

    .then(res => {
      favsID = res.rows[0].id
      if (!favsID) {

        // add new row to favs table with info from browser if ID DOES NOT already exist

        db.query(`INSERT INTO favs (map_id, user_id)
        VALUES ($1, $2)`, [mapID, userID])
        .then(() => {
          $('.fav-icon').addClass("liked");
        })
        .catch(err => {
          res.status(400).json({ error: 'invalid request' })
        })

        } else {

          // delete row where id = favs.id if ID DOES already exist

        db.query(`DELETE FROM favs
        WHERE favs.id = favsID`)
        .then(() => {
          $('.fav-icon').removeClass("liked")
        })
        .catch(err => {
          res.status(400).json({ error: 'invalid request' })
        })
      }
    })
  })
}



