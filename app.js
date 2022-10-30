//module require for app
const express = require("express");
const ejs = require("ejs");
const { v4: uuid } = require("uuid");

//app and midelware setting
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

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
app.get("/", (req, res) => {
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
app.post("/compose", (req, res) => {
  if (req.body.title == "" || req.body.contant == "") {
    res.redirect("/error");
  }
  let date = new Date();
  let toDayDate = date.toLocaleDateString();
  let newBlogId = uuid();
  req.body.blogId = newBlogId;
  req.body.currenttime = toDayDate;
  blogArray.push(req.body);
  res.redirect("/");
});

//login page render
app.get("/login", (req, res) => {
  res.render("login");
});

//server listening page
app.listen(3000, () => {
  console.log("your server running on port 3000");
});
