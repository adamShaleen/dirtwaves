var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var orderSchema = new Schema ({
    orderTotal: {type: Number, required: true},
    orderDate: {type: Date, required: true, default: Date.now()},
    user: {type: Schema.Types.ObjectId, ref: "User"},
    products: [{type: Schema.Types.ObjectId, ref: "product"}]
});

module.exports = mongoose.model('Order', orderSchema);
