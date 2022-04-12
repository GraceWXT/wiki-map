/** A function that makes a query to the provided database and returns the user object with matching id */
const getUserByID = function(db, id) {

  return db.query(`
  SELECT *
  FROM users
  WHERE id = ${id}
  `)
  .then((result) => {
    console.log("user result", result.rows[0]);
    const user = result.rows[0];
    return user;
  })
  .catch((err)=> {
    console.log("get user by id error:", err.messsage)
  })
};


/** */
const getMapList = function(db) {
  return db.query(`
  SELECT name
  FROM maps
  ORDER BY id DESC;
  `)
  .then((result) => {
    console.log(result.rows)
    const mapList = result.rows;
    return mapList;
  })
  .catch((err)=> {
    console.log(err);
  })
};


module.exports = { getMapList, getUserByID };
