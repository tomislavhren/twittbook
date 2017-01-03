var mongoose = require('mongoose');

var connectionSchema = mongoose.Schema({
        data: {
                email: String,
                token: String
        }
});

module.exports = mongoose.model('Connections', connectionSchema);