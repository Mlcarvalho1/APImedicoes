angular.module("measurementsApp").directive("uiWeight", function(){
    return{
        require: 'ngModel',
        link: function (scope, element, attrs, ctrl) {

            const formatWeight = Weight => {
                Weight = Weight.replace(/[^0-9]/g, "")

                if(Weight.length > 3){
                    Weight = Weight.substring(0,3)
                }

                return Weight;
            }

            element.bind("keyup", function () {
                ctrl.$setViewValue(formatWeight(ctrl.$viewValue))
                ctrl.$render();
            })
        }
    }
})