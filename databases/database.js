const Sequelize = require("sequelize");
const conn = new Sequelize('guiaPress','root','123456',{
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00'
});

module.exports = conn;