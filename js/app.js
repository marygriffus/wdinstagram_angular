"use strict";

(function(){
  angular
    .module("wdinstagram", ["ui.router"])
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


    function InstagramFactory(){
      var igf = this;
      igf.grams = [
        {photo_url: "http://i.telegraph.co.uk/multimedia/archive/03597/POTD_chick_3597497k.jpg", author: "Billy", body: "woo, picture"},
        {photo_url: "http://media2.s-nbcnews.com/j/msnbc/components/video/__new/ss-2015-yip-31-vid-tease.nbcnews-ux-1080-600.jpg", author: "Shannon", body: "i also took a picture"},
        {photo_url: "https://pbs.twimg.com/profile_images/625105219102318592/M5Zq8Fvx_400x400.jpg", author: "Ny'jae", body: "this is an eagle, amazing"}
      ];
      return igf.grams;
    };

    WDIGIndexController.$inject = [ "InstagramFactory" ]
    function WDIGIndexController(InstagramFactory){
      var indexVm = this;
      indexVm.grams = InstagramFactory
      indexVm.addGram = function() {
        InstagramFactory.grams.push({photo_url: this.photo_url, author: this.author, body: this.body});
        indexVm.photo_url = '';
        indexVm.author = '';
        indexVm.body = '';
      };
    };

    WDIGShowController.$inject = [ "InstagramFactory", "$stateParams" ];
    function WDIGShowController(InstagramFactory, $stateParams){
      var showVm = this;
      showVm.grams = InstagramFactory
      showVm.gram = showVm.grams[$stateParams.id]
      console.log(showVm.gram)
    };
})();
