describe('restaurantController', function () {
    var $httpBackend, $rootScope, createController, authRequestHandler;

    beforeEach(module('restaurant'));

    beforeEach(inject(function ($injector) {

        $httpBackend = $injector.get('$httpBackend');

        authRequestHandler = $httpBackend.when('GET', 'pizzaJson.json')
            .respond({status: 'Success'});


        $rootScope = $injector.get('$rootScope');
        var $controller = $injector.get('$controller');

        createController = function () {
            return $controller('restaurantController', {'$scope': $rootScope});
        };
    }));

    it('should fetch the pizzas.json file', function () {
        $httpBackend.expectGET('pizzaJson.json');
        var controller = createController();
        $httpBackend.flush();
        expect($rootScope.status).toBe(200);

    });
})