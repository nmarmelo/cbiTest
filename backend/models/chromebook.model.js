module.exports = (sequelize, Sequelize) => {
    const Chromebook = sequelize.define("chromebook", {
      serialNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
      },
      lastKnownUser: {
        type: Sequelize.STRING,
        allowNull: true
      }
    }, {
        timestamps: false
    });
  
    return Chromebook;
  };