angular.module("measurementsApp").controller('measurementEditionModalCtrl', function($uibModalInstance, $scope, measurement){
    
    $scope.editedMeasurement = angular.copy(measurement)


    const save = () => {
        $uibModalInstance.close({
            glucose: $scope.editedMeasurement.glucose,
            carbs: $scope.editedMeasurement.carbs,
            insulin: $scope.editedMeasurement.insulin,
            measurement_date: $scope.editedMeasurement.measurement_date,
            id: $scope.editedMeasurement.id
        });
    }

    const cancel = () => {
        $uibModalInstance.dismiss();
    }

    $scope.save = save;
    $scope.cancel = cancel;

});