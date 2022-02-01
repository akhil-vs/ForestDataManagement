const config = require('config.json');
const mongoose = require('mongoose');
const connectionOptions = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };
mongoose.connect(config.connectionString, connectionOptions);
mongoose.Promise = global.Promise;

module.exports = {
    Account: require('../accounts/account.model'),
    Form: require('../forms/forms.model'),
    RefreshToken: require('../accounts/refresh-token.model'),
    Circle: require('../circles/circles.model'),
    HOA: require('../hoa/hoa.model'),
    isValidId
};

function isValidId(id) {
    return mongoose.Types.ObjectId.isValid(id);
}