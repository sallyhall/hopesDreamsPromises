(function() {
  'use strict';

  angular
    .module('hopesAndDreams',[
      'ngRoute',
      'underscore'
    ])
    .config(function($routeProvider){
      $routeProvider
      .when('/',{
        templateUrl: 'views/shopper/list.html',
        controller: 'DreamsController'
      })
      .when('/dreams/:dreamId', {
        templateUrl: 'views/shopper/detail.html',
        controller: 'DreamsController'
      })
      .when('/dreams/:dreamId/review',{
        templateUrl: 'views/shopper/review.html',
        controller: 'DreamsController'
      })
      .when('/cart',{
        templateUrl: 'views/shopper/cart.html',
        controller: 'CartController'
      })
      .when('/checkout',{
        templateUrl: 'views/shopper/receipt.html',
        controller: 'CartController'
      })
      .when('/admin/add',{
        templateUrl: 'views/admin/add.html',
        controller: 'AdminController'
      })
      .when('/admin',{
        templateUrl: 'views/admin/list.html',
        controller: 'AdminController',
      })
      .when('/admin/:dreamId',{
        templateUrl: 'views/admin/detail.html',
        controller: 'AdminController'
      })
      .when('/admin/:dreamId/edit',{
        templateUrl: 'views/admin/edit.html',
        controller: 'AdminController'
      });
    });

    angular
      .module('underscore',[])
      .factory('_',function($window){
        return $window._;
      });

}());
