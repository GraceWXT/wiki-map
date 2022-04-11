// make functions for each db query

const getMapList = function(db) {
  db.query(`
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


const getUserByID = function(db) {
  // get the user_id from cookie => req.cookies[user_id]
  // const user (obj) = query result row[0] from database

  db.query(`
  SELECT *
  FROM users
  WHERE users.id = $1
  `, [id])
  .then((result) => {
    console.log(result.rows[0])
    const user = result.rows[0];
    return user;
  })
  .catch((err)=> {
    console.log(err.messsage)
  })
};

module.exports = { getMapList, getUserByID };
