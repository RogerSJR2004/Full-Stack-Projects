const { Sequelize } = require('sequelize'); 
const eventDB = new Sequelize('events_db', 'root', '', { 
host: 'localhost', 
dialect: 'mariadb' 
}); 

module.exports = eventDB; 