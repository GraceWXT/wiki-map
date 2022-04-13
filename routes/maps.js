// requre express & setup router
const express = require('express');
const router = express.Router();
const { getUserByID, getMapList, getFavsMapIDByUserID, insertMap, getPinsByMapID } = require('../db/queries');

const getMaps = function(db) {
  // express router trims '/maps'
  // GET /maps Homepage
  router.get("/", (req,res) => {
    const id = Number.parseInt(req.cookies["user_id"]);
    // console.log("cookie is", id);
    getUserByID(db, id)
      .then((user) => {
        // console.log("user object:", user);
        res.render("index", { user });
      })
      .catch((err) => {
        // catch error if any and console log
        console.log("get /maps Error", err.message);
      });
  });

  // POST /maps Create New Map
  router.post("/", (req,res) => {
    const userID = Number.parseInt(req.cookies["user_id"]);
    const mapName = req.body.mapname;
    // console.log("cookie is", userID);
    insertMap(db, userID, mapName)
      .then((newMap) => {
        console.log("newMAp: ", newMap);
        res.send(`/maps/${newMap.id}`); //
      })
      .catch((err) => {
        // catch error if any and console log
        console.log("post /maps Error", err.message);
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
      console.log("get /maplist Error: ", error.message);
    });
  })

  // GET /maps/:id/pins  => send the pin title of a specific map
  router.get("/:id/pins", (req, res) => {
    const mapID = Number.parseInt(req.params.id);
    getPinsByMapID(db, mapID)
      .then((pins) => {
        res.json(pins);
      })
      .catch((err) => {
        // catch error if any and console log
        console.log("get /maps/:id/pins Error", err.message);
      });
  });

  // GET /maps/:id  => loads a specific map
  router.get("/:id", (req, res) => {
    const id = Number.parseInt(req.cookies["user_id"]);
    getUserByID(db, id)
      .then((user) => {
        console.log("user object:", user);
        res.render("map.ejs", { user });
      })
      .catch((err) => {
        // catch error if any and console log
        console.log("get /maps/:id Error", err.message);
      });
  });

  return router;
};

module.exports = getMaps;
