const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const connection = require("./databases/database");
//controllers
const categoriesController = require("./categories/categories-controller.js");
const articlesController = require("./articles/articles-controller.js");

//models

const category = require("./categories/Category");
const article = require("./articles/Article");
//view engine
app.set("view engine", "ejs");

//static
app.use(express.static("public"));
//body-parser
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());
connection.authenticate().then(()=>{
    console.log("connection check");
}).catch((erromsg)=>{
    console.log(erromsg);
})

app.use("/",categoriesController);
app.use("/",articlesController);
app.get("/",(req,res)=>{
    res.render("index");
});
app.listen(8080,()=>{
    console.log("rodando");
})