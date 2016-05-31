angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $cordovaNetwork, $cordovaSQLite) {
  $scope.perguntas = null;
  $scope.contador = null;
  var query = "SELECT * FROM perguntas";
  $cordovaSQLite.execute(db, query, []).then(function(resultado){
    $scope.perguntas = resultado.rows;
    $scope.contador = resultado.rows.length;
    console.log(resultado.rows);
  });

  $scope.responder_pergunta = function(id_pergunta, resposta) {
    var db = null;
    if (window.cordova) {
      db = $cordovaSQLite.openDB({ name: "my.db" }); //device
    }else{
      db = window.openDatabase("my.db", '1', 'my', 1024 * 1024 * 100); // browser
    }

    alert("Teste!");
    var respondida = 1;

    var query = "UPDATE perguntas SET resposta = ?, respondida = ? WHERE id_pergunta = ?";
    console.log(query);
    $cordovaSQLite.execute(db, query, [resposta, respondida, id_pergunta]).then(function(res){
      console.log(res);
    }, function (err) {
      console.error(err);
    });
  };
})

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
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope, $cordovaSQLite, $http, $ionicLoading) {

    $ionicLoading.show({
      template: 'Loading...'
    });
    // $http({
    //   method: 'GET',
    //   url: 'http://siseel.herokuapp.com/api/perguntas/'
    // }).then(function successCallback(response) {
    //   console.log(response);
    //   for (var i = 0; i < response.data.length; i++){
    //     var query = "SELECT * FROM perguntas WHERE id_pergunta = ?";
    //     var id_pergunta = response.data[i].id;
    //     var pergunta = response.data[i].pergunta;
    //     $cordovaSQLite.execute(db, query, [id_pergunta]).then(function(resultado){
    //       console.log(resultado.rows);
    //       if(resultado.rows.length == 0){
    //         var query = "INSERT INTO perguntas (id_pergunta, pergunta, respondida) VALUES (?, ?, ?)";
    //         console.log(query);
    //         $cordovaSQLite.execute(db, query, [id_pergunta, pergunta, 0]).then(function(res){
    //           console.log(res);
    //         });
    //       }
    //     });
    //   }
    // }, function errorCallback(response) {
    //   console.log(response);
    // });

    var query = "SELECT * FROM perguntas";
    $cordovaSQLite.execute(db, query, []).then(function(res){
      console.log(res);
    });

    $ionicLoading.hide();
});
