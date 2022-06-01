angular.module("measurementsApp").controller('userCtrl', function($scope, userService){
    $scope.model = "user";    

    const addUser = () => {
        userService.create($scope.user)
            .then(() => {
                alert('Usuario cadastrado com sucesso!')
                delete $scope.user;
                $scope.userForm.$setPristine();
            })
            .catch(error => {
                alert(error.data.error)

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