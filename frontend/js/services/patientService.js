angular.module('measurementsApp').factory('patientService', function($http, config) {
    const index = () => $http.get(`${config.baseUrl}/patients`)

    const create =patient => $http.post(`${config.baseUrl}/patients`,patient);

    const edit = patient => $http.put(`${config.baseUrl}/patients/${patient.id}`, patient);

    const show = patientID => $http.get(`${config.baseUrl}/patients/${patientID}`);

    const remove = patientID => $http.delete(`${config.baseUrl}/patients/${patientID}`);

    const changeProfilePic = pic => {
        console.log(pic)
        return $http({
            method: 'POST',
            url: `${config.baseUrl}/fotos`,
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: pic,
            transformRequest: function (data, headersGetter) {
                var formData = new FormData();
                angular.forEach(data, function (value, key) {
                    formData.append(key, value);
                });

                var headers = headersGetter();
                delete headers['Content-Type'];

                return formData;
            }
        });
    }

    return {
        index,
        create,
        edit,
        show,
        remove,
        changeProfilePic
    }
})