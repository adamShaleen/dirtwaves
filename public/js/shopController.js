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
                $scope.frames.push(response[i].title);
            }
            if (response[i].category === 'bars') {
                $scope.bars.push(response[i].title);
            }
            if (response[i].category === 'stem') {
                $scope.stems.push(response[i].title);
            }
            if (response[i].category === 'tire') {
                $scope.tires.push(response[i].title);
            }
            if (response[i].category === 'acc') {
                $scope.acc.push(response[i].title);
            }
        }
    });
};

$scope.displayProducts();

});  // closing controller tag
