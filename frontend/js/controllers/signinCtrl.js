angular.module("measurementsApp").controller("signinCtrl", function($scope, $location, userService){
    $scope.model = "signin" 

    const addUser = () => {
        userService.create($scope.user)
            .then(() => {
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Usuario cadastrado com sucesso',
                    showConfirmButton: false,
                    timer: 1500
                  })
                    delete $scope.user;
                    $scope.userForm.$setPristine();
                    $location.path('/login');
                
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.data.error,
                  });
            console.log(error)

                });
    };

    $scope.addUser = addUser;
})