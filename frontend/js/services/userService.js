angular.module('measurementsApp').factory('userService', function($http, config) {
    const create = user => $http.post(`${config.baseUrl}/users`, user);
    const edit = user => $http.put(`${config.baseUrl}/users`, user)
    return {
        create,
        edit
    }
})