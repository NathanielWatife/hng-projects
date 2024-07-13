const { Sequelize } = require('sequelize');
const config = require('../config/database')[process.env.NODE_ENV || 'development'];

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const db = {
    Sequelize,
    sequelize,
    User: require('./user')(sequelize, Sequelize),
    Organisation: require('./organisation')(sequelize, Sequelize),
    UserOrganisation: require('./userOrganisation')(sequelize, Sequelize)
};

db.User.belongsToMany(db.Organisation, {
    through: db.UserOrganisation
});
db.Organisation.belongsToMany(db.User, {
    through: db.UserOrganisation
});


module.exports = db;