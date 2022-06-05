angular.module("measurementsApp").controller('patientCtrl', function($scope, $http, patientService, measurementsService, $location, $routeParams){
    $scope.model = "patient";
    $scope.today = new Date().toISOString().slice(0,10)
    $scope.now = new Date().toISOString()

    function calculateAge(birthday) { // birthday is a date
        birthdayDate = new Date(birthday)
        const ageDifMs = Date.now() - birthdayDate.getTime();
        const ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    const init = () => {
        listMeasurements()
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

    const listMeasurements = () => {
        measurementsService.index($routeParams.id)
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

    const addMeasurement = () => {
        measurementsService.store($scope.createdMeasurement, $routeParams.id)
        .then(() => {
            Swal.fire({
                position: 'top-center',
                icon: 'success',
                title: 'Medicao adicionada com sucesso',
                showConfirmButton: false,
                timer: 1500
              });
            delete $scope.createdMeasurement;
            $scope.measurementForm.$setPristine();
            listMeasurements()
        })
        .catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error,
              });
              console.log(error)

            });
    }

    init()
    $scope.listMeasurements = listMeasurements
    $scope.addMeasurement = addMeasurement
})