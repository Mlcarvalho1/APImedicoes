angular.module("measurementsApp").controller('patientCtrl', function($scope, $http, patientService, measurementsService, $location, $routeParams, $timeout){
    
    $scope.model = "patient";
    moment().locale('pt-br')
    $scope.today = moment().format('YYYY-MM-DD');
    $scope.now = moment().format('yyyy-MM-DDTHH:mm')
    $scope.createdMeasurement = {};
    $scope.createdMeasurement.measurement_date = new Date()

    $scope.time = moment().format('LT')

    function calculateAge(birthday) { // birthday is a date
        birthdayDate = new Date(birthday)
        const ageDifMs = Date.now() - birthdayDate.getTime();
        const ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
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
                
                const measurementsValues = res.data.map((measurement) => [ new Date(measurement.measurement_date).getTime() ,measurement.glucose])
                renderCharts(measurementsValues)
        
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
            $scope.createdMeasurement = {};
            $scope.createdMeasurement.measurement_date = new Date()
            $scope.measurementCreationForm.$setPristine();
            $timeout(() => listMeasurements());
        })

        .catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error,
              });

            });
    }

    const getMeasurement = measurement => {
        $scope.editedMeasurement = angular.copy(measurement)
        $scope.editedMeasurement.measurement_date = new Date($scope.editedMeasurement.measurement_date)
        $scope.editedMeasurement.measurement_date.setHours( $scope.editedMeasurement.measurement_date.getHours() + 3);
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
            })
            listMeasurements()
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
                .catch(error)
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

    const renderCharts = (measurementsValues, selectedDay) => {
        Highcharts.chart('container', {

            chart: {
                type: 'spline',
                scrollablePlotArea: {
                    minWidth: 600,
                    scrollPositionX: 1
                }
            },

            title: {
              text: 'Medicoes do dia'
            },
          
            yAxis: {
              title: {
                text: 'mg/dl'
              },
              min: 0,
              max: 300,
              plotBands: [{
                color: '#7bd7b0', // Color value
                from: 70, // Start of the plot band
                to: 180 // End of the plot band
              }],
            },
          
            xAxis: {
              accessibility: {
                rangeDescription: 'Range: 00:00 to 23:99'
              },
              type: 'datetime',
              min: new Date('2022-06-08').getTime(),
              max: new Date('2022-06-09').getTime()
            },

            tooltip: {
                valueSuffix: ' mg/dl'
            },
          
            legend: {
              layout: 'vertical',
              align: 'right',
              verticalAlign: 'middle'
            },
          
            plotOptions: {
                spline: {
                    lineWidth: 4,
                    states: {
                        hover: {
                            lineWidth: 5
                        }
                    },
                    marker: {
                        enabled: false
                    },
                    pointInterval: 3600000, // one hour
                }
            },
          
            series: [{
              name: 'medicoes',
              data: measurementsValues,
              color: '#fc5757'
            }],
          
            responsive: {
              rules: [{
                condition: {
                  maxWidth: 500
                },
                chartOptions: {
                  legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                  }
                }
              }]
            }
          
          });  
    }

    const init = () => {
        listMeasurements()
        showPatient($routeParams.id)
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