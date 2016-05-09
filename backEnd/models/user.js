var mongoose = require('mongoose');
var cartSchema = require('./cart.js');

var Schema = mongoose.Schema;

var userSchema = new Schema ({
    name: {type: String},
    fbId: {type: String},
    email: {type: String},
    password: {type: String},
    cart: [cartSchema]
});

module.exports = mongoose.model('User', userSchema);
