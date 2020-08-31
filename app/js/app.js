var app = angular.module("myApp", ['ngRoute','ngStorage','chart.js']);
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "app/view/sobre.html"
    })
    .when("/sobreaferramenta", {
        templateUrl : "app/view/sobre.html",
        controller : "sobreCtrl"
    })
    .when("/tutorial", {
        templateUrl : "app/view/tutorial.html",
        controller : "tutorialCtrl"
    })
    .when("/mercadodeenergia", {
        templateUrl : "app/view/mercado.html",
        controller : "mercadoCtrl"
    })
    .when("/informacoes", {
        templateUrl : "app/view/informacoes.html",
        controller : "infoCtrl"
    })
    .when("/contratos", {
        templateUrl : "app/view/contratos.html",
        controller : "contratosCtrl"
    })
    .when("/aplac", {
        templateUrl : "app/view/aplac2.html",
        controller : "aplacCtrl"
    })
    .when("/portfoliopessoal", {
        templateUrl : "app/view/portfoliopessoal.html",
        controller : "meu_portfolioCtrl"
    })
    .when("/contato", {
        templateUrl : "app/view/contato.html",
        controller : "contatoCtrl"
    })
    .when("/configConta", {
        templateUrl : "app/view/configConta.html",
        controller : "indexCtrl"
    });
});