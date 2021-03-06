(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
require('./ng-app');


},{"./ng-app":4}],2:[function(require,module,exports){
var data;

data = {
  vpyk: {
    titleParams: {
      name: {
        vpyk: 'ВПЯК'
      },
      metal: {
        gm: 'Гамма',
        zr: 'Циркон',
        cb: 'Карбон'
      }
    },
    subtitle: 'катализатор гидрирования',
    processes: {
      cb: [['Селективное восстановление аминов', 'Селективное восстановление моно- нитросоединений', 'Селективное восстановление оксимов'], ['Гидрирование моно- нитросоединений', 'Тонкий органический синтез']],
      zr: [['Селективное гидрообессеривание', 'Селективное восстановление ароматических нитросоединений'], ['Диспропорционирование', 'Гидрообессеривание']],
      gm: [['гидрообессеривание', 'восстановление мононитросоединениий', 'селективное гидрирование ацетилена', 'селективное гидрирование этилена'], ['гидрирование ароматических углеводородов', 'гидрирование альдегидов', 'гидрирование органических кислот', 'гидрирование динитро-, тринитросоединений ']]
    },
    params: {
      catalyst: 'блочный, стационарный',
      carrierArray: {
        gm: 'гамма',
        zr: 'диоксид циркония',
        cb: 'углерод'
      },
      cellArray: ['10ppi / 3-5мм', '20ppi - 1-2,5мм', '30ppi - 0,5-1мм'],
      process: 'жидкофазный',
      metalArray: {
        Pd: 'Pd/палладий',
        Pt: 'Pt/платина',
        Ni: 'Ni/никель'
      },
      metalMass: '0,2 мас %'
    },
    techParams: {
      matrix: 'корунд/альфа оксид алюминия',
      activeSurface: '150-200 м2/г',
      compressiveStrength: '1,5 -2,5 МПа',
      acidAlkaliResistance: '99,9%',
      regenerations: 'от 50 циклов'
    },
    addParams: {
      microporosity: 'канальная/полусферическая'
    },
    equipment: ['shaker', 'noatube', 'noatube duos', 'noatube microlab']
  }
};

module.exports = data;


},{}],3:[function(require,module,exports){
var extendDeep;

extendDeep = (function(dst) {
  angular.forEach(arguments, function(obj) {
    if (obj !== dst) {
      angular.forEach(obj, function(value, key) {
        if (dst[key] && dst[key].constructor && dst[key].constructor === Object) {
          extendDeep(dst[key], value);
        } else {
          dst[key] = value;
        }
      });
    }
  });
  return dst;
});

module.exports = extendDeep;


},{}],4:[function(require,module,exports){
var ngModule;

module.exports = (ngModule = angular.module('app', [require('./ng-catalyst'), require('./ng-wizard-catalyst'), require('./ng-filter')])).name;

ngModule.controller('main', ['$scope', '$http', '$location', '$timeout', (function($scope, $http, $location, $timeout) {})]);

ngModule.directive('yandexMap', [
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

ngModule.directive('descriptionToggleDirective', [
  (function() {
    return {
      restrict: 'C',
      scope: true,
      link: function($scope, element, attrs) {
        var btnEl;
        $scope.descriptIsShown = false;
        $scope.iconClass = 'icon-angle-down';
        btnEl = $('.wizard-btn');
        $scope.toggelDescription = (function() {
          $scope.descriptIsShown = !$scope.descriptIsShown;
          if ($scope.descriptIsShown) {
            $scope.iconClass = 'icon-angle-up';
            btnEl.addClass('open');
          } else {
            $scope.iconClass = 'icon-angle-down';
            btnEl.removeClass('open');
          }
        });
      }
    };
  })
]);

$(function() {
  $('#hideAll .loader').css({
    marginTop: window.innerHeight * 0.4
  });
  $(window).load(function() {
    return $('#hideAll').css({
      display: 'none'
    });
  });
  return $(window).load(function() {
    return $('#portfolio_item .loader').css({
      display: 'none'
    });
  });
});


},{"./ng-catalyst":5,"./ng-filter":6,"./ng-wizard-catalyst":7}],5:[function(require,module,exports){
var catalystData, extendDeep, metalNumberTitle, ngModule,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

module.exports = (ngModule = angular.module('catalyst', [])).name;

catalystData = require('./catalyst-data');

extendDeep = require('./extend-deep');

ngModule.controller('catalyst', [
  '$scope', '$http', '$location', '$timeout', (function($scope, $http, $location, $timeout) {
    var carrierName, cellIndex, metalName, metalNumber, product, ref, size, sizeStr, urlStr;
    urlStr = location.href;
    console.log('carrier:', carrierName = $.url(urlStr).param('cr'));
    console.log('size:', size = $.url(urlStr).param('sz'));
    console.log('metalName:', metalName = $.url(urlStr).param('m'));
    console.log('metalNumber:', metalNumber = $.url(urlStr).param('mn'));
    console.log('cellIndex:', cellIndex = $.url(urlStr).param('cl'));
    if (0 <= ['gm', 'zr', 'cb', 'tz'].indexOf(carrierName)) {
      product = $scope.product = catalystData['vpyk'];
      $scope.product.title = product.titleParams.name['vpyk'] + "/" + product.titleParams.metal[carrierName] + "/" + metalNumberTitle(metalName, +metalNumber) + "/10-30ppi";
      if (metalNumber <= 1) {
        $scope.product.subtitle = 'катализатор селективного гидрирования';
        $scope.product.processes = catalystData['vpyk'].processes[carrierName][0];
      } else {
        $scope.product.processes = catalystData['vpyk'].processes[carrierName][1];
      }
      $scope.product.params.carrier = product.params.carrierArray[carrierName];
      $scope.product.techParams.activeSubstrate = product.params.carrierArray[carrierName];
      if (ref = +cellIndex, indexOf.call([0, 1, 2], ref) >= 0) {
        $scope.product.params.cell = product.params.cellArray[cellIndex];
      }
      $scope.product.params.metal = product.params.metalArray[metalName];
      $scope.product.params.metalMass = metalNumber + ' мас %';
      if (size != null) {
        size = size.split(',');
        if (size.length === 2) {
          sizeStr = "Диаметр " + size[0] + "мм, высота " + size[1] + "мм";
        }
        if (size.length === 3) {
          sizeStr = "Длина " + size[0] + "мм, ширина " + size[1] + "мм, высота " + size[2] + "мм";
        }
        $scope.product.params.size = sizeStr;
      }
      $scope.catalystOrder = function() {
        return $scope.modaIsShown = !$scope.modaIsShown;
      };
      $scope.request = {
        name: null,
        phone: null,
        email: null,
        message: null,
        send: (function() {
          $scope.modaIsShown = false;
          $.ajax({
            method: 'POST',
            url: "https://mandrillapp.com/api/1.0/messages/send.json",
            data: {
              key: 'XrhYSIo5ZAQ6Dcbp5ItPDA',
              message: {
                subject: 'Заявка с сайта rus-cat.com',
                html: '<h2>Заявка с сайта rus-cat.com</h2><ul><li>' + $scope.product.title + '</li></li><li>' + $scope.request.name + '</li><li>' + $scope.request.phone + '</li><li>' + $scope.request.email + '</li><li>' + $scope.request.message + '</li></ul><h3>Параметры</h3><ul><li>размеры:' + size + '</li><li>Содержание активного металла:' + metalNumber + '</li></ul>',
                text: $scope.product.title + ', Имя: ' + $scope.request.name + ', тел.: ' + $scope.request.phone + ', email.: ' + $scope.request.email + ', сообщение: ' + $scope.message,
                from_email: 'info@rus-cat.com',
                to: [
                  {
                    email: 'noateq@gmail.com',
                    name: 'Иван',
                    type: 'to'
                  }, {
                    email: 'pepelazz00@gmail.com',
                    name: 'admin',
                    type: 'to'
                  }
                ]
              }
            }
          }).done((function(data) {
            console.info(data);
          })).fail((function() {
            console.error('server not respond');
          }));
          $scope.request.name = null;
          $scope.request.phone = null;
          $scope.request.email = null;
          $scope.request.message = null;
          return false;
        })
      };
    }
  })
]);

metalNumberTitle = (function(mlName, mlNum) {
  if (mlName === 'Pd') {
    switch (true) {
      case mlNum <= 1:
        return '0,2-1Pd';
      default:
        return '1,5-5Pd';
    }
  }
});


},{"./catalyst-data":2,"./extend-deep":3}],6:[function(require,module,exports){
var ngModule;

module.exports = (ngModule = angular.module('filter', [])).name;

ngModule.controller('filter', [
  '$scope', '$http', '$location', '$timeout', (function($scope, $http, $location, $timeout) {
    var filterName;
    $scope.filterOrder = function() {
      return $scope.modaIsShown = !$scope.modaIsShown;
    };
    filterName = $('article.production_details h4').html();
    $scope.request = {
      name: null,
      phone: null,
      email: null,
      message: null,
      send: (function() {
        $scope.modaIsShown = false;
        $.ajax({
          method: 'POST',
          url: "https://mandrillapp.com/api/1.0/messages/send.json",
          data: {
            key: 'XrhYSIo5ZAQ6Dcbp5ItPDA',
            message: {
              subject: 'Заявка с сайта rus-cat.com',
              html: '<h2>Заявка с сайта rus-cat.com</h2><ul><li>' + filterName + '</li></li><li>' + $scope.request.name + '</li><li>' + $scope.request.phone + '</li><li>' + $scope.request.email + '</li><li>' + $scope.request.message + '</li></ul>',
              text: filterName + ', Имя: ' + $scope.request.name + ', тел.: ' + $scope.request.phone + ', email.: ' + $scope.request.email + ', сообщение: ' + $scope.message,
              from_email: 'info@rus-cat.com',
              to: [
                {
                  email: 'noateq@gmail.com',
                  name: 'Иван',
                  type: 'to'
                }, {
                  email: 'pepelazz00@gmail.com',
                  name: 'admin',
                  type: 'to'
                }
              ]
            }
          }
        }).done((function(data) {
          console.info(data);
        })).fail((function() {
          console.error('server not respond');
        }));
        $scope.request.name = null;
        $scope.request.phone = null;
        $scope.request.email = null;
        $scope.request.message = null;
        return false;
      })
    };
  })
]);


},{}],7:[function(require,module,exports){
var ngModule;

module.exports = (ngModule = angular.module('wizard-catalyst', [])).name;

ngModule.controller('catalyst-choice', [
  '$scope', '$http', '$window', '$location', '$timeout', (function($scope, $http, $window, $location, $timeout) {
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
    $scope.$watch('wizard.step', (function(newVal) {
      var params;
      if (newVal === 'final') {
        params = [];
        params.push("cr=" + $scope.wizard.params.carrier);
        params.push("sz=" + $scope.wizard.params.size);
        if ($scope.wizard.params.dispersion != null) {
          params.push("dsp=" + $scope.wizard.params.dispersion);
        }
        if ($scope.wizard.params.cell != null) {
          params.push("cl=" + $scope.wizard.params.cell);
        }
        params.push("m=" + $scope.wizard.params.metal.name);
        params.push("mn=" + $scope.wizard.params.metal.number);
        if ($scope.wizard.params["package"] != null) {
          params.push("pg=" + $scope.wizard.params["package"]);
        }
        $window.location.assign("http://rus-cat.com/production/vpyk.html?" + params.join('&'));
      }
    }));
  })
]);


},{}]},{},[1]);
