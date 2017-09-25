'use strict';

// describe('restaurantController', function () {
//     beforeEach(module('app'));
//     var $controller;
//
//     beforeEach(inject(function (_$controller_) {
//         $controller = _$controller_;
//     }));
//
//     describe('$scope.grade', function () {
//         it('Testen', function () {
//
//             expect(true).toEqual(false);
//         });
//     });
// });

describe('restaurant module', function () {

    beforeEach(module('restaurant'));

    describe('restaurantController', function () {
        var scope, restaurantController, http, dataService;
        beforeEach(inject(function ($rootScope, $controller, dataService, $http) {
            scope = $rootScope.$new();
            http = $http;
            restaurantController = $controller('restaurantController', {
                dataService: dataService,
                $http: http,
                $scope: scope
            })
        }));
        it('Defined check on restaurantController', function () {
            //spec body
            expect(restaurantController).toBeDefined();
        });
        it('', inject(function ($httpBackend, $http) {

            var $scope = {};

            /* Code Under Test */
            $http.get('pizzaJson.json')
                .success(function (data, status, headers, config) {
                    $scope.valid = true;
                    $scope.response = data;
                })
                .error(function (data, status, headers, config) {
                    $scope.valid = false;
                });
            /* End */

            $httpBackend
                .when('GET', 'pizzaJson.json')
                .respond(200, {foo: 'bar'});

            $httpBackend.flush();

            expect($scope.valid).toBe(true);
            expect($scope.response).toEqual({foo: 'bar'});
        }));
    });
});