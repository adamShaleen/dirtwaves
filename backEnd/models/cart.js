var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var cartSchema = new Schema ({
    products: [
        {
            id: {type: Schema.Types.ObjectId, ref: "Product"},
            qty: {type: Number}
        }
    ]
});

mongoose.model('Cart', cartSchema);
module.exports = cartSchema;
