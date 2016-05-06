var Cart = require('./models/cart.js');
var Order = require('./models/order.js');
var Product = require('./models/product.js');
var User = require('./models/user.js');

module.exports = {

    // USER-------------------------------------------

    facebookLogin: function(request, response, next) {
        console.log(request.user);
        return response.send(request.user);
    },

    addNewUserToDatabase: function(request, response, next) {
        var newUser = new User(request.body);
        newUser.save(request.body, function(error, serverResponse) {
            if (error) {
                return response.status(500).json(error);
            }
            else {
                return response.json(serverResponse);
            }
        });
    },

    displayUsersOnDatabase: function(request, response, next) {
        User.find(request.body, function(error, serverResponse) {
            if(error) {
                return response.status(500).json(error);
            }
            else {
                return response.json(serverResponse);
            }
        });
    },

    displayUserOnDatabaseById: function(request, response, next) {
        User.findById(request.params.id, request.body, function(error, serverResponse) {
            if (error) {
                return response.status(500).json(error);
            }
            else {
                return response.json(serverResponse);
            }
        });
    },

    updateUserOnDatabaseById: function(request, response, next) {
        User.findByIdAndUpdate(request.params.id, request.body, function(error, serverResponse) {
            if (error) {
                return response.status(500).json(error);
            }
            else {
                return response.json(serverResponse);
            }
        });
    },

    deleteUserOnDatabaseById: function(request, response, next) {
        User.findByIdAndRemove(request.params.id, request.body, function(error, serverResponse) {
            if (error) {
                return response.status(500).json(error);
            }
            else {
                return response.status(200).json(serverResponse);
            }
        });
    },

    // PRODUCT------------------------------------------------

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

    displayProductOnDatabaseById: function(request, response, next) {
        Product.findById(request.params.id, function(error, serverResponse) {
            if (error) {
                return response.status(500).json(error);
            }
            else {
                return response.json(serverResponse);
            }
        });
    },

    updateProductOnDatabaseById: function(request, response, next) {
        Product.findByIdAndUpdate(request.params.id, request.body, function(error, serverResponse) {
            if (error) {
                return response.status(500).json(error);
            }
            else {
                return response.json(serverResponse);
            }
        });
    },

    deleteProductOnDatabaseById: function(request, response, next) {
        Product.findByIdAndRemove(request.params.id, request.body, function(error, serverResponse) {
            if (error) {
                return response.status(500).json(error);
            }
            else {
                return response.status(200).json(serverResponse);
            }
        });
    },

    // ORDER-----------------------------------------------

    addOrderToDatabase: function(request, response, next) {
        var newOrder = new Order(request.body);
        newOrder.save(request.body, function(error, serverResponse) {
            if (error) {
                return response.status(500).json(error);
            }
            else {
                return response.json(serverResponse);
            }
        });
    },

    displayOrdersOnDatabase: function(request, response, next) {
        Order.find(function(error, serverResponse) {
            if (error) {
                return response.status(500).json(error);
            }
            else {
                return response.json(serverResponse);
            }
        });
    },

    displayOrderOnDatabaseById: function(request, response, next) {
        Order.findById(request.params.id, function(error, serverResponse) {
            if (error) {
                return response.status(500).json(error);
            }
            else {
                return response.json(serverResponse);
            }
        });
    },

    updateOrderOnDatabaseById: function(request, response, next) {
        Order.findByIdAndUpdate(request.params.id, request.body, function(error, serverResponse) {
            if (error) {
                return response.status(500).json(error);
            }
            else {
                return response.json(serverResponse);
            }
        });
    },

    deleteOrderOnDatabaseById: function(request, response, next) {
        Order.findByIdAndRemove(request.params.id, request.body, function(error, serverResponse) {
            if (error) {
                return response.status(500).json(error);
            }
            else {
                return response.status(200).json(serverResponse);
            }
        });
    },

};  // exports closing tag
