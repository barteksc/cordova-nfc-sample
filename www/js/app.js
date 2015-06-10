(function () {
    angular.module('nfcApp', ['ionic'])

        .run(function ($ionicPlatform) {
            $ionicPlatform.ready(function () {

                if (window.cordova && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                }
                if (window.StatusBar) {
                    StatusBar.styleDefault();
                }
            });
        }).config(function ($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('tab', {
                    url: "/tab",
                    abstract: true,
                    templateUrl: "templates/tabs.html"
                })
                .state('tab.read', {
                    url: '/read',
                    views: {
                        'readTab': {
                            templateUrl: 'templates/readTab.html',
                            controller: 'ReadCtrl as vm'
                        }
                    }
                })
                .state('tab.write', {
                    url: '/write',
                    views: {
                        'writeTab': {
                            templateUrl: 'templates/writeTab.html',
                            controller: 'WriteCtrl as vm'
                        }
                    }
                });

            $urlRouterProvider.otherwise('/tab/read');
        });
}());