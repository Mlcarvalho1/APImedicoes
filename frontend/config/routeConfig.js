const myapp = angular.module("measurementsApp")

myapp.config(function ($routeProvider) {
    $routeProvider.otherwise("/homePage");

    $routeProvider.when("/homePage", {
        templateUrl: "./views/homePage.html"
    })

    $routeProvider.when("/signin", {
        templateUrl: "./views/signin.html",
        });

    $routeProvider.when("/login", {
        templateUrl: "./views/login.html",
        });


    $routeProvider.when("/users",{
        templateUrl:"./views/profilePage.html"
    })

    $routeProvider.when("/patient/:id",{
        templateUrl:"./views/patient.html",
        controller: 'patientCtrl'
    })

});

myapp.config(function ($httpProvider) {

    $httpProvider.interceptors.push('TokenInterceptor');
   
})
