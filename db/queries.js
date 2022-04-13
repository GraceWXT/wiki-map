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
      console.log("getUserById error: ", err.message);
    });
};


/** A function that returns an array of maps object with its id and name */
const getMapList = function(db) {
  return db.query(`
  SELECT id, name
  FROM maps
  ORDER BY id DESC;
  `)
    .then((result) => {
      console.log(result.rows);
      const mapList = result.rows;
      return mapList;
    })
    .catch((err) => {
      console.log("getMapList error: ", err.message);
    });
};
/** Get a list of all maps that belong to a specific user */
const getMapListByUserID = function(db, id) {
  return db.query(`
  SELECT maps.id, maps.name
  FROM maps
  WHERE owner_id = ${id}
  ORDER BY maps.id
  `)
    .then(res => {
      const myMapList = res.rows;
      return myMapList;
    })
    .catch((err) => {
      console.log("getMapListByUserID error:", err.message);
    });
};

/** Given a map id and user id, return the fav obj if exists  */
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
      console.log("getFav error:", err.message);
    });
};

/** Get a list of all faved mapID for a user. Used to render the icon class. */
const getFavsMapIDByUserID = (db, id) => {
  return db.query(`
  SELECT map_id FROM favs
  WHERE user_id = ${id}
  ORDER BY id`)
    .then(res => {
      const favs = res.rows;
      return favs;
    })
    .catch((err) => {
      console.log("getFavsMapIDByUserID error:", err.message);
    });
};


/** Get a list of fav maps for a specific user */
const getFavsByUserID = (db, id) => {
  return db.query(`
  SELECT map_id, maps.name
  FROM favs
  JOIN maps ON map_id = maps.id
  WHERE user_id = ${id}
  AND owner_id <> ${id}
  ORDER BY map_id
  `)
    .then(res => {
      const favMaps = res.rows;
      return favMaps;
    })
    .catch((err) => {
      console.log("getFavsByUserID error:", err.message);
    });
};

/** Get a list of contributed pins for a specific user */
const getPinsByUserID = (db, id) => {
  return db.query(`
  SELECT title, map_id
  FROM pins
  JOIN maps ON map_id = maps.id
  WHERE creator_id = ${id}
  AND owner_id <> ${id}
  ORDER BY pins.id DESC
  `)
    .then(res => {
      const pins = res.rows;
      return pins;
    })
    .catch((err) => {
      console.log("getPins error:", err.message);
    });
};

/** Get a list of pins for a specific map ID */
const getPinsByMapID = (db, mapID) => {
  return db.query(`
  SELECT title
  FROM pins
  WHERE map_id = ${mapID}
  ORDER BY pins.id DESC
  `)
    .then(res => {
      const pins = res.rows;
      return pins;
    })
    .catch((err) => {
      console.log("getPinsByMapID error:", err.message);
    });
};

/** Get the map name of a specific id */
const getMapByID = (db, mapID) => {
  return db.query(`
  SELECT *
  FROM maps
  WHERE id = ${mapID}
  `)
    .then(res => {
      const map = res.rows[0];
      return map;
    })
    .catch((err) => {
      console.log("getPinsByMapID error:", err.message);
    });
};

/** A function that takes the user id and map name and inserts the new map to database  */
const insertMap = (db, userID, mapName) => {
  return db.query(`
  INSERT INTO maps (owner_id, name)
  VALUES ($1, $2)
  RETURNING *`, [userID, mapName])
    .then((res) => {
      const newMap = res.rows[0];
      console.log("map inserted", newMap);
      return newMap;
    })
    .catch((err) => {
      console.log("insertMap error:", err.message);
    });
};

/** a function to create new fav given an user id and map id */


/** a function to create new fav given a user id and map id */
const insertFav = (db, mapID, userID) => {
  return db.query(`
  INSERT INTO favs (map_id, user_id)
  VALUES ($1, $2)

  RETURNING * `, [mapID, userID])
    .then((res) => {
      const newFav = res.rows[0];
      console.log("fav inserted", newFav);
    })
    .catch((err) => {
      console.log("insertFav error:", err.message);
    });
};


/** a function to delete the fav given the fav id */

const deleteFav = (db, favID) => {
  return db.query(`
  DELETE FROM favs
  WHERE favs.id = ${favID}
  `)
    .then(() => {
      console.log("fav deleted, id: ", favID);
    })
    .catch((err) => {
      console.log("deleteFav error:", err.message);
    });
};

module.exports = {
  getMapByID,
  getPinsByMapID,
  getPinsByUserID,
  getMapList,
  getUserByID,
  getFav,
  getFavsMapIDByUserID,
  insertMap,
  insertFav,
  deleteFav,
  getFavsByUserID,
  getMapListByUserID
};
