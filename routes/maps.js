// require express & setup router
const express = require('express');
const router = express.Router();
const { deletePinByID, updatePinByID, insertPinByMapID, getBoundsByMapID, getMapByID, getPinTitlesByMapID, getUserByID, getMapList, getFavsMapIDByUserID, insertMap, getPinsByMapID } = require('../db/queries');

const mapsRouter = function(db) {
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
        console.log("post /maps Error", err.message);
      });
  });

  // Get available maps list for homepage rendering
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

  // GET /maps/:id/pins  => send the pin info of a specific map for rendering markers
  router.get("/:id/pins", (req, res) => {
    const userID = Number.parseInt(req.cookies["user_id"]);
    const mapID = Number.parseInt(req.params.id);
    const pinsPromise = getPinsByMapID(db, mapID);
    const boundPromise = getBoundsByMapID(db, mapID);
    Promise.all([pinsPromise, boundPromise])
      .then((values)=> {
        values.push(userID);
        res.json(values);
      })
      .catch((err) => {
        console.log("get /maps/:id/pins Error", err.message);
      });
 });


 // POST /maps/:pinId//delete  => delete an existing pin on a specific map
 router.post("/:mapId/:pinId/delete", (req, res) => {
  //  const userID = Number.parseInt(req.cookies["user_id"]);
   const mapId= Number.parseInt(req.params.mapId);
   const pinId= Number.parseInt(req.params.pinId);
   deletePinByID(db, pinId)
    .then(()=> {
       res.redirect(`/maps/${mapId}`);
     })
     .catch((err) => {
       console.log("post /:mapId/:pinId/pins (Update pin) Error", err.message);
     });
 });

 // POST /maps/:pinId//update  => update an existing pin on a specific map
 router.post("/:mapId/:pinId/update", (req, res) => {
  //  const userID = Number.parseInt(req.cookies["user_id"]);
   const mapId= Number.parseInt(req.params.mapId);
   const pinId= Number.parseInt(req.params.pinId);
   let { title, desc, img } = req.body;
   if (!title) {
     res.send("Bad Request")
   }
   if (!desc) {desc = null;}
   if (!img) {img = null;}
   updatePinByID(db, pinId, title, desc, img)
    .then(()=> {
       res.redirect(`/maps/${mapId}`);
     })
     .catch((err) => {
       console.log("post /:mapId/:pinId/pins (Update pin) Error", err.message);
     });
 });

 // POST /maps/:id/pins  => create a new pin on a specific map
 router.post("/:id/:lat/:lng/pins", (req, res) => {
  const userID = Number.parseInt(req.cookies["user_id"]);
  const mapID = Number.parseInt(req.params.id);
  const lat = Number.parseFloat(req.params.lat);
  const lng = Number.parseFloat(req.params.lng);
  let { title, desc, img } = req.body;
  if (!title) {
    res.send("Bad Request")
  }
  if (!desc) {desc = null;}
  if (!img) {img = null;}
  insertPinByMapID(db, userID, mapID, lat, lng, title, desc, img)
   .then(()=> {
      res.redirect(`/maps/${mapID}`);
    })
    .catch((err) => {
      console.log("post /maps/:id/pins Error", err.message);
    });
});


  // GET /maps/:id/pins  => send the pin title and map name of a specific map
  router.get("/:id/pinTitles", (req, res) => {
    const mapID = Number.parseInt(req.params.id);
    const pinsPromise = getPinTitlesByMapID(db, mapID);
    const mapPromise = getMapByID(db, mapID);
    Promise.all([pinsPromise, mapPromise])
      .then((values) => {
        res.json(values);
      })
      .catch((err) => {
        console.log("get /maps/:id/pinTitles Error", err.message);
      });
  });

  // GET /maps/:id  => loads a specific map
  router.get("/:id", (req, res) => {
    const userId = Number.parseInt(req.cookies["user_id"]);
    const mapId = req.params.id;
    if (isNaN(Number.parseInt(mapId))) {
      res.send("Bad Request");
    }
    getMapByID(db, mapId).then((map) => {
      if (!map) {
        res.send("Bad Request");
      }
    }).catch((err)=> {
      console.log("get /maps/:id Errored when trying to verify the map id exists:", err.message);
    })
    getUserByID(db, userId)
      .then((user) => {
        // console.log("user object:", user);
        res.render("map.ejs", { user });
      })
      .catch((err) => {
        console.log("get /maps/:id Errored when getUserByID: ", err.message);
      });
  });

  return router;
};

module.exports = mapsRouter;
