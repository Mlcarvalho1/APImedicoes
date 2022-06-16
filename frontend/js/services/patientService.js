angular.module('measurementsApp').factory('patientService', function($http, config) {
    const index = () => $http.get(`${config.baseUrl}/patients`)

    const create =patient => $http.post(`${config.baseUrl}/patients`,patient);

    const edit = patient => $http.put(`${config.baseUrl}/patients/${patient.id}`, patient);

    const show = patientID => $http.get(`${config.baseUrl}/patients/${patientID}`);

    const remove = patientID => $http.delete(`${config.baseUrl}/patients/${patientID}`);

    const changeProfilePic = (patient_id,pic) => $http.post(`${config.baseUrl}/fotos`, pic)

    return {
        index,
        create,
        edit,
        show,
        remove,
        changeProfilePic
    }
})