angular.module('comment', [])
.controller('MainCtrl', [
  '$scope','$http',
  function($scope,$http){
   // $scope.test = 'Hello world!';
 $scope.comments = [];
 $scope.ballot = [];
$scope.addComment = function() {
      var newcomment = {title:$scope.formContent,imageUrl:$scope.url,price:$scope.price,upvotes:0};
      //var newcomment = {title:$scope.formContent,upvotes:0};
     // var newcomment = {title:$scope.formContent,upvotes:0};
   // if($scope.formContent === '') { return; }
     // console.log("In addComment with "+$scope.formContent);
      //$scope.create({
       // title: $scope.formContent,
       // upvotes: 0,
      //});
    /*
    $scope.addProduct = function() {
      var formContent = {name:$scope.Name,imageUrl:$scope.Url};
      console.log(formContent);
      $http.post(formContent); // Send the data to the back end
      $scope.pokemon.push(formData); // Update the model
    }

    */
      $scope.formContent='';
      $scope.price = '';
      $scope.Url = '';
      $http.post('/comments', newcomment).success(function(data){
        $scope.comments.push(data);
      });
    };
    $scope.upvote = function(comment) {
      return $http.put('/comments/' + comment._id + '/upvote')
        .success(function(data){
          console.log("upvote worked");
          comment.upvotes = data.upvotes;
        });
    };
     $scope.incrementUpvotes = function(comment) {
      $scope.upvote(comment);
    };

  $scope.getAll = function() {
    return $http.get('/comments').success(function(data){
      angular.copy(data, $scope.comments);
    });
  };
    $scope.getAll();

 $scope.create = function(comment) {
    return $http.post('/comments', comment).success(function(data){
      $scope.comments.push(data);
    });
  };




 $scope.finalBallot = function() {
angular.forEach($scope.comments, function(value,key) {
  if(value.selected) {
    $scope.upvote(value);
    $scope.ballot.push(value);
  }
});
 }






    $scope.delete = function(comment) {
      $http.delete('/comments/' + comment._id )
        .success(function(data){
          console.log("delete worked");
        });
    };
  
      $scope.getAll();
	}
]);
