angular.module('measurementsApp').factory('userService', function($http) {
    const create = user => $http.post(`http://localhost:3000/users`, user);
    

    return {
        create
    }
})