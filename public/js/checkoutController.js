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
            console.log($scope.user_name);
        });
    };

    $scope.displayUser();
    //-----------------------------------------------------------


// display user's shopping cart at checkout


});  // closing controller tag
