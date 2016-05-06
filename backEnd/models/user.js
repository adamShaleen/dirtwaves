var mongoose = require('mongoose');
var cartSchema = require('./cart.js');

var Schema = mongoose.Schema;

var userSchema = new Schema ({
    name: {type: String, required: true},
    fbName: {type: String},
    email: {type: String, required: true},
    password: {type: String, required: true},
    cart: [cartSchema]
});

module.exports = mongoose.model('User', userSchema);
