angular.module("measurementsApp").controller('patientEditionModalCtrl', function($uibModalInstance, $scope, patient){
    
    $scope.today = new Date().toISOString().slice(0,10)
    $scope.patientEdit = angular.copy(patient)


    const save = () => {
        $uibModalInstance.close({
            name: $scope.patientEdit.name,
            weight: $scope.patientEdit.weight,
            height: $scope.patientEdit.height,
            borned_at: $scope.patientEdit.borned_at,
            id: $scope.patientEdit.id
        });
    }

    const cancel = () => {
        $uibModalInstance.dismiss();
    }

    $scope.save = save;
    $scope.cancel = cancel;

});