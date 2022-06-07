angular.module("measurementsApp").controller('authCtrl', function($scope, authService, $location,$window){
    $scope.model = "auth"
    const login = () => {
        authService.login($scope.user.email, $scope.user.password)
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
                  $location.path('/login')
            })
    }

    const logout = () => {
        Swal.fire({
            title: 'Tem certeza?',
            text: "voce esta prestes a ser deslogado",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'sim, deslogar'
          }).then((result) => {
            if (result.isConfirmed) {
                $window.location.href = '/';
                authService.logout()
            }
          })
    }

    $scope.login = login
    $scope.logout = logout
}) 