module.exports = {
  HOST: "test",
  PORT: "1433",
  USER: "test",
  PASSWORD: "test",
  DB: "test",
  dialect: "mssql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};