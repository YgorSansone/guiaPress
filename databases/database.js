const Sequelize = require("sequelize");
const conn = new Sequelize('guiaPress','root','123456',{
    host: 'localhost',
    dialect: 'mysql'
});

// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123456';