const cfg = require(global.constant.DIR_CONFIG + 'database.json');
const Sequelize = require('sequelize');

const db = new Sequelize(cfg.database, cfg.username, cfg.password, {
    host: cfg.host,
    dialect: cfg.dialect,
    logging: !cfg.logging ? false : eval(cfg.logging),
    timezone: cfg.timezone
});

module.exports = [db, Sequelize.Model, Sequelize.DataTypes, Sequelize.Op];