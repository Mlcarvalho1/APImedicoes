angular.module("measurementsApp").controller('patientCtrl', function($scope, $http, patientService, measurementsService, $location, $routeParams){
    $scope.model = "patient";

    function calculateAge(birthday) { // birthday is a date
        birthdayDate = new Date(birthday)
        const ageDifMs = Date.now() - birthdayDate.getTime();
        const ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    const init = () => {
        listMeasurements($routeParams.id)
        showPatient($routeParams.id)
    }

    const showPatient = patientId => {
        patientService.show(patientId)
        .then((resp) => {
            const patient = resp.data
                const remodledPatient = {...patient};
                remodledPatient.age = calculateAge(patient.borned_at)
            
            $scope.patientData = remodledPatient;
        })
        .catch(error => {
            Swal.fire({
                icon: 'warning',
                title: 'Atencao',
                text: error.data,
              })
        })
    }

    const listMeasurements = patientId => {
        measurementsService.index(patientId)
            .then((res) => {
                $scope.measurementsData = res.data
            })
            .catch(error => {
                Swal.fire({
                    icon: 'warning',
                    title: 'Atencao',
                    text: error.data.error,
                  })
            })
    };

    init()
    $scope.listMeasurements = listMeasurements
})