const chromebookModel = require("./chromebook.model");
const locationModel = require("./location.model");

module.exports = (sequelize, Sequelize) => {
    const Transaction = sequelize.define("transaction", {
      id: {
        type: Sequelize.NUMBER,
        allowNull: false,
        primaryKey: true
      },
      toUser: {
        type: Sequelize.STRING,
        allowNull: true
      },
      fromUser: {
        type: Sequelize.STRING,
        allowNull: true
      },
      dateTime: {
        type: Sequelize.DATE,
        allownull: false
      }
    }, {
        timestamps: false
    });
    
    
    return Transaction;
  };