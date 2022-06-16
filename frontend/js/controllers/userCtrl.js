angular.module("measurementsApp").controller('userCtrl', function($scope, $location, userService, patientService ,uiModal){
    $scope.model = "user";    
    
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
        openUserEditModal()
    }

    const openUserEditModal = () => {
        const modalInstance = uiModal.open({
            templateUrl: './views/modals/userEdit.html',
            controller: 'userEditModalCtrl',
            resolve: {
                user: () => $scope.userEdit
            },
            backdrop: 'static'
        })

        modalInstance.result.then(userEdit => {
            editUser(userEdit)
        })
    }


    const editUser = (userEdit) => {
        userService.edit(userEdit)
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

    const openPatientCreationModal = () => {
        const modalInstance = uiModal.open({
            templateUrl: './views/modals/patientCreation.html',
            controller: 'patientCreationModalCtrl',
            resolve: {},
            backdrop: 'static'
        })

        modalInstance.result.then(createdPatient => {
            addPatient(createdPatient)
        })
    }

    const addPatient = (createdPatient) => {
        patientService.create(createdPatient)
            .then(() => {
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Paciente adicionado com sucesso',
                    showConfirmButton: false,
                    timer: 1500
                });
                listPacients()
                delete $scope.createdPatient;
                $scope.patientForm.$setPristine();
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.data.e.message,
                });
                
            })
        };

    const getPatient = (patient) => {
        $scope.patientEdit = angular.copy(patient)
        $scope.patientEdit.borned_at = new Date($scope.patientEdit.borned_at)
        openPatientEditionModal()
    }
            
    const openPatientEditionModal = () => {
        const modalInstance = uiModal.open({
            templateUrl: './views/modals/patientEdition.html',
            controller: 'patientEditionModalCtrl',
            resolve: {
                patient: () => $scope.patientEdit
            },
            backdrop: 'static'
        })

        modalInstance.result.then(patientEdit => {
            editPatient(patientEdit)
        })
    }

    const editPatient = (patientEdit) => {
        patientService.edit(patientEdit)
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

    const goToPatient = (id) => {
        patientService.show(id)
        $location.path(`/patient/${id}`)

    }
    
    init();

    $scope.openPatientEditionModal = openPatientEditionModal;
    $scope.openPatientCreationModal = openPatientCreationModal;
    $scope.openUserEditModal = openUserEditModal;
    $scope.removePatient = removePatient;
    $scope.orderBy = orderBy;
    $scope.editUser = editUser;
    $scope.getUser = getUser;
    $scope.addPatient = addPatient;
    $scope.editPatient = editPatient;
    $scope.getPatient = getPatient;
    $scope.goToPatient = goToPatient;

})