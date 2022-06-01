angular.module("measurementsApp").controller("signinCtrl", function($scope, userService){
    $scope.model = "signin" 

    const addUser = () => {
        userService.create($scope.user)
            .then(() => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Usuario cadastrado do sucesso',
                    showConfirmButton: false,
                    timer: 1500
                  });
                delete $scope.user;
                $scope.userForm.$setPristine();
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.data.error,
                  });
            

                });
    };

    $scope.addUser = addUser;
})