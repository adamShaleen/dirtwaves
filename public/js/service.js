angular.module('dirtWaves').service('service', function($http) {


// login
this.login = function(user) {
    return $http({
        method: 'POST',
        url: '/login',
        data: user
    }).then(function(response) {
        return response.data;
    });
};

// get user/ display me
this.getUser = function() {
    return $http({
        method: 'GET',
        url: '/me'
    }).then(function(response) {
        return response.data;
    });
};

// register new user
this.register = function(user) {
    return $http({
        method: 'POST',
        url: '/users',
        data: user
    }).then(function(response) {
        return response.data;
    });
};

// logout local user
this.logoutLocal = function() {
    return $http ({
        method: 'GET',
        url: '/logout',
    }).then(function(response) {
        return response.data;
    });
};

// logout
this.logout = function() {
    return $http ({
        method: 'GET',
        url: '/logout'
    }).then(function(response) {
        return response.data;
    });
};



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

//-----------------------------------------------------------

// update user
this.updateUser = function(user) {
    return $http ({
        method: "PUT",
        url: '/login/user/' + user._id,
        data: user
    }).then(function(response) {
        return response.data;
    });
};
//-----------------------------------------------------------


// Add order to database

this.submitOrder = function(user, total) {
    return $http ({
        method: 'POST',
        url: '/order',
        data: {orderTotal: total, user: user._id, items: user.cart}
    }).then(function(response) {
        return response.data;
    });
};

// display order

this.displayOrder = function() {
    return $http ({
        method: 'GET',
        url: '/order'
    }).then(function(response) {
        return response.data;
    });
};

});  // closing service tag
