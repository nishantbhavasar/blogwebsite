//module require for app
const express = require("express");
const ejs = require("ejs");
const { v4: uuid } = require("uuid");
const database = require("./dbconnection/dbconnection");
database.databaseConnection();
//app and midelware setting
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));


//server listening page
app.listen(3000, () => {
  console.log("your server running on port 3000");
  
});


//Array of all blogs
/*
{
  title: 'title',
  contant: 'jthis is my first blof',
  blogId: '0fe03d3e-6085-49b4-807c-6d664693ab9b',
  currenttime: '30/10/2022'
}
*/

const blogArray = [];

//home page || blog show page
app.get("/", async (req, res) => {
  let blogArray = await database.getDataFromDatabase();
  res.render("index", {
    blogArray,
  });
});

//about page
const about = "We are here for you and your service is our first priority";
app.get("/about", (req, res) => {
  res.render("about", {
    heading: "About Us",
    text: about,
  });
});

//contact page
const contact = `Contact us as below details 
email: - nishant@gmail.com
mobile: - 1234567890`;
app.get("/contact", (req, res) => {
  res.render("contact", {
    heading: "Contact Us",
    text: contact,
  });
});

//Error page
app.get("/error", (req, res) => {
  res.send("404 Data Note Find");
});

//Add blog page
app.get("/compose", (req, res) => {
  res.render("compose", {});
});

//Add blog page
app.post("/compose", async (req, res) => {
  if (req.body.title == "" || req.body.contant == "") {
    res.redirect("/error");
  }
  await database.storeDataToDatabase(
    req.body.title,
    req.body.contant
  );
  res.redirect("/");
});

//login page render
app.get("/login", (req, res) => {
  res.render("login");
});

// dyanamic page create
// app.get("/:dynamic", async (req, res) => {
//   console.log('')
//   let data = await database.getBlog(req.params.dynamic);
//   console.log(data + ' from app ');
//   res.render('dynamic', {data});
// });

app.get('/blogs/:dynamic', async (req, res) => {
  let data = await database.getBlog(req.params.dynamic);

  res.render('dynamic',{data});
})

//git add .
//git commit "message"
//git push -u origin master

// create table blog(
//   blogid varchar(255) primary Key,
//   title varchar(255),
//   contant text,
//   cuurenttime date
// );

// insert into blog values ('7530d364-8a62-4145-a183-2e26b7486dd8','hello','adsgfasfdgasdfasdf','30/10/2022');
