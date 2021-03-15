const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const connection = require("./databases/database");
//controllers
const categoriesController = require("./categories/categories-controller");
const articlesController = require("./articles/articles-controller");
const usersController = require("./user/user-controller");

//models
const Article = require("./articles/Article");
const Category = require("./categories/Category");
const User = require("./user/User");

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
app.use("/",usersController);
app.get("/",(req,res)=>{
    Article.findAll(
        {
            order: [['id', 'DESC']],
            limit: 4
        }
    ).then(articles =>{
        Category.findAll().then((categories) =>{
            res.render("index",{articles: articles, categories: categories});
        })
       
    })
    
});
app.get("/:slug",(req,res)=>{
    var slug = req.params.slug;
    Article.findOne(
        {where: {slug: slug}}
        ).then((article)=>{
            if(article != undefined){
                Category.findAll().then((categories) =>{
                    res.render("article",{article: article, categories: categories});
                })
            }else{
                res.redirect("/")
            }
    }).catch((err)=>{
        res.redirect("/")
    })
})
app.get("/category/:slug",(req,res)=>{
    var slug = req.params.slug;
    Category.findOne(
        {
            where: {slug: slug},
            include: [{model: Article}]
        }
    ).then((category)=>{
        if(category != undefined){
            Category.findAll().then(categories =>{
            res.render("index",{articles: category.articles, categories: categories})    
            })
        }else{
            res.redirect("/")
        }
    }).catch((err)=>{
        res.redirect("/")
    })

})
app.listen(8080,()=>{
    console.log("rodando");
})