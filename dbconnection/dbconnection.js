const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "nishant",
  password: "Nishant@123",
  database: "nishant",
});

function databaseConnection() {
  connection.connect((err) => {
    console.log("Database Connected");
  });
}

async function getDataFromDatabase() {
  return await new Promise((resolve, reject) => {
    connection.query('select * from blog ', (err, result, field) => {
      if (err) {
        reject();
      }
      else {
        resolve(result);
      }
    })
  })
}
getDataFromDatabase();
function storeDataToDatabase(title, contant) {
  let query = `insert into blog (blogid,title,contant,curenttime) values (uuid(),'${title}','${contant}',CURDATE());`;
  connection.query(query, (err, result) => {});
}

async function getBlog(blogid) {
  return await new Promise((resolve, reject) => {
    connection.query('select * from blog where blogid = ?',[blogid], (err, result, field) => {
      if (err) {
        reject();
      }
      else {
        resolve(result);
      }
    })
  })
}

module.exports = {
  databaseConnection,
  getDataFromDatabase,
  storeDataToDatabase,
  getBlog,
};
