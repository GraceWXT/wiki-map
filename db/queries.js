/** A function that makes a query to the provided database and returns the user object with matching id */
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


/** */
const getMapList = function(db) {
  return db.query(`
  SELECT name
  FROM maps
  ORDER BY id DESC;
  `)
    .then((result) => {
      console.log(result.rows);
      const mapList = result.rows;
      return mapList;
    })
    .catch((err) => {
      console.log("getMapList error:", err.message);
    });
};

/** Given a map id and user id, return the fav id if existing  */
const getFav = (db, mapID, userID) => {
  return db.query(`
  SELECT favs.id
  FROM favs
  WHERE map_id = $1
  AND user_id = $2;`, [mapID, userID])
    .then(res => {
      const fav = res.rows[0];
      return fav;
    })
    .catch((err) => {
      console.log("getFavID error:", err.message);
    });
};



/** a function to create new fav given an user id and map id */

const insertFav = (db, mapID, userID) => {
  return db.query(`
  INSERT INTO favs (map_id, user_id)
  VALUES ($1, $2)`, [mapID, userID])
    .then(() => {
      // $(`#${mapID}`).addClass("liked");
      console.log("fav inserted");
    })
    .catch((err) => {
      console.log("insertFav error:", err.message);
    });
};

/** a function to delete the fav given an user id and map id */
const deleteFav = (db, favID, mapID) => {
  return db.query(`
  DELETE FROM favs
  WHERE favs.id = $1`, [favID])
    .then(() => {
      // $(`#${mapID}`).removeClass("liked");
      console.log("fav deleted");
    })
    .catch((err) => {
      console.log("deleteFav error:", err.message);
    });
};
module.exports = { getMapList, getUserByID, getFav, insertFav, deleteFav };
