var app = angular.module('githubsearch', []);

// .controller('mainController', function($scope) {


app.controller('SearchController', function SearchController($scope,GitHub) {
    $scope.executeSearch = function executeSearch() {
        GitHub.searchRepos($scope.query, function (error, data){
            if (!error) {
                $scope.repos = data.items;
            }
        });
          $scope.sortType     = 'name'; // set the default sort type
  $scope.sortReverse  = false;  // set the default sort order
  $scope.searchFish   = '';     // set the default search/filter term
    };
  $scope.openRepo = function openRepo(name) {
    GitHub.getRepo(name, function (error, data) {
        if (!error) {
            $scope.activeRepo = data;
        }
    });
}; 
}); 
  // create the list of sushi rolls 
  app.factory('GitHub', function GitHub($http) {
    return {
        searchRepos: function searchRepos(query, callback) {
            $http.get('https://api.github.com/search/repositories', { params: { q: query } })
            .success(function (data) {
                callback(null, data);
                // console.log(data);
            })
            .error(function (e) {
                callback(e);
            });
        },
    };
});
  
