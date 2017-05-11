// login-näkymän kontrolleri
(function () {
  'use strict';

  angular.module('app').controller('LoginCtrl', LoginCtrl);

  LoginCtrl.$inject = ['$scope', 'Auth', '$state', '$cookies'];

  // LoginCtrl
  function LoginCtrl($scope, Auth, $state, $cookies) {
    $scope.error = false;
    // login
    // Angularin tarjoama ng-submit="login()
    $scope.login = function () {
      // Muuttujat login.html näkymästä
      var user = {
        username: $scope.username,
        password: $scope.password
      };
      Auth.login(user).success(function (data) {
        console.log('log in successful');
        // Käyttäjän kirjautumistieto kirjataan keksiin
        $cookies.put('user', data.user.username);
        $cookies.put('userId', data.user._id); // ID on määritelty jokaiselle käyttäjälle MongoDB:n toimesta
        $state.go('add');
      })
      // Jos virhe kirjautumisessa
      .error(function () {
        console.log('Error logging in');
        $scope.error = true;
        $scope.errorMessage = 'Something went wrong';
      });
    };
  }
})();