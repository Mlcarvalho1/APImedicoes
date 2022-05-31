angular.module("measurementsApp").controller('userCtrl', function($scope, userService){
    $scope.model = "user";    

    const addUser = () => {
        userService.create($scope.user)
            .then(() => {
                delete $scope.user;
                $scope.userForm.$setPristine();
            })
            .catch(error => {
                alert(error.data.error)

                console.log(error)})
    };

    $scope.addUser = addUser

})