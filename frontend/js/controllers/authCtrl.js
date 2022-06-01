angular.module("measurementsApp").controller('authCtrl', function($scope, userService, $location){
    $scope.model = "auth"

    const login = () => {
        userService.login($scope.user.email, $scope.user.password)
            .then((resp) => {
                localStorage.setItem('email', $scope.user.email)
                localStorage.setItem('token', resp.data.token)
                $location.path('/users')
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.data.msg,
                  })
            

            })
            
    }

    $scope.login = login

}) 