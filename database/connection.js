// Import Sequelize to create connection
const { Sequelize } = require('sequelize');

// Passing connection parameters separately
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'mysql'
});

// Export module
module.exports = sequelize;