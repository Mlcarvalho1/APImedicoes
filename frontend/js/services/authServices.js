angular.module('measurementsApp').factory('authService', function($http, config) {
    const login = (email, password) => $http.post(`${config.baseUrl}/tokens`, { email: email, password: password})

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
    }

    return{
        login,
        logout
    }
})  
