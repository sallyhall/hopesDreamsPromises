(function() {
  'use strict';

  angular
  .module('hopesAndDreams')
  .controller('DreamsController', function ($scope, DreamFactory, $routeParams) {
    DreamFactory.getDreams().success(function(dreams){
      $scope.dreams = dreams;
      if($routeParams.dreamId){
        $scope.dream = DreamFactory.getDream($scope.dreams,$routeParams.dreamId);
      }
    });
    $scope.addToCart = function(dream){
      DreamFactory.addToCart(dream);
    };
    $scope.addReview = function(dream,review){
      DreamFactory.addReview(dream,review);
    };
  })
  .controller('AdminController', function($scope,DreamFactory,AdminServices){
    DreamFactory.getDreams().success(function(dreams){
      $scope.dreams = dreams;
    });
    $scope.addDream = function(dream){
      AdminServices.createDream(dream);
    };
    $scope.deleteDream = function(dream){
      AdminServices.deleteDream(dream);
    };
    $scope.editDream = function(dream){
      AdminServices.editDream(dream);
    };

  })
  .controller('CartController', function ($scope,CartServices) {
    $scope.cartDreams = CartServices.getPurchases();

    $scope.removeFromCart = function(dream){
      CartServices.removeFromCart(dream);
    };
    $scope.updateQuantity = function(dream, num){
      console.log("controller: changing quantity of "+dream.title+" to "+num);
      CartServices.updateQuantity(dream,num);
    };
    $scope.emptyCart = function(){
      CartServices.clearCart();
    };
    $scope.removeFromCart = function(dream){
      CartServices.removeFromCart(dream);
    };
    $scope.totalCost = CartServices.getTotalCost($scope.cartDreams);

  });

}());
