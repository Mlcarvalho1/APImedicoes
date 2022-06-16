angular.module("measurementsApp").controller('patientCreationModalCtrl', function($uibModalInstance, $scope){
    
    $scope.today = new Date().toISOString().slice(0,10)
    const save = () => {
        $uibModalInstance.close({
            name: $scope.createdPatient.name,
            weight: $scope.createdPatient.weight,
            height: $scope.createdPatient.height,
            borned_at: $scope.createdPatient.borned_at
        });
    }

    const cancel = () => {
        $uibModalInstance.dismiss();
    }

    $scope.save = save;
    $scope.cancel = cancel;

});