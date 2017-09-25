var services = angular.module('Services', []);

services.service('dataService', function () {
    var Pizzas = [];
    var PizzasBesteld = [];

    var getPizzas = function () {
        return Pizzas;
    }
    var getPizzasBesteld = function () {
        return PizzasBesteld;
    }
    var setPizzas = function (PizzasList) {
        Pizzas = PizzasList;
    }
    var setPizzasBesteld = function (PizzaListBesteld) {
        PizzasBesteld = PizzaListBesteld;
    }
    return {
        getPizzas: getPizzas,
        getPizzasBesteld: getPizzasBesteld,
        setPizzas: setPizzas,
        setPizzasBesteld: setPizzasBesteld
    }
})

