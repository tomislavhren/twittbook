// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({

    local: {
        email: String,
        password: String
    },
    facebook: {
        accessToken: String,
        expiresIn: Number,
        name: String,
        picture: Object,
        userID: String,
        lastTokenUpdate: Date
    },
    twitter: {
        accessToken: String,
        accessTokenSecret: String,
        lastTokenUpdate: String,
        screenName: String,
        userID:String
    }

});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);