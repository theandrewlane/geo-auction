(function () {
  'use strict';

  angular
    .module('core')
    .controller('HomeController', HomeController)
    .directive("searchForm", function(){
        return {
            restrict: "E",
            templateUrl: "modules/core/client/views/search-form.html"
        };
    });

  function HomeController() {
    var vm = this;
  }
}());
