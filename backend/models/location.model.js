module.exports = (sequelize, Sequelize) => {
    const Location = sequelize.define("location", {
      id: {
        type: Sequelize.NUMBER,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true
      }
    }, {
        timestamps: false
    });
  
    return Location;
  };