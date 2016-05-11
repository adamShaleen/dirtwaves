angular.module("dirtWaves").controller("checkoutController", function($scope, service) {

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


// add qty 1

$scope.addQty = function(product) {
    for (var i = 0; i < $scope.user_name.cart.length; i++) {
        if ($scope.user_name.cart[i] === product) {
            $scope.user_name.cart[i].qty++;
            service.updateUser($scope.user_name);
        }
    }
};


// remove single item from shopping cart on checkout page

$scope.removeItemFromCart = function(product) {
    for (var i = 0; i < $scope.user_name.cart.length; i++) {
        if ($scope.user_name.cart[i] === product) {
            $scope.user_name.cart.splice($scope.user_name.cart[i], 1);
            service.updateUser($scope.user_name);
        }
    }
};

// display shopping cart totals on checkout page



});  // closing controller tag
