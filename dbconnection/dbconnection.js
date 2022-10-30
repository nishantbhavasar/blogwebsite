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
  await connection.query("select * from blog", (err, result) => {
    return result;
  });
}
getDataFromDatabase();
function storeDataToDatabase(blogId, title, contant, date) {
  let query = `insert into blog (blogid,title,contant,curenttime) values ('${blogId}','${title}','${contant}','${date}');`;
  connection.query(query, (err, result) => {});
}

module.exports = {
  databaseConnection,
  getDataFromDatabase,
  storeDataToDatabase,
};
