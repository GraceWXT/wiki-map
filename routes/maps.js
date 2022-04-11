const express = require('express');
const router  = express.Router();

const getMaps = function(db) {
  router.get("/", (req,res) => {
    db.query(`SELECT name FROM maps`)
    .then((result) => {
      const maps = result.rows;
      res.json({ users });
    })
    .catch((err) => {
      console.log(err.message);
    });
  });
  return router;
};

  module.exports = {getMaps}
