var mongoose = require('mongoose');
var cartSchema = require('./cart.js');
var bcrypt = require('bcryptjs');

var Schema = mongoose.Schema;

var userSchema = new Schema ({
    name: {type: String},
    fbId: {type: String},
    email: {type: String, unique: true},
    password: {type: String},
    cart: [
        {
            id: {type: Schema.Types.ObjectId, ref: "Product"},
            qty: {type: Number}
        }
    ],
    orders: [{type: Schema.Types.ObjectId, ref: "Order"}]
});


userSchema.pre('save', function(next) {
    var user = this;
    if (!user.isModified('password'))
        return next();
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;
    return next(null, user);
});


userSchema.methods.verifyPassword = function(requestBodyPassword) {
    var user = this;
    return bcrypt.compareSync(requestBodyPassword, user.password);
};


module.exports = mongoose.model('User', userSchema);
