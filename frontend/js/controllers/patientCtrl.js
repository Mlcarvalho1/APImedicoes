angular.module("measurementsApp").controller('patientCtrl', function($scope, $http, patientService, measurementsService, $location, $routeParams, $timeout){
    
    $scope.page = 1
    $scope.model = "patient"
    $scope.startDay = new Date(moment())
    $scope.endDay = new Date(moment().add(1, 'days'))
    $scope.test = new Date( moment())
    $scope.selectedDay = new Date(moment())
    $scope.today = new Date(moment())
    $scope.createdMeasurement = {};
    $scope.createdMeasurement.measurement_date = new Date(moment().format('yyyy-MM-DDTHH:mm'))
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
       measurementsService.index($routeParams.id, {
           day: moment($scope.selectedDay).format('YYYY-MM-DD'),
           page: $scope.page,
        })
            .then((res) => {
                $scope.measurementsData = res.data.map((measurement) => ({
                    ...measurement,
                      measurement_date: moment(measurement.measurement_date).format('LT')
                    }));
        
            })
            .catch(error => {
                delete $scope.measurementsData
            })
    };

    const listMeasurementsChart = () => {
        measurementsService.indexChart($routeParams.id, {
            startDay: moment($scope.startDay).format('YYYY-MM-DD'),
            endDay: moment($scope.endDay).format('YYYY-MM-DD'),
         })
             .then((res) => {
                 $scope.measurementsChart = res.data
                const measurementsValues = res.data.map((measurement) => [ +moment(measurement.measurement_date).format('x') ,measurement.glucose])
                console.log(measurementsValues); 
                renderCharts(measurementsValues)
         
             })
             .catch(error => {
                 delete $scope.measurementsChart
                 renderCharts()
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
              
            }).then(() => {
                init()
                })
            $scope.createdMeasurement = {};
            $scope.createdMeasurement.measurement_date = new Date(moment().format('yyyy-MM-DDTHH:mm'))
            $scope.measurementCreationForm.$setPristine();
        })

        .catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error,
              });

            });
    };

    const getMeasurement = measurement => {
        $scope.editedMeasurement = angular.copy(measurement)
        $scope.editedMeasurement.measurement_date = new Date($scope.editedMeasurement.measurement_date)
        $scope.editedMeasurement.measurement_date.setHours( $scope.editedMeasurement.measurement_date.getHours() + 3);
    };

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
                init()
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
    };

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
                    init()
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
        
    };

    const pageSelect = (page) => {
        $scope.page = page;
        listMeasurements();
    };

    const previousPage = () => {$scope.page !== 1
            
        if($scope.page !== 1){
            $scope.page -= 1;
            listMeasurements();
        }
    };

    const nextPage = () =>{

        if($scope.page !== $scope.maxPages){
            $scope.page += 1;
            listMeasurements();
        };
    };

    const renderCharts = (measurementsValues) => {
        Highcharts.chart('container', {
            chart: {
                type: 'spline',
                scrollablePlotArea: {
                    minWidth: 600,
                    scrollPositionX: 1
                }
            },

            time: {
                timezone: 'America/Recife'
            },

            title: {
              text: `Medicoes do dia`
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
              min: +moment($scope.startDay).startOf('day').format('x'),
              max: +moment($scope.endDay).startOf('day').format('x'),
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
              name: 'medicao',
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
    };

    const init = () => {
        listMeasurements()
        listMeasurementsChart()
        showPatient($routeParams.id)
    };

    const dateSelect = () => {
        init()
    };
                

    init()


    $scope.nextPage = nextPage;
    $scope.previousPage = previousPage;
    $scope.pageSelect = pageSelect;
    $scope.dateSelect = dateSelect;
    $scope.editMeasurement = editMeasurement;
    $scope.getMeasurement = getMeasurement;
    $scope.removeMeasurement = removeMeasurement;
    $scope.getPatient = getPatient;
    $scope.editPatient = editPatient;
    $scope.listMeasurements = listMeasurements;
    $scope.addMeasurement = addMeasurement;
})