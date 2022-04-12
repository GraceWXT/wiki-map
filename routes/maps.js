// requre express & setup router
const express = require('express');
const router = express.Router();
const { getUserByID } = require('../db/queries');

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

  // return the router
  return router;
};

module.exports = getMaps;



