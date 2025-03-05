const { Sequelize, DataTypes } = require("sequelize");
const dbConfig = require("./dbConfig");

const sequelize = new Sequelize(
  dbConfig.development.database,
  dbConfig.development.username,
  dbConfig.development.password,
  {
    host: dbConfig.development.host,
    dialect: dbConfig.development.dialect,
    logging: dbConfig.development.logging,
    dialectOptions: dbConfig.development.dialectOptions,
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("../models/userSchema")(sequelize, Sequelize);
db.Hotel = require("../models/HotelSchema")(sequelize, Sequelize);
db.Booking = require("../models/BookingSchema")(sequelize, Sequelize);
db.Checkin = require("../models/CheckinSchema")(sequelize, Sequelize);

module.exports = db;
