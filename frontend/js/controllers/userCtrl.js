angular.module("measurementsApp").controller('userCtrl', function($scope, userService){
    $scope.model = "user";    

    const addUser = () => {
        userService.create($scope.user)
            .then(() => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Usuario cadastrado do sucesso',
                    showConfirmButton: false,
                    timer: 1500
                  })
                delete $scope.user;
                $scope.userForm.$setPristine();
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.data.error,
                  })
            

                console.log(error)})
    };


    const editUser = () => {
        userService.edit($scope.user)
            .then(() => {
                
            })
            .catch(error => {
                console.log(error)
            })
    }


    $scope.editUser = editUser
    $scope.addUser = addUser

})