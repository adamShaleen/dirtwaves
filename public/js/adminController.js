angular.module('dirtWaves').controller('adminController', function($scope, service, trailsService) {

// initial value for background
$scope.admin_background = true;

$scope.admin_products = false;

$scope.toggle_admin_products = function() {
    $scope.admin_users = false;
    $scope.admin_orders = false;
    $scope.admin_trails = false;
    $scope.admin_background = false;
    $scope.admin_products = !$scope.admin_products;
    if (!$scope.admin_products) {
        $scope.admin_background = true;
    }
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
        $scope.admin_trails = false;
        $scope.admin_background = false;
        $scope.admin_users = !$scope.admin_users;
        if (!$scope.admin_users) {
            $scope.admin_background = true;
        }
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
    $scope.admin_trails = false;
    $scope.admin_background = false;
    $scope.admin_orders = !$scope.admin_orders;
    if (!$scope.admin_orders) {
        $scope.admin_background = true;
    }
};

$scope.displayAllOrders = function() {
    service.displayOrder().then(function(response) {
        $scope.allOrders = response;
    });
};

$scope.displayAllOrders();

//---------------------------------------------------


// selecting a item on the admin view
$scope.selectProduct = function(product) {
    $scope.selected = product;
};

// deselecting a item
$scope.deselectProduct = function() {
    $scope.selected = {};
};

// add new item to database on admin view
$scope.newProduct = {};
$scope.addNewProduct = function(newProduct) {
    service.addProductToAdmin(newProduct).then(function(response) {
        $scope.displayProducts();
        $scope.newProduct = {};
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



//TRAILS---------------------------------------------------------

$scope.admin_trails = false;

$scope.toggle_trails = function() {
    $scope.admin_users = false;
    $scope.admin_orders = false;
    $scope.admin_products = false;
    $scope.admin_background = false;
    $scope.admin_trails = !$scope.admin_trails;
    if (!$scope.admin_trails) {
        $scope.admin_background = true;
    }
};


$scope.displayTrails = function() {
    trailsService.getTrails().then(function(response) {
        $scope.trails = response;
    });
};

$scope.displayTrails();

$scope.trails = {};
$scope.addTrails = function(trails) {
    trailsService.addTrails(trails).then(function(response) {
        $scope.displayTrails();
        $scope.trails = {};
    });
};

$scope.selected = {};
$scope.updateTrails = function(trails) {
    trailsService.updateTrails(trails).then(function(response) {
        $scope.displayTrails();
        $scope.selected = {};
    });
};


$scope.selected = {};
$scope.deleteTrails = function(trails) {
    trailsService.deleteTrails(trails).then(function(response) {
        $scope.displayTrails();
        $scope.selected = {};
    });
};

// Background-------------------------------------------------------

// $scope.admin_background = true;
// $scope.toggle_admin_background = function() {
//     if ($scope.admin_products || $scope.admin_users || $scope.admin_orders || $scope.admin_trails) {
//         $scope.admin_background = false;
//     }
// };

});  // closing controller tag.
