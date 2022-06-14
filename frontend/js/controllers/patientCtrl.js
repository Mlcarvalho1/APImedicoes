angular.module("measurementsApp").controller('patientCtrl', function($scope, patientService, measurementsService, $routeParams, $q){
    
    $scope.currentPage = 1;
    $scope.model = "patient";
    $scope.startDay = new Date(moment());
    $scope.endDay = new Date(moment().add(1, 'days'));
    $scope.test = new Date( moment());
    $scope.selectedDay = new Date(moment());
    $scope.today = new Date(moment());
    $scope.createdMeasurement = {};
    $scope.createdMeasurement.measurement_date = new Date(moment().format('yyyy-MM-DDTHH:mm'));
    $scope.time = moment().format('LT');
    $scope.lineGraph = true;
    $scope.columnGraph = false;


    function calculateAge(birthday) { // birthday is a date
        birthdayDate = new Date(birthday);
        const ageDifMs = Date.now() - birthdayDate.getTime();
        const ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    };

    const showPatient = patientId => {
        return patientService.show(patientId)
        .then((resp) => {
            const patient = resp.data;
                const remodledPatient = {...patient};
                remodledPatient.age = calculateAge(patient.borned_at);
            
            $scope.patientData = remodledPatient;
        })
        .catch(error => {
            Swal.fire({
                icon: 'warning',
                title: 'Atenção',
                text: error.data,
              });
        });
    };

    const getPatient = patient => {
        $scope.editedPatient = angular.copy(patient)
        $scope.editedPatient.borned_at = new Date($scope.editedPatient.borned_at)

    };

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
        if ($scope.loadingMeasurements) {
            return;
        }

        $scope.loadingMeasurements = true;

       return measurementsService.index($routeParams.id, {
           day: moment($scope.selectedDay).format('YYYY-MM-DD'),
           page: $scope.currentPage,
        })
            .then((res) => {
                if (res.data.total_items) {
                    $scope.totalItems = res.data.total_items
                }

                $scope.measurementsData = res.data.items.map((measurement) => ({
                    ...measurement,
                      measurement_date: moment(measurement.measurement_date).format('LT')
                    }));
            
            })
            .catch(error => {
                delete $scope.measurementsData
            }).finally(() => {
                $scope.loadingMeasurements = false
                $scope.loadingDateSelection = false
            })
    };

    const listMeasurementsChart = () => {
        return measurementsService.indexChart($routeParams.id, {
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

    const onPaginate = (currentPage) => {
        $scope.currentPage = currentPage
        listMeasurements();
    };

    const getArrayAvg = (array) => Math.round(array.reduce((acc, value) => acc + value, 0)/array.length);
    

    const getMeasurementGroup = date => {
        const hour = moment(date).format('HH');

        if (hour >= 0 && hour <= 3) {
            return '00-03hr';
        }
        
        if (hour > 3 && hour <= 6) {
            return '03-06hr';
        }
        
        if (hour > 6 && hour <= 9) {
            return '06-09hr';
        }
        
        if (hour > 9 && hour <= 12) {
            return '09-12hr';
        }
        
        if (hour > 12 && hour <= 15) {
            return '12-15hr';
        }

        if (hour > 15 && hour <= 18) {
            return '15-18hr';
        }

        if (hour > 18 && hour <= 21) {
            return '18-21hr';
        }

        return '21-24hr';
    }

    const renderCharts = (measurementsValues) => {

        Highcharts.chart('line', {
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
              plotBands: [{
                color: '#10B364', // Color value
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
              color: 'red'
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

          const groupedMeasrumentByHour = measurementsValues.reduce((acc, measurement) => {
            const measurementGroupHour = getMeasurementGroup(measurement[0]);

            return {
                ...acc,
                [measurementGroupHour]: [
                    ...acc[measurementGroupHour],
                    measurement[1]
                ]
            }
          }, {
            '00-03hr': [],
            '03-06hr': [],
            '06-09hr': [],
            '09-12hr': [],
            '12-15hr': [],
            '15-18hr': [],
            '18-21hr': [],
            '21-24hr': [],
          });

          console.log(JSON.stringify(groupedMeasrumentByHour, null, 4), 'OLA')

          Highcharts.chart('column', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Media glicemica'
            },
            xAxis: {
                
                categories: Object.keys(groupedMeasrumentByHour),
                crosshair: true,
                plotLines: [
                    {
                        color: 'red',
                        dashStyle: 'longdashdot',
                        value: 180,
                    }
                ],
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Media glicemica: mg/dl'
                },
                plotLines: [{
                    color: 'orange',
                    value: 180, 
                    width: 2 
                  },
                  {
                    color: 'red',
                    value: 70,
                    width: 2
                  }
                ]
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            
            series: [{
                name: 'glicemia mg/dl',
                data: [ getArrayAvg(groupedMeasrumentByHour['00-03hr']),
                    getArrayAvg(groupedMeasrumentByHour['03-06hr']),
                    getArrayAvg(groupedMeasrumentByHour['06-09hr']),
                    getArrayAvg(groupedMeasrumentByHour['09-12hr']),
                    getArrayAvg(groupedMeasrumentByHour['12-15hr']),
                    getArrayAvg(groupedMeasrumentByHour['15-18hr']),
                    getArrayAvg(groupedMeasrumentByHour['18-21hr']),
                    getArrayAvg(groupedMeasrumentByHour['21-24hr'])
                ],
                color: '#00406C'
            }]
        });
    };

    const showColumnGraph = () => {
        if($scope.columnGraph){
            return
        }
        $scope.lineGraph = false
        $scope.columnGraph = true
    }


    const showLineGraph = () => {
        if($scope.lineGraph){
            return
        }
        $scope.lineGraph = true
        $scope.columnGraph = false
    }

    const init = () => {
        if ($scope.loadingInit) {
            return;
        }

        $scope.loadingInit = true;

        $q.all([listMeasurements(), listMeasurementsChart(), showPatient($routeParams.id)]).then(() => {
            $scope.loadingInit = false;
        })
    };

    const dateSelect = () => {
        $scope.currentPage = 1
        listMeasurements()
    };
                
    const chartdateSelect = () => {
        listMeasurementsChart()
    }

    init()


    $scope.showLineGraph = showLineGraph
    $scope.showColumnGraph = showColumnGraph
    $scope.onPaginate = onPaginate
    $scope.chartdateSelect = chartdateSelect;
    $scope.dateSelect = dateSelect;
    $scope.editMeasurement = editMeasurement;
    $scope.getMeasurement = getMeasurement;
    $scope.removeMeasurement = removeMeasurement;
    $scope.getPatient = getPatient;
    $scope.editPatient = editPatient;
    $scope.listMeasurements = listMeasurements;
    $scope.addMeasurement = addMeasurement;
})