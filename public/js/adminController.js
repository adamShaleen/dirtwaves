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

//---------------------------------------------------


// selecting a product on the admin view
$scope.selectProduct = function(product) {
    $scope.selected = product;
};

// add new item to database on admin view
$scope.newProduct = {};
$scope.addNewProduct = function(newProduct) {
    service.addProductToAdmin(newProduct).then(function(response) {
        $scope.displayProducts();
        $scope.product = {};
    });
};

// update item to database on admin view
$scope.selected = {};
$scope.updateProduct = function(product) {
    service.updateProductToAdmin(product).then(function(response) {
        $scope.displayProducts();
        $scope.selected = {};
    });
};

// remove item to database on admin view
$scope.selected = {};
$scope.removeProduct = function(product) {
    service.removeProductToAdmin(product).then(function(response) {
        $scope.displayProducts();
        $scope.selected = {};
    });
};

});  // closing controller tag.
