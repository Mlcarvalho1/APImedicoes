angular.module('measurementsApp').factory('userService', function($http, config) {
    
    const create = user => $http.post(`${config.baseUrl}/users`, user);
    
    const edit = user => $http.put(`${config.baseUrl}/users`, user);
    
    const show = token => $http.get(`${config.baseUrl}/users`)

    

    return {
        create,
        edit,
        show
    }
})