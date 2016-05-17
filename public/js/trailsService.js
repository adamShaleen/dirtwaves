angular.module('dirtWaves').service('trailsService', function($http) {

this.getTrails = function() {
    return $http ({
        method: 'GET',
        url: '/trails'
    }).then(function(response) {
        return response.data;
    });
};





});  // closing service tag
