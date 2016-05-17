angular.module('dirtWaves').controller('trailsController', function($scope, $state, trailsService) {

$scope.displayTrails = function() {
    trailsService.getTrails().then(function(response) {
        $scope.trails = response;
    });
};

$scope.displayTrails();


});  // closing controller tag
