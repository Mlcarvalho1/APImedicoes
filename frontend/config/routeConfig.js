angular.module("measurementsApp").config(function ($routeProvider) {
    $routeProvider.otherwise("/login");

    $routeProvider.when("/signin", {
        templateUrl: "./views/signin.html",
        });

    $routeProvider.when("/login", {
        templateUrl: "./views/login.html",
        });


    $routeProvider.when("/users",{
        templateUrl:"./views/profilePage.html"
    })

    $routeProvider.when("/patient",{
        templateUrl:"./views/patient.html"
    })
});