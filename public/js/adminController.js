angular.module('dirtWaves').controller('adminController', function($scope, service) {

$scope.admin_products = false;

$scope.toggle_admin_products = function() {
    $scope.admin_users = false;
    $scope.admin_orders = false;
    $scope.admin_products = !$scope.admin_products;

};

$scope.displayProducts = function() {
    service.displayProducts().then(function(response) {
        $scope.products = response;
    });
};

$scope.displayProducts();

//-----------------------------------------------------


$scope.admin_users = false;

$scope.toggle_admin_users = function() {
        $scope.admin_products = false;
        $scope.admin_orders = false;
        $scope.admin_users = !$scope.admin_users;
};

$scope.displayAllUsers = function() {
    service.displayAllUsers().then(function(response) {
        $scope.allUsers = response;
    });
};

$scope.displayAllUsers();

//----------------------------------------------------


$scope.admin_orders = false;

$scope.toggle_admin_orders = function() {
    $scope.admin_products = false;
    $scope.admin_users = false;
    $scope.admin_orders = !$scope.admin_orders;
};

$scope.displayAllOrders = function() {
    service.displayOrder().then(function(response) {
        $scope.allOrders = response;
    });
};

$scope.displayAllOrders();

});  // closing controller tag.
