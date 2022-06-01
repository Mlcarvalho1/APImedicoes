angular.module("measurementsApp").controller('userCtrl', function($scope, userService, $location){
    $scope.model = "user";    

    const init = () => {
        console.log('iniciado');
        // listPatients();
    };

    const editUser = () => {
        userService.edit($scope.user)
            .then(() => {
                
            })
            .catch(error => {
                console.log(error);
            });
    };

    const listPatients = () => {
        userService.show(localStorage.getItem('token'))
            .then((resp) => {
                console.log(resp)
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error,
                  });
            
                console.log(error);
            });
    };

    init();

    $scope.editUser = editUser;

})