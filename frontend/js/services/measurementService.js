angular.module('measurementsApp').factory('measurementsService', function($http, config) {
    const store = patientId => $http.post(`${config.baseUrl}/measurements/${patientId}`)

    const index = patientId => $http.get(`${config.baseUrl}/measurements/${patientId}`)

    return {
       
    }
})