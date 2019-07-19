const Sequalize = require('sequelize');
const seq = new Sequalize({
    dialect: 'postgres',
    database: 'pg_playground'
});

module.exports = {seq, Sequalize};