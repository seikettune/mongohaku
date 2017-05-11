// Register-näkymän kontrolleri
(function () {
  'use strict';

  angular.module('app').controller('RegisterCtrl', RegisterCtrl);

  // Inject riippuvuudet ~ dependencies
  RegisterCtrl.$inject = ['$scope', '$state', 'Auth'];

  function RegisterCtrl($scope, $state, Auth) {
    $scope.error = false;

    // Register function
    $scope.register = function (form) {
      // Käyttäjätiedot auth.user servideen
      var user = {
        username: $scope.username,
        password: $scope.password,
        password2: $scope.password2,
        email: $scope.email
      };

      // passataan käyttäjän tiedot (user-objekti) auth.register metodiin
      Auth.register(user).success(function () {
        console.log('User registered successfully ');
        // Kun rekisteröinti onnistunut, niin ohjataan kirjautumissivulle
        $state.go('login');
      }).error(function () {
        $scope.error = true;
        $scope.errorMessage = 'Something went wrong';
      });
    };
  }
})();