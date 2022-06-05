angular.module('measurementsApp').factory('measurementsService', function($http, config) {
    const store = (measurement, patientId) => $http.post(`${config.baseUrl}/patients/measurements/${patientId}`, measurement)

    const index = patientId => $http.get(`${config.baseUrl}/patients/measurements/${patientId}`)

    return {
       store,
       index
    }
})