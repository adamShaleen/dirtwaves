angular.module('dirtWaves', ['ui.router'])

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'login.html',
            controller: 'loginController',
        })

        .state('shop', {
            url: '/shop',
            templateUrl: 'shop.html',
            controller: 'shopController',
        })

        .state('checkout', {
            url: '/checkout',
            templateUrl: 'checkout.html',
            controller: 'checkoutController',
        })

        .state('admin', {
            url: '/superSecretAdminStuff',
            templateUrl: 'admin.html',
            controller: 'adminController',
        });


        $urlRouterProvider
        .otherwise('/login');


});  // closing app tag
