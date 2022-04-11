// requre express & setup router
const express = require('express');
const initializeMap = require('./mapAPI/initialMapAPI');
const router  = express.Router();
const { getMapList, getUserByID } = require('../db/queries');

const getMaps = function(db) {

  // express router trims '/maps'
  router.get("/", (req,res) => {

  // const promise1 = getMapList(db);
  const promise2 = getUserByID(db);

  Promise.all([promise2]).then((values) => {

    // const mapList = values[0];
    const user = values[0];
    const map = initializeMap(); // api call map
    return res.render("index", { user, map })
  }).catch((err) => {
    // catch error if any and console log
    console.log(err.message);
  });

  });

  // return the router
  return router;
};

module.exports = getMaps;



// const promise1 = Promise.resolve(3);
// const promise2 = 42;
// const promise3 = new Promise((resolve, reject) => {
//   setTimeout(resolve, 100, 'foo');
// });

// Promise.all([promise1, promise2, promise3]).then((values) => {
//   console.log(values);
// });
// // expected output: Array [3, 42, "foo"]
