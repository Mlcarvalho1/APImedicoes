angular.module('measurementsApp').factory('measurementsService', function($http, config) {
    const store = patientId => $http.post(`${config.baseUrl}patients/measurements/${patientId}`)

    const index = patientId => $http.get(`${config.baseUrl}/patients/measurements/${patientId}`)

    return {
       store,
       index
    }
})