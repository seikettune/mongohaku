// Käyttäjän autentikointi
(function () {
  'use strict';

  angular.module('app').factory('Auth', Auth);

  Auth.$inject = ['$http']; // Käytetään http-service

  // Function Auth(http) sisältää 4 metodia: register, login, isLoggedIn, getUserStatus
  function Auth($http) {
    var loggedIn = false;
    var currentUser = {};

    return {
      register: register,
      login: login,
      isLoggedIn: isLoggedIn,
      getUserStatus: getUserStatus
    };

    // Tarkastetaan onko käyttäjä kirjautunut
    function isLoggedIn() {
      if (loggedIn) {
        return true;
      } else {
        return false;
      }
    }

    // Onko kirjauduttu loggedIn (boolean)
    function getUserStatus() {
      return loggedIn;
    }

    // Angularin tarjoaman $http passataan 
    function register(user) {
      return $http.post('/users/register', user);
    }

    // Login - käyttäjän tiedot tarkistetaan
    function login(user) {
      return $http.post('/users/login', user).success(function (data) {
        loggedIn = true;
      }).error(function (data) {
        console.log('error occured');
        loggedIn = false;
      });
    };
  }
})();