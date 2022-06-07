angular.module('measurementsApp').factory('measurementsService', function($http, config) {
    const store = (measurement, patientId) => $http.post(`${config.baseUrl}/patients/measurements/${patientId}`, measurement)

    const index = patientId => $http.get(`${config.baseUrl}/patients/measurements/${patientId}`)

    const remove = (patientId, id) => $http.delete(`${config.baseUrl}/patients/measurements/${patientId}/${id}`)

    const edit = (measurement, patientId, id) => $http.put(`${config.baseUrl}/patients/measurements/${patientId}/${id}`, measurement)

    return {
       store,
       index,
       remove,
       edit
    }
})