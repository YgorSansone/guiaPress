const Sequelize = require("sequelize");
const connection = require("../databases/database.js");
const Category = require("../categories/Category");
const Article = connection.define('article',{
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    slug:{
        type: Sequelize.STRING,
        allowNull: false
    },
    body:{
        type: Sequelize.TEXT,
        allowNull: false 
    }
})
//1 para muitos
Category.hasMany(Article);
//1 artigo pertence a 1 categoria
// Article.BelongsTo(Category);
Article.belongsTo(Category);

// Article.sync({force: true});
module.exports = Article;