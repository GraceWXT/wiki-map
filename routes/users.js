/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const { getUserByID, getMapList, getFavsMapIDByUserID } = require('../db/queries');

module.exports = (db) => {
  router.get("/users/:id", (req, res) => {
    const id = Number.parseInt(req.cookies["user_id"]);
    getUserByID(db, id)
      .then((user)  => {
        res.render("iaan file name", { user });
      })
      .catch((err) => {
        console.log("getUser error:", err.message)
      })
   });
  return router;
};

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


      const getUserByID = function(db, id) {
        return db.query(`
        SELECT *
        FROM users
        WHERE id = ${id};
        `)
          .then((result) => {
            console.log("user result", result.rows[0]);
            const user = result.rows[0];
            return user;
          })
          .catch((err) => {
            console.log("get user by id error:", err.message);
          });
      };
