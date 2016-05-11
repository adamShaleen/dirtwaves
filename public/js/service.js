angular.module('dirtWaves').service('service', function($http) {

// display current user--------------------------------------
this.displayUser = function() {
    return $http ({
        method: 'GET',
        url: '/login/current_user'
    }).then(function(response) {
        return response.data;
    });
};
//-----------------------------------------------------------

// display products
this.displayProducts = function() {
    return $http ({
        method: "GET",
        url: '/products'
    }).then(function(response) {
        return response.data;
    });
};
//------------------------------------------------------------

// add item to cart
this.addItemToCart = function(product) {
    return $http ({
        method: "PUT",
        url: '/cart/addItem',
        data: product
    }).then(function(response) {
        return response.data;
    });
};



});  // closing service tag
