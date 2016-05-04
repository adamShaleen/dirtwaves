var Cart = require('./models/cart.js');
var Order = require('./models/order.js');
var Product = require('./models/product.js');
var User = require('./models/user.js');

module.exports = {

    facebookLogin: function(request, response, next) {
        return response.send(request.user);
    },

    addProductToDatabase: function(request, response, next) {
        var newProduct = new Product(request.body);
        newProduct.save(request.body, function(error, serverResponse) {
            if(error) {
                return response.status(500).json(error);
            }
            else {
                return response.json(serverResponse);
            }
        });
    },

    displayProductsOnDatabase: function(request, response, next) {
        Product.find(function(error, serverResponse) {
            if(error) {
                return response.status(500).json(error);
            }
            else {
                return response.json(serverResponse);
            }
        });
    },

};  // exports closing tag
