// requre express & setup router
const express = require('express');
const res = require('express/lib/response');
const router = express.Router();
const { getUserByID, getMapList, getFavsMapIDByUserID } = require('../db/queries');

const getMaps = function(db) {
  // express router trims '/maps'
  router.get("/", (req,res) => {
    const id = Number.parseInt(req.cookies["user_id"]);
    console.log("cookie is", typeof id);
    getUserByID(db, id)
      .then((user) => {
        console.log("user object:", user);
        res.render("index", { user });
      })
      .catch((err) => {
        // catch error if any and console log
        console.log("getMaps Error", err.message);
      });
  });

  // Help front end get the data when needed
  router.get("/maplist", (req, res) => {
    const userID = Number.parseInt(req.cookies["user_id"]);

    const mapListPromise = getMapList(db);
    const favListPromise = getFavsMapIDByUserID(db, userID);
    Promise.all([mapListPromise, favListPromise])
    .then((values) => {
      res.json(values);
    }).catch((error) => {
      console.log("getMapList Error: ", error.message);
    });
  })
  return router;
};

module.exports = getMaps;
