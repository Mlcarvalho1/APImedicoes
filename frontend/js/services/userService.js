angular.module('measurementsApp').factory('userService', function($http, config){
    const addUser = async user => {
        const { data } = await $http.post(config.baseUrl + '/user', user)
        return data
    }
})