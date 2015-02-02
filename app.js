(function() {
  var module;

  module = angular.module('app', []);

  module.controller('main', ['$scope', '$http', '$location', '$timeout', (function($scope, $http, $location, $timeout) {})]);

  module.controller('catalyst-choice', [
    '$scope', '$http', '$location', '$timeout', (function($scope, $http, $location, $timeout) {
      $scope.wizard = {
        step: 'catalyst',
        params: {
          catalyst: null,
          carrier: null,
          size: null,
          dispersion: null,
          metal: null
        },
        gotoSize: (function(name) {
          return;
          this.params.carrier = name;
          if (this.params.catalyst === 'vpyk') {
            this.step = 'size';
          } else {
            this.step = 'dispersion';
          }
        }),
        gotoBackFromCell: (function() {
          if (this.params.size.length === 3) {
            this.step = 'size-3x';
          } else {
            this.step = 'size-2x';
          }
          this.params.size = null;
        }),
        gotoBackFromMetal: (function() {
          if (this.params.catalyst === 'vpyk') {
            this.step = 'cell';
          } else {
            this.step = 'dispersion';
          }
          this.params.cell = null;
          this.params.dispersion = null;
        }),
        goBackFromFinal: (function() {
          if (this.params.catalyst === 'vpyk') {
            this.step = 'metalNumbers';
            this.params.metal.number = null;
          } else {
            this.step = 'package';
            this.params["package"] = null;
          }
        })
      };
    })
  ]);

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

  module.directive('descriptionToggleDirective', [
    (function() {
      return {
        restrict: 'C',
        scope: true,
        link: function($scope, element, attrs) {
          $scope.descriptIsShown = false;
          $scope.iconClass = 'icon-angle-down';
          $scope.toggelDescription = (function() {
            $scope.descriptIsShown = !$scope.descriptIsShown;
            if ($scope.descriptIsShown) {
              $scope.iconClass = 'icon-angle-up';
            } else {
              $scope.iconClass = 'icon-angle-down';
            }
          });
        }
      };
    })
  ]);

}).call(this);
