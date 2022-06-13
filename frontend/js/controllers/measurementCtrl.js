angular.module("measurementsApp").controller('measurementCtrl', function($scope){
    $scope.app = "measurementsApp";
    $scope.curPage = 1,
    $scope.itemsPerPage = 6,
        
      itens = angular.copy($scope.measurementsData)
      
      
    $scope.numOfPages = function () {
      return Math.ceil(itens.length / $scope.itemsPerPage);
        
    };
      
      $scope.$watch('curPage + numPerPage', function() {
      var begin = (($scope.curPage - 1) * $scope.itemsPerPage),
      end = begin + $scope.itemsPerPage;
        
      $scope.filteredMeasurements = itemsDetails.slice(begin, end);
    });



});