/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const { getPinsByUserID, getUserByID, getMapListByUserID, getFavsByUserID, getFavsMapIDByUserID } = require('../db/queries');


const usersRouter = (db) => {

  router.get("/myMapList", (req, res) => {
    const id = Number.parseInt(req.cookies["user_id"]);
    const myMapListPromise = getMapListByUserID(db, id);
    const myFavPromise = getFavsMapIDByUserID(db, id);
    Promise.all([myMapListPromise, myFavPromise])
    .then((values) => {
      res.json(values);
    })
    .catch((err) => {
      console.log("get/users/myMapList error:", err.message)
    })
  });

  router.get("/myFavMaps", (req, res) => {
    const id = Number.parseInt(req.cookies["user_id"]);
    getFavsByUserID(db, id)
    .then((favMaps) => {
      res.json(favMaps);
    })
    .catch((err) => {
      console.log("get/users/myFavMaps error:", err.message);
    })
  });

  router.get("/myPins", (req, res) => {
    const id = Number.parseInt(req.cookies["user_id"]);
    getPinsByUserID(db, id)
    .then((pins) => {
      res.json(pins);
    })
    .catch((err) => {
      console.log("get/users/pins error:", err.message);
    })
  });

  router.get("/profile", (req, res) => {
    const id = Number.parseInt(req.cookies["user_id"]);
    getUserByID(db, id)
      .then((user)  => {
        res.render("profile", { user });
      })
      .catch((err) => {
        console.log("get/users/:id error:", err.message);
      })
  });

  router.get("/img", (req, res) => {
    const id = Number.parseInt(req.cookies["user_id"]);
    getUserByID(db, id)
      .then((user) => {
        res.send(user.profile_image_url);
      })
  });

  return router;
};

module.exports = usersRouter;

