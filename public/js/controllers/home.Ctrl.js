// home-näkymän kontrolleri
(function () {
  'use strict';

  angular.module('app').controller('HomeCtrl', HomeCtrl);

  HomeCtrl.$inject = ['$scope', 'Auth', 'Results'];

  // määritellään searchText objektin tiedot
  function HomeCtrl($scope, Auth, Results) {
    $scope.site = [];

    $scope.getResults = function () {
      // id-muuttuja, jota searchResults funktio käyttää
      var id = {
        searchText: $scope.searchText
      };
      Results.searchResults(id).then(function (data) {
        console.log(data);
        $scope.searchText = '';
        $scope.site = data.data;
        // Näytetään tulokset angularin forEach-funktiolla
        angular.forEach($scope.site, function (value, key) {
          console.log(key + ': ' + value);
        });
      });
    };
  }
})();