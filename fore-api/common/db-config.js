const Sequelize = require('sequelize');

const sequelize = new Sequelize('fore', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;