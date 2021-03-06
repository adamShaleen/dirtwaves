angular.module('dirtWaves').controller('trailsController', function($scope, $state, trailsService) {

// display all trails information
$scope.displayTrails = function() {
    trailsService.getTrails().then(function(response) {
        $scope.trails = response;
    });
};

$scope.displayTrails();


// toggle user icon text
$scope.current_user = false;

$scope.toggle_current_user = function() {
    $scope.current_user = !$scope.current_user;
};

// current user
$scope.displayUser = function() {
    trailsService.displayUser().then(function(response) {
        $scope.user_name = response;
    });
};

$scope.displayUser();


// logout
$scope.logout = function() {
    trailsService.logout().then(function(response) {
        $state.go('login');
    });
};


});  // closing controller tag
