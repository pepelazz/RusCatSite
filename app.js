(function() {
  var module;

  module = angular.module('rus-cat-app', []);

  module.controller('main', ['$scope', '$http', '$location', '$timeout', (function($scope, $http, $location, $timeout) {})]);

  module.directive('yandexMap', [
    (function() {
      return {
        restrict: 'A',
        link: function($scope, element, attrs) {
          var coord, fixContentHeight, init;
          fixContentHeight = function() {
            var width;
            width = $(window).width();
            $(element).css('height', 500).css('width', width);
          };
          fixContentHeight();
          $(window).resize(function() {
            fixContentHeight();
          });
          coord = $scope.$eval(attrs.yandexMap);
          console.log(coord);
          init = (function() {
            var myMap;
            myMap = new ymaps.Map("map", {
              center: [coord.lat, coord.lon],
              zoom: 15
            });
            myMap.controls.add('zoomControl', {
              left: 5,
              top: 15
            });
            myMap.balloon.open([coord.lat, coord.lon], coord.adr, {
              closeButton: false
            });
          });
          ymaps.ready(init);
        }
      };
    })
  ]);

}).call(this);
