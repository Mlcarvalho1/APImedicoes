angular.module("measurementsApp").controller('userCtrl', function($scope, userService, patientService, $location){
    $scope.model = "user";    
    
    $scope.today = new Date().toISOString().slice(0,10)

    function calculateAge(birthday) { // birthday is a date
        birthdayDate = new Date(birthday)
        const ageDifMs = Date.now() - birthdayDate.getTime();
        const ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }
    
    const orderBy = camp => {
        $scope.order = camp
    }

    const init = () => {
        showUser();
        listPacients();
    };

    const getUser = (user) => {
        $scope.userEdit = angular.copy(user)
    }

    const editUser = () => {
        userService.edit($scope.userEdit)
            .then(() => {
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Usuário editado com sucesso',
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
    };

    const showUser = () => {
        userService.show(localStorage.getItem('token'))
            .then((resp) => {
                $scope.userData = resp.data.data;
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.data.msg,
                  }).then($location.path('/login'));
            })
    };

    const addPatient = () => {
        patientService.create($scope.createdPatient)
            .then(() => {
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Paciente adicionado com sucesso',
                    showConfirmButton: false,
                    timer: 1500
                  });
                delete $scope.createdPatient;
                $scope.patientForm.$setPristine();
                init()
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.data.error,
                  });
            

                });
    };

    const removePatient = (patientId) => {     
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
            })
            
            swalWithBootstrapButtons.fire({
            title: 'Você tem certeza?',
            text: "Você irá perder todos os dados do paciente!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim, quero deletar!',
            cancelButtonText: 'Não, cancelar!',
            reverseButtons: true
            }).then((result) => {
            if (result.isConfirmed) {
                patientService.remove(patientId)
                .then(() => {
                    swalWithBootstrapButtons.fire(
                        'Deletado!',
                        'Seu paciente foi deletado.',
                        'success'
                        )
                    listPacients()
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
                'Seu paciente está seguro :)',
                'error'
                )
            }
            })
        
    }

    const listPacients = () => {
        patientService.index()
            .then((resp) => {
                const patients = resp.data.map((obj) => {
                    const newObj = {...obj};
                    newObj.age = calculateAge(obj.borned_at)
                    return newObj
                })
                $scope.patientsData = patients;
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.data.msg,
                  }).then($location.path('/login'));;
            })
    };

    const getPatient = (patient) => {
        $scope.patientEdit = angular.copy(patient)
        $scope.patientEdit.borned_at = new Date($scope.patientEdit.borned_at)
    }

    const goToPatient = (id) => {
        patientService.show(id)
        $location.path(`/patient/${id}`)

    }

    const editPatient = () => {
        patientService.edit($scope.patientEdit)
        .then(() => {
            Swal.fire({
                position: 'top-center',
                icon: 'success',
                title: 'Paciente editado com sucesso',
                showConfirmButton: false,
                timer: 1500
              }).then(() => {
                  listPacients()
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
    init();

    $scope.removePatient = removePatient;
    $scope.orderBy = orderBy;
    $scope.editUser = editUser;
    $scope.getUser = getUser;
    $scope.addPatient = addPatient;
    $scope.editPatient = editPatient;
    $scope.getPatient = getPatient;
    $scope.goToPatient = goToPatient;


})