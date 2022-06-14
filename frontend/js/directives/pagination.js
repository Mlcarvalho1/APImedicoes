
angular.module("measurementsApp").directive('pagination', function() {
	return {
		restrict: 'E',
		scope: {
			totalItems: '=',
            itemsPerPage: '=',
            onPaginate: '=',
            currentPage: '='
		},
		templateUrl: './views/pagination.html',
		controller: function($scope) {
            $scope.pages = [];

            $scope.totalPages = Math.ceil($scope.totalItems/$scope.itemsPerPage)

			for(let i = 1; i <= $scope.totalPages; i++) {
                $scope.pages.push(i);
            }


            const paginate = (page) => {
                if (page === $scope.currentPage) {
                    return
                }

                $scope.currentPage = page
                $scope.onPaginate(page)
            }

            const previousPage = () => {
                if($scope.currentPage !== 1){
                    $scope.currentPage--;
                    paginate($scope.currentPage)
                }
            }

            const nextPage = () => {
                if($scope.currentPage !== $scope.totalPages){
                    $scope.currentPage++;
                    paginate($scope.currentPage)
                }
                
            }

            $scope.paginate = paginate;
            $scope.nextPage = nextPage;
            $scope.previousPage = previousPage;
		}
	};
});
