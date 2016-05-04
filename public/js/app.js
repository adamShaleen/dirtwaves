angular.module('dirtWaves', ['ui.router'])

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'login.html',
            controller: 'loginController.js',
        })

        .state('shop', {
            url: '/shop',
            templateUrl: 'shop.html',
            controller: 'shopController.js',
        });


        $urlRouterProvider
        .otherwise('/login');


});  // closing app tag
