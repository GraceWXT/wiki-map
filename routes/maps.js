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
      .then((values) => {
        const user = values[0];
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



// const promise1 = Promise.resolve(3);
// const promise2 = 42;
// const promise3 = new Promise((resolve, reject) => {
//   setTimeout(resolve, 100, 'foo');
// });

// Promise.all([promise1, promise2, promise3]).then((values) => {
//   console.log(values);
// });
// // expected output: Array [3, 42, "foo"]
