angular.module('dirtWaves').controller('shopController', function($scope, service) {

// toggle user icon text
$scope.current_user = false;

$scope.toggle_current_user = function() {
    $scope.current_user = !$scope.current_user;
};
//----------------------------------------------------

// display current user

$scope.displayUser = function() {
    service.displayUser().then(function(response) {
        $scope.user_name = response;
    });
};

$scope.displayUser();
//-----------------------------------------------------------

// display products

$scope.frames = [];
$scope.bars = [];
$scope.stems = [];
$scope.tires = [];
$scope.acc = [];

$scope.displayProducts = function() {
    service.displayProducts().then(function(response) {
        for (var i = 0; i < response.length; i++) {
            if (response[i].category === 'frame') {
                $scope.frames.push(response[i]);
            }
            if (response[i].category === 'bars') {
                $scope.bars.push(response[i]);
            }
            if (response[i].category === 'stem') {
                $scope.stems.push(response[i]);
            }
            if (response[i].category === 'tire') {
                $scope.tires.push(response[i]);
            }
            if (response[i].category === 'acc') {
                $scope.acc.push(response[i]);
            }
        }
    });
};

$scope.displayProducts();
//--------------------------------------------------------------

// product select
$scope.product_img_toggle = false;

$scope.selectProduct = function(product) {
    $scope.selectedProduct = product;
    if ($scope.product_img_toggle === false) {
        $scope.product_img_toggle = !$scope.product_img_toggle;
    }
};
//-------------------------------------------------------------

// toggle between background image and product content

$scope.toggleProductImg = function() {
    $scope.product_img_toggle = !$scope.product_img_toggle;
};
//---------------------------------------------------------------

// add to cart

$scope.addToCartModal = {};
$scope.toggleAddToCartModal = function(id) {
    $scope.addToCartModal[id] = true;
};


$scope.addToCart = function(product) {
    service.addItemToCart().then(function(response) {
        if (!$scope.user_name.cart) {
            $scope.user_name.cart = [];
        }
        $scope.user_name.cart.push({id: product, qty: 1});
        service.updateUser($scope.user_name);
        console.log($scope.user_name);
    });
};


//---------------------------------------------------------------


});  // closing controller tag
