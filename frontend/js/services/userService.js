angular.module('measurementsApp').factory('userService', function($http, config) {
    
    const create = user => $http.post(`${config.baseUrl}/users`, user);
    
    const edit = user => $http.put(`${config.baseUrl}/users`, user);

    const login = (email, password) => $http.post(`${config.baseUrl}/tokens`, { email: email, password: password})
    
    const show = token => $http.get(`${config.baseUrl}/users`)

    const logout = () => {
        delete $localStorage.currentUser;
        $http.defauts.headers.common.Authorization = '';
    }

    return {
        login,
        logout,
        create,
        edit,
        show
    }
})