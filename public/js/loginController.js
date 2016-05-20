angular.module('dirtWaves').controller('loginController', function($scope, $state, service) {

// Hides and shows login inputs when login button is clicked
$scope.toggleLogin = false;

$scope.toggleLoginOnClick = function() {
    $scope.toggleLogin = !$scope.toggleLogin;
};
//-----------------------------------------------------------

// local auth login
$scope.login = function() {
    service.login($scope.credentials).then(function(response) {
        $state.go('shop');
    });
};

// register
$scope.register = function() {
    service.register($scope.credentials).then(function(response) {
        if(response) {
            $scope.login();
        }
    });
};


});  // closing controller tag
