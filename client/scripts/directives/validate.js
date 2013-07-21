'use strict';

// Shamelessly copied from: http://jsfiddle.net/pkozlowski_opensource/GcxuT/23/

angular.module('grahamApp.directives')

  .directive('validateEquals', function() {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, elm, attrs, ctrl) {
        function validateEqual(myValue, otherValue) {
          if (myValue === otherValue) {
            ctrl.$setValidity('equal', true);
            return myValue;
          } else {
            ctrl.$setValidity('equal', false);
            return undefined;
          }
        }

        scope.$watch(attrs.validateEquals, function(otherModelValue) {
          validateEqual(ctrl.$viewValue, otherModelValue);
        });

        ctrl.$parsers.unshift(function(viewValue) {
          return validateEqual(viewValue, scope.$eval(attrs.validateEquals));
        });

        ctrl.$formatters.unshift(function(modelValue) {
          return validateEqual(modelValue, scope.$eval(attrs.validateEquals));
        });
      }
    };
  });