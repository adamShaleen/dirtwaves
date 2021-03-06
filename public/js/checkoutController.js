angular.module("dirtWaves").controller("checkoutController", function($scope, service, $state) {

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
        $scope.displaytotals();
    });
};

$scope.displayUser();

//-----------------------------------------------------------

// logout user
$scope.logout = function() {
    service.logout().then(function(response) {
        $state.go('login');
    });
};

//--------------------------------------------------------------

// add qty 1
$scope.addQty = function(product) {
    for (var i = 0; i < $scope.user_name.cart.length; i++) {
        if ($scope.user_name.cart[i] === product) {
            $scope.user_name.cart[i].qty++;
            service.updateUser($scope.user_name);
            $scope.displaytotals();
        }
    }
};

// remove 1 qty
$scope.removeQty = function(product) {
    for (var i = 0; i < $scope.user_name.cart.length; i++) {
        if ($scope.user_name.cart[i] === product) {
            if ($scope.user_name.cart[i].qty !== 1) {
                $scope.user_name.cart[i].qty--;
                service.updateUser($scope.user_name);
                $scope.displaytotals();
            }
        }
    }
};

// remove single item from shopping cart on checkout page
$scope.removeItemFromCart = function(product) {
    for (var i = 0; i < $scope.user_name.cart.length; i++) {
        if ($scope.user_name.cart[i] === product) {
            $scope.user_name.cart.splice($scope.user_name.cart[i], 1);
            service.updateUser($scope.user_name);
            $scope.displaytotals();
        }
    }
};

// display shopping cart totals on checkout page
$scope.subtotal = 0;
$scope.taxAndShipping = 0;
$scope.total = 0;

$scope.displaytotals = function() {
    $scope.subtotal = 0;
    $scope.taxAndShipping = 0;
    $scope.total = 0;
    for (var i = 0; i < $scope.user_name.cart.length; i++) {
            $scope.subtotal += ($scope.user_name.cart[i].id.price * $scope.user_name.cart[i].qty);
            $scope.taxAndShipping += ($scope.subtotal * 0.047) + 10;
            $scope.total = $scope.subtotal + $scope.taxAndShipping;
            service.updateUser($scope.user_name);
    }
};

//----------------------------------------------------------------------

// toggling between order summary and confirmation information
$scope.checkoutAndConfirmation = false;

$scope.toggleCheckoutAndConfirmation = function() {
    if ($scope.user_name.cart.length) {
    $scope.checkoutAndConfirmation = !$scope.checkoutAndConfirmation;
    }
};
//----------------------------------------------------------------------


// submit order and display the most recent order on confirmation page
$scope.submitOrder = function(user, total) {
    if ($scope.user_name.cart.length) {
    service.submitOrder(user, total).then(function(response) {
        $scope.user_name.cart = [];
        $scope.user_name.orders.push(response._id);
        service.updateUser($scope.user_name).then(function(response) {
            $scope.displayUser();
        });
    });
} else {
    alert('Your shopping cart is empty');
    }
};

$scope.findArrivalDate = function(date){

    var dateNum = Date.parse(new Date(date));       // todays date turned into milliseconds
    dateNum += 259200000;                           // adds 3 days worth of milliseconds
    return new Date(dateNum);                       // turning number back into date

};


});  // closing controller tag
