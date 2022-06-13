angular.module('measurementsApp').factory('measurementsService', function($http, config) {
    const store = (measurement, patientId) => $http.post(`${config.baseUrl}/patients/measurements/${patientId}`, measurement)

    const index = (patientId, params) => $http.get(`${config.baseUrl}/patients/measurements/${patientId}`, { params })

    const indexChart = (patientId, params) => $http.get(`${config.baseUrl}/patients/measurements/${patientId}/chart`, { params })

    const remove = (patientId, id) => $http.delete(`${config.baseUrl}/patients/measurements/${patientId}/${id}`)

    const edit = (measurement, patientId, id) => $http.put(`${config.baseUrl}/patients/measurements/${patientId}/${id}`, measurement)

    return {
       store,
       index,
       remove,
       edit,
       indexChart
    }
})