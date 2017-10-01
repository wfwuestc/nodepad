var Sequelize = require('sequelize')
var path = require('path');

const sequelize = new Sequelize(undefined, undefined, undefined, {
  host: 'localhost',
  dialect: 'sqlite',
  storage: path.join(__dirname, '../database/database.sqlite')
});

var Note = sequelize.define('notes', {
	content:{
		type: Sequelize.STRING
	},
	title:{
		type: Sequelize.STRING
	},
	uid:{
		type: Sequelize.STRING
	},
	username:{
		type: Sequelize.STRING
	},
  createdAt: {
    type: Sequelize.STRING
  },
  updatedAt: {
    type: Sequelize.STRING
  }
}, {timestamps: false})
Note.sync()
module.exports = Note;

