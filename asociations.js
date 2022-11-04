const User = require('./models').Users
const Company = require('./models').Company

User.belongsTo(Company)