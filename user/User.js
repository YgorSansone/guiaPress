const Sequelize = require("sequelize");
const connection = require("../databases/database");
const User = connection.define('user',{
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false
    }
});
// User.sync({force: true});
module.exports = User;