const dbConfig = require("../config/db_config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Define models
db.chromebooks = require("./chromebook.model.js")(sequelize, Sequelize);
db.locations = require("./location.model.js")(sequelize, Sequelize);
db.transactions = require("./transaction.model.js")(sequelize, Sequelize);

// Define associations
db.chromebooks.belongsTo(db.locations);

db.transactions.belongsTo(db.locations, {
    as: "fromLocation"
});

db.transactions.belongsTo(db.locations, {
    as: 'toLocation'
});

db.transactions.belongsTo(db.chromebooks, {
    foreignKey: 'serialNumber'
});

// Final export
module.exports = db;
