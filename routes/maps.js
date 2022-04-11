// requre express & setup router
const express = require('express');
const router  = express.Router();

// declare function --> does 'db' need to be passed in?
const getMaps = function(db) {

  // express router trims '/maps'
  router.get("/", (req,res) => {

    // want only column 'name' from 'maps' & have to return this out of router.get
    return db.query(`
    SELECT name
    FROM maps
    ORDER BY // order by id descending (newest at top)
    `)

    // clean up object that was returned --> .rows should return array of map names
    .then((result) => {
      const maps = result.rows;
      res.json({ users });
    })

    // catch error if any and console log
    .catch((err) => {
      console.log(err.message);
    });
  });

  // return from function getMaps
  return router;
};






// export getMaps
module.exports = {getMaps}
