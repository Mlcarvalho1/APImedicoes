angular.module("measurementsApp").controller('userEditModalCtrl', function($uibModalInstance, $scope, $rootScope, user){
    
    $scope.userEdit = angular.copy(user)
    
    const save = () => {
        $uibModalInstance.close({
            name: $scope.userEdit.name,
            email: $scope.userEdit.email
        });
    }

    const cancel = () => {
        $uibModalInstance.dismiss();
    }

    $scope.save = save;
    $scope.cancel = cancel;

});