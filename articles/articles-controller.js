const express = require('express');
const router = express.Router();
const Categories = require("../categories/Category")
const Article = require("./Article")
const slugify = require("slugify");
const Category = require('../categories/Category');
router.get("/admin/articles",(req,res)=>{
    Article.findAll({
        include:[{model: Categories}]
    }).then((articles)=>{
        res.render("admin/articles/index",{
            articles: articles
        });
    });
})
router.get("/admin/articles/new",(req,res)=>{
    Categories.findAll().then((categories)=>{
        res.render("admin/articles/new",{
            categories: categories
        });
    })
})
router.post("/articles/save",(req,res)=>{
    var title = req.body.title;
    var body = req.body.body;
    var categoryId = req.body.category;
    Article.create({
        title: title,
        body: body,
        slug: slugify(title).toLowerCase(),
        categoryId: categoryId
    }).then(()=>{
        res.redirect("/admin/articles");
    });  
})

router.post("/articles/delete", (req, res) => {
    var id = req.body.id;
    if (id != undefined) {
        if (!isNaN(id)) {
            Article.destroy({
                where: { id: id }
            }).then(() => {
                res.redirect("/admin/articles");
            })
        } else {
            res.redirect("/admin/articles");
        }
    } else {
        res.redirect("/admin/articles");
    }
});
router.get("/admin/articles/edit/:id", (req, res) => {
    var id = req.params.id;
    if (!isNaN(id)) {
        Article.findByPk(id).then((article) => {
            if (article != undefined) {
                Category.findAll().then(categories =>{
                    res.render("admin/articles/edit", {
                        article: article,
                        categories: categories
                    });
                })
                
            } else {
                res.redirect("/admin/articles/");
            }
        }).catch((error) => {
            res.redirect("/admin/articles/");  
        });
    }else{
        res.redirect("/admin/articles/"); 
    }
})
router.post("/articles/update",(req,res)=>{
    var title = req.body.title;
    var id = req.body.id;
    var body = req.body.body;
    var categoryId = req.body.categoryId;
    Article.update({title: title,
        body: body,
        slug: slugify(title).toLowerCase(),
        categoryId: categoryId},{
        where:{id:id}
    }).then(()=>{
        res.redirect("/admin/articles/");  
    }).catch((error)=>{
        res.redirect("/admin/articles/");  
    })
})
//paginacao
router.get("/articles/page/:num",(req,res)=>{
    var page = req.params.num;
    var offset = 0;
    if(isNaN(page) || page == 1){
        offset = 0;
    }else{
        offset = parseInt(page - 1) * 2; 
    }
     
    Article.findAndCountAll(
        {limit: 2,
        offset: offset,
        order: [['id', 'DESC']] }
    ).then(articles=>{
        var next;
        if(offset + 4 > articles.count){
            next = false;
        }else{
            next = true;
        }
        var result = {
            page: parseInt(page), 
            articles : articles,
            next: next
        }
        Category.findAll().then(categories => {
            res.render("admin/articles/page", {
                result: result, categories: categories
            })
        })
        // res.json(result);
    });
})

module.exports = router;