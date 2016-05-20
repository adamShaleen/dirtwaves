angular.module('dirtWaves').service('trailsService', function($http) {

// display trails
this.getTrails = function() {
    return $http ({
        method: 'GET',
        url: '/trails'
    }).then(function(response) {
        return response.data;
    });
};

// add new trails
this.addTrails = function(trails) {
    return $http ({
        method: 'POST',
        url: '/trails',
        data: trails
    }).then(function(response) {
        return response.data;
    });
};

// update existing trails
this.updateTrails = function(trails) {
    return $http ({
        method: 'PUT',
        url: '/trails/' + trails._id,
        data: trails
    });
};

// delete existing trails
this.deleteTrails = function(trails) {
    return $http ({
        method: 'DELETE',
        url: '/trails/' + trails._id,
    });
};

// current user
this.displayUser = function() {
    return $http ({
        method: 'GET',
        url: '/login/current_user'
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


});  // closing service tag
