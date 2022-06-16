angular.module('measurementsApp').factory('uiModal', function($http, $uibModal, $rootScope) {
    
    const open = ({ templateUrl, controller, resolve, backdrop }) => {
        return $uibModal.open({
            templateUrl,
            controller,
            resolve,
            backdrop
        })
    }

    return {
        open
    }
})  
