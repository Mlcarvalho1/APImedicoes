angular.module("measurementsApp").directive("uiHeight", function(){
    return{
        require: 'ngModel',
        link: function (scope, element, attrs, ctrl) {

            const formatHeight = height => {
                height = height.replace(/[^0-9]/g, "")

                if(height.length > 1) {
                    height = height.substring(0,1) + "." + height.substring(1)
                }

                return height;
            }

            element.bind("keyup", function () {
                ctrl.$setViewValue(formatHeight(ctrl.$viewValue))
                ctrl.$render();
            })
        }
    }
})