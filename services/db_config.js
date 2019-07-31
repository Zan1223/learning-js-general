const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'postgres',
    database: 'koa_post_db',
});

module.exports = {Sequelize, sequelize};

