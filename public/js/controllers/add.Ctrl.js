// lisäys-näkymän kontrolleri (/add)
(function () {
  'use strict';

  angular.module('app').controller('AddCtrl', AddCtrl);

  // Määritellään objektin riippuvuudet
  AddCtrl.$inject = ['Results', '$scope', '$alert', '$cookies'];

  // function AddCtrl
  function AddCtrl(Results, $scope, $alert, $cookies) {
    $scope.error = false;
    $scope.formField = null;
    // Haetaan cookiesta käyttäjän id muuttujaan
    var userId = $cookies.get('userId');

    // addForm funktio
    $scope.addForm = function () {
      var alertSuccess = $alert({
        title: 'Success',
        content: 'New website has been added',
        container: '#alertContainer',
        type: 'success',
        duration: 6
      });

      // Objekti, joka lähetetään takaisin kantaan
      var add = {
        // Tiedot näkymästä / clientistä
        title: $scope.title,
        url: $scope.url,
        description: $scope.description,
        id: userId
      };
      Results.postSite(add).then(function (data) {
        console.log('new site added to db');
        console.log(data);
        $scope.url = '';
        $scope.description = '';
        $scope.title = '';
        alertSuccess.show();
      }).catch(function () {
        console.log('website failed to save');
      });
    };
  }
})();