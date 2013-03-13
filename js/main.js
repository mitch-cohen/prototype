
var app = angular.module('app',['ui']);


app.directive("output",function(){
    return {
        compile: function compile(tElement, tAttrs) {
            var iframe = $('<iframe />');
            tElement.append(iframe);
            return function postLink(scope, iElement, iAttrs) { }
        }

    };

});