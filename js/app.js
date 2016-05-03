"use strict";

(function(){
  angular
    .module("wdinstagram", ["ui.router", "ngResource"])
    .config(['$stateProvider', RouterFunction])
    .controller("WDIGIndexController", WDIGIndexController)
    .controller("WDIGShowController", WDIGShowController)
    .factory("InstagramFactory", InstagramFactory)

    function RouterFunction($stateProvider){
      $stateProvider
      .state("wdinstagramIndex", {
        url: "/wdinstagrams",
        templateUrl: "js/index.html",
        controller: "WDIGIndexController",
        controllerAs: "indexVm"
      })
      .state("wdinstagramShow", {
        url: "/wdinstagrams/:id",
        templateUrl: "js/show.html",
        controller: "WDIGShowController",
        controllerAs: "showVm"
      })
    }

    InstagramFactory.$inject = ["$resource"];
    function InstagramFactory($resource){
      return $resource("http://localhost:3000/entries/:id.json", {}, {
        update: {method: "PUT"}
      });
    };

    WDIGIndexController.$inject = [ "InstagramFactory" ];
    function WDIGIndexController(InstagramFactory){
      var indexVm = this;
      indexVm.grams = InstagramFactory.query();
      indexVm.newGram = "";
      indexVm.newGram = new InstagramFactory();
      indexVm.addGram = function($state) {
        indexVm.newGram.$save().then(function(res){
          indexVm.grams.push(res)
        })
      };
    }

    WDIGShowController.$inject = [ "InstagramFactory", "$stateParams" ];
    function WDIGShowController(InstagramFactory, $stateParams){
      var showVm = this;
      showVm.gram = InstagramFactory.get({id: $stateParams.id});
      showVm.update = function(){
        showVm.gram.$update({id: $stateParams.id});
      };
      showVm.delete = function(){
        showVm.gram.$delete({id: $stateParams.id});
      }
    };
})();
