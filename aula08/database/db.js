const Sequelize = require("sequelize")
const sequelize = new Sequelize('crud', 'root', 'luciana', {
    dialect: 'mysql',
    host: 'localhost',
    port: 3003
});

module.exports = sequelize;