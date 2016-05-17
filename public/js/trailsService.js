angular.module('dirtWaves').service('trailsService', function($http) {

this.getTrails = function() {
    return $http ({
        method: 'GET',
        url: '/trails'
    }).then(function(response) {
        return response.data;
    });
};


this.addTrails = function(trails) {
    return $http ({
        method: 'POST',
        url: '/trails',
        data: trails
    }).then(function(response) {
        return response.data;
    });
};


this.updateTrails = function(trails) {
    return $http ({
        method: 'PUT',
        url: '/trails/' + trails._id,
        data: trails
    });
};

this.deleteTrails = function(trails) {
    return $http ({
        method: 'DELETE',
        url: '/trails/' + trails._id,
    });
};

});  // closing service tag
