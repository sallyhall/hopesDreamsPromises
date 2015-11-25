(function() {
  'use strict';

  angular
  .module('hopesAndDreams')
  .factory('DreamFactory',function ($http,_) {
    var url = 'http://tiny-tiny.herokuapp.com/collections/hopesAndDreams';

    var getDreams = function () {
      return $http.get(url);
    };

    var getDream = function(dreams,dreamId){
      return  _.where(dreams,{_id : dreamId})[0];
    };


    var addReview = function(dream, review){
      if(!dream.reviews){
        dream = angular.extend({},dream,{reviews:[review]});
        angular.extend({},dream,{averageRating:review.rating});
      }else{
        dream.reviews.push(review);
        var totalRating = 0;
        _.each(dream.reviews,function (review) {
          totalRating+=parseInt(review.rating);
        })
        dream.averageRating = Math.floor((totalRating/dream.reviews.length)*10)/10;
      };
      return $http.put(url + '/' + dream._id,dream);
    };

    var addToCart = function(dream){
      var cartArray = JSON.parse(localStorage.getItem("shoppingCart"));
      if(!cartArray) {cartArray=[];}
      var idx = _.chain(cartArray).pluck("_id").indexOf(dream._id).value();
      if(idx===-1){
        dream = angular.extend({},dream,{quantity:1});
        cartArray.push(dream);

      }
      else{
        cartArray[idx].quantity++;
      }
      localStorage.setItem("shoppingCart",JSON.stringify(cartArray));
      console.log(cartArray);
    };

    return{
      getDreams: getDreams,
      getDream: getDream,
      addToCart: addToCart,
      addReview: addReview
    };
  })
  .factory('AdminServices', function($http,_){
    var url = 'http://tiny-tiny.herokuapp.com/collections/hopesAndDreams';

    var createDream = function(dream){
      angular.extend(dream,{averageRating:"Not Yet Rated"});
      return $http.post(url, dream);
    };

    var editDream = function(dream){
      return $http.put(url + '/' + dream._id,dream);
    };

    var deleteDream = function(dream){
      return $http.delete(url + '/' + dream._id);
    };
    return{
      createDream: createDream,
      editDream: editDream,
      deleteDream: deleteDream
    }
  })
  .factory('CartServices',function (_) {


    var getPurchases = function(){
      var cartArray = JSON.parse(localStorage.getItem("shoppingCart"));
      return cartArray;
    };

    var removeFromCart = function(dream){
      var cartArray = JSON.parse(localStorage.getItem("shoppingCart"));
      cartArray = _.filter(cartArray,function(cartDream){
        return (cartDream._id != dream._id);
      });
      localStorage.setItem("shoppingCart",JSON.stringify(cartArray));
    };

    var clearCart = function(dreams){
      var cartArray = [];
      localStorage.setItem("shoppingCart",JSON.stringify(cartArray));
    };

    var getTotalCost = function(dreams){
      var total=0;
      _.each(dreams, function(dream){
        total+=dream.price*dream.quantity;
      });
      return total;
    }
    var updateQuantity = function(dream,num){
      var cartArray = JSON.parse(localStorage.getItem("shoppingCart"));
      var idx = _.chain(cartArray).pluck("_id").indexOf(dream._id).value();
      cartArray[idx].quantity=num;
      localStorage.setItem("shoppingCart",JSON.stringify(cartArray));
    };

    return{
      getPurchases: getPurchases,
      removeFromCart: removeFromCart,
      clearCart: clearCart,
      updateQuantity: updateQuantity,
      getTotalCost: getTotalCost
    };

  });
}());
