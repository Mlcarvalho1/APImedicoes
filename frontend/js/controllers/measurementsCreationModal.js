angular.module("measurementsApp").controller('measurementCreationModalCtrl', function($uibModalInstance, $scope){
    
    $scope.today = new Date(moment());
    $scope.createdMeasurement = {};
    $scope.createdMeasurement.measurement_date = new Date(moment().format('yyyy-MM-DDTHH:mm'));

    const save = () => {
        $uibModalInstance.close({
            glucose: $scope.createdMeasurement.glucose,
            carbs: $scope.createdMeasurement.carbs,
            insulin: $scope.createdMeasurement.insulin,
            measurement_date: $scope.createdMeasurement.measurement_date
        });
    }

    const cancel = () => {
        $uibModalInstance.dismiss();
    }

    $scope.save = save;
    $scope.cancel = cancel;

});