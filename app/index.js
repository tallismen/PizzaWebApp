'use strict';

var app = angular.module('restaurant', [
    'ngRoute',
    'Services'
]);
app.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {

    $locationProvider.hashPrefix('');
    $routeProvider
        .when('/index', {
            templateUrl: "main_page.html",
            controller: "restaurantController"
        })

        .when('/pizza_detail/:pizzaid', {
            templateUrl: "pizza_detail.html",
            controller: "pizza_detailController"
        })
        .when('/besteld', {
            templateUrl: "pizza_besteld.html",
            controller: "pizza_besteldController"
        })
        .otherwise({
            redirectTo: '/index'
        })
}]);
app.controller('pizza_besteldController', function ($scope, dataService) {
    $scope.PizzasBesteld = dataService.getPizzasBesteld();

    $scope.bestelregelWissen = function (index) {
        $scope.PizzasBesteld.splice(index, 1);
        dataService.setPizzasBesteld($scope.PizzasBesteld);
    }

    $scope.bestellingLeegmaken = function () {
        $scope.PizzasBesteld = [];
        dataService.setPizzasBesteld($scope.PizzasBesteld);
    }

    $scope.getBesteldPizzasLenght = function () {
        return $scope.PizzasBesteld.length;
    }

    $scope.totaalCalorien = function () {
        var totaal = 0;
        angular.forEach($scope.PizzasBesteld, function (value, key) {
            totaal = totaal + parseInt(value.calorien);
        });
        return totaal;
    };

    $scope.totaalPrijs = function () {
        var totaal = 0;
        angular.forEach($scope.PizzasBesteld, function (value, key) {
            totaal = totaal + parseInt(value.prijs);
        });
        return totaal;
    }
})

app.controller('pizza_detailController', function ($scope, $routeParams, dataService) {
    $scope.pizzaid = $routeParams.pizzaid;
    $scope.pizza = dataService.getPizzas()[$scope.pizzaid];
});

app.controller("restaurantController", function ($scope, $http, dataService) {
        $scope.Pizzas = dataService.getPizzas();
        $scope.PizzasBesteld = dataService.getPizzasBesteld();

        $http.get("pizzaJson.json").then(function (response) {
            $scope.Pizzas = response.data.pizzas;
            dataService.setPizzas($scope.Pizzas);
            $scope.status = response.status;
        });

        $scope.httpJsonGet = function () {
            $http.get("pizzaJson.json").then(function (response) {
                $scope.Pizzas = response.data.pizzas;
                dataService.setPizzas($scope.Pizzas);
            });
        }

        $scope.addPizza = function () {
            $scope.Pizzas.push({
                naam: $scope.pizzaNaam,
                prijs: $scope.pizzaPrijs,
                calorien: $scope.pizzaCalorien,
                bestelling: $scope.bestelling
            });

            $scope.pizzaNaam = "pizza naam";
            $scope.pizzaPrijs = 0;
            $scope.pizzaCalorien = 0;
            $scope.pizzaBestelling = 0;
            dataService.setPizzas($scope.Pizzas);
        }

        $scope.getPizzasLenght = function () {
            return $scope.Pizzas.length;
        }

        $scope.bestel = function (index) {
            $scope.PizzasBesteld.push($scope.Pizzas[index]);
            dataService.setPizzasBesteld($scope.PizzasBesteld);
        }
    }
);

//http://www.designlama.nl/pizzaJson