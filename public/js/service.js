angular.module('dirtWaves').service('service', function($http) {

// login with facebook
this.facebookLogin = function(login) {
    return $http ({
        method: 'GET',
        url: '/login/facebook',
        data: login
    }).then(function(response) {
        return response.data;
    });
};

});  // closing service tag
