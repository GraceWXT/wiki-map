const express = require('express');
const router = express.Router();
const { getFav, insertFav, deleteFav } = require('../db/queries.js')

const favRouter = (db) => {

  //POST /favs/:id
  router.post('/:id', (req, res) => {
    //get ids from req
    const mapID = Number.parseInt(req.params.id);
    const userID = Number.parseInt(req.cookies["user_id"]);

    getFav(db, mapID, userID)
      .then ((fav) => {
        if (!fav) {
          // add new row to favs table with info from browser if ID DOES NOT already exist
          insertFav(db, mapID, userID);
        } else {
          // delete row where id = favs.id if ID DOES already exist
          deleteFav(db, fav.id);
        }
      })
      .then(()=> {
        res.send("success");
      })
      .catch((err) => {
        console.log("get /favs/:id (insert or delete) error: ", err.message);
      })
  })

  return router;
}

module.exports = favRouter;

