angular.module('starter.controllers', [])
//Definicion de controler Add
.controller('AddCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('DateCtrl', function($scope) {
  var currentStart = 0;
  $scope.items = [];
  $scope.addItems = function() {
    for (var i = currentStart; i < currentStart+20; i++) {
      $scope.items.push("18:" + i+"0")
    }

    currentStart += 20
  }

  $scope.addItems()

});
