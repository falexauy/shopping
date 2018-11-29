angular.module('shopping',[])
.controller('MainCtrl',[
  '$scope','$http',
  function($scope,$http) {
    $scope.storeproducts = [];
    $scope.order = [];
    $scope.getAll = function() {
			return $http.get('/shopping').success(function(data){
				angular.copy(data, $scope.storeproducts);
			});
    };
    $scope.getAll();
    $scope.create = function(storeproduct) {
			return $http.post('/shopping', storeproduct).success(function(data){
				$scope.storeproducts.push(data);
			});
    };
    $scope.buy = function() {
      console.log("In buy");
      angular.forEach($scope.storeproducts, function(value,key) {
        if(value.selected) {
          $scope.upvote(value);
          $scope.order.push(value);
        }
      });
    }
    //increments orders in the database
    $scope.upvote = function(storeproduct) {
      return $http.put('/shopping/' + storeproduct._id + '/order')
        .success(function(data){
          console.log("order placed");
          storeproduct.orders += 1;
        });
    };

    $scope.addProduct = function() {
      var newObj = {name:$scope.formProductName, price: $scope.formPrice, url: $scope.formURL, orders:0};
      $scope.create(newObj);
      $scope.formProductName = '';
      $scope.formPrice = '';
      $scope.formURL = '';
    }

    //Increment orders in the frontend
    $scope.incrementUpvotes = function(storeproduct) {
      $scope.upvote(storeproduct);
    };
 
    $scope.delete = function(storeproduct) {
      console.log("Deleting Name "+storeproduct.name+" ID "+storeproduct._id);
      $http.delete('/shopping/'+ storeproduct._id)
        .success(function(data){
          console.log("delete worked");
      });
      $scope.getAll();
    };
  }
]);