angular.module("measurementsApp").controller('patientCtrl', function($scope, $http, patientService, measurementsService, $location, $routeParams){
    $scope.model = "patient";
    $scope.today = new Date().toISOString().slice(0,10)
    $scope.now = new Date().toISOString().slice(0,19)
    $scope.time = new Date().toISOString().slice(10,19)

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
                title: 'Atenção',
                text: error.data,
              })
        })
    }

    const getPatient = patient => {
        $scope.editedPatient = angular.copy(patient)
        $scope.editedPatient.borned_at = new Date($scope.editedPatient.borned_at)

    }

    const editPatient = () => {
        patientService.edit($scope.editedPatient)
        .then(() => {
            Swal.fire({
                position: 'top-center',
                icon: 'success',
                title: 'Paciente editado com sucesso',
                showConfirmButton: false,
                timer: 1500
              }).then(() => {
                showPatient($routeParams.id)
                })
        })
        .catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.data.msg,
              });
        });
        delete $scope.patientEdit;
    }

    const listMeasurements = () => {
        measurementsService.index($routeParams.id)
            .then((res) => {
                $scope.measurementsData = res.data
            })
            .catch(error => {
                Swal.fire({
                    icon: 'warning',
                    title: 'Atenção',
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

    const getMeasurement = measurement => {
        $scope.editedMeasurement = angular.copy(measurement)
        
    }

    const editMeasurement = () => {
        measurementsService.edit($scope.editedMeasurement, $routeParams.id, $scope.editedMeasurement.id)
        .then(() => {
            Swal.fire({
                position: 'top-center',
                icon: 'success',
                title: 'Paciente editado com sucesso',
                showConfirmButton: false,
                timer: 1500
              }).then(() => {
                listMeasurements()
                })
        })
        .catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.data.msg,
              });
        });
        delete $scope.editedMeasurement;
    }

    const removeMeasurement = measurementId => {     
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
            })
            
            swalWithBootstrapButtons.fire({
            title: 'Você tem certeza?',
            text: "Você está prestes a deletar esta medição",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim, quero deletar!',
            cancelButtonText: 'Nao, cancelar!',
            reverseButtons: true
            }).then((result) => {
            if (result.isConfirmed) {
                measurementsService.remove($routeParams.id, measurementId)
                .then(() => {
                    swalWithBootstrapButtons.fire(
                        'Deletada!',
                        'Sua medição foi deletada.',
                        'success'
                        )
                    listMeasurements()
                })
                .catch(err)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.data.error,
                  })
                
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                'Cancelado!',
                'Sua medição esta segura :)',
                'error'
                )
            }
            })
        
    }


    init()

    $scope.editMeasurement = editMeasurement
    $scope.getMeasurement = getMeasurement
    $scope.removeMeasurement = removeMeasurement;
    $scope.getPatient = getPatient;
    $scope.editPatient = editPatient;
    $scope.listMeasurements = listMeasurements;
    $scope.addMeasurement = addMeasurement;
})