angular.module('dirtWaves').controller('adminController', function($scope, service) {


$scope.displayProducts = function() {
    service.displayProducts().then(function(response) {
        $scope.products = response;
    });
};

$scope.displayProducts();

$scope.displayAllUsers = function() {
    service.displayAllUsers().then(function(response) {
        $scope.allUsers = response;
    });
};

$scope.displayAllUsers();

$scope.displayAllOrders = function() {
    service.displayOrder().then(function(response) {
        $scope.allOrders = response;
    });
};

$scope.displayAllOrders();

});  // closing controller tag.
