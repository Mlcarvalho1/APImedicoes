angular.module('measurementsApp').factory('TokenInterceptor', function ($window, $q, $location) {
    return {
        request: function(config) {
            config.headers = config.headers || {};
            if ($window.localStorage.getItem('token')) {
              // may also use sessionStorage
                config.headers.Authorization = 'Bearer ' + $window.localStorage.getItem('token');
            }
            return config || $q.when(config);
        },
        response: function(response) {
            if (response.status === 401) {
            }
            return response || $q.when(response);
        }
    };
});