"use strict";

(function(){
  angular
    .module("wdinstagram", ["ui.router"])
    .config(['$stateProvider', RouterFunction])
    .controller("instagram_controller", InstagramController)
    .controller("WDIGIndexController", WDIGIndexController)

    function RouterFunction($stateProvider){
      $stateProvider
      .state("wdinstagramIndex", {
        url: "/wdinstagrams",
        templateUrl: "js/index.html",
        controller: "WDIGIndexController",
        controllerAs: "indexVm"
      });
    }


    function InstagramController(){
      var vm = this;
      vm.addGram = function() {
        vm.grams.push({photo_url: this.photo_url, author: this.author, body: this.body});
        vm.photo_url = '';
        vm.author = '';
        vm.body = '';
      };
      vm.update = function(){
        vm.data[i] = {photo_url: this.photo_url, author: this.author, body: this.body};
      };
      vm.delete = function(){
        vm.data.splice(i, 1);
      };
    };

    function WDIGIndexController(){
      var indexVm = this;
      indexVm.grams = [
        {photo_url: "http://i.telegraph.co.uk/multimedia/archive/03597/POTD_chick_3597497k.jpg", author: "Billy", body: "woo, picture"},
        {photo_url: "http://media2.s-nbcnews.com/j/msnbc/components/video/__new/ss-2015-yip-31-vid-tease.nbcnews-ux-1080-600.jpg", author: "Shannon", body: "i also took a picture"},
        {photo_url: "https://pbs.twimg.com/profile_images/625105219102318592/M5Zq8Fvx_400x400.jpg", author: "Ny'jae", body: "this is an eagle, amazing"}
      ];
      indexVm.addGram = function() {
        indexVm.grams.push({photo_url: this.photo_url, author: this.author, body: this.body});
        indexVm.photo_url = '';
        indexVm.author = '';
        indexVm.body = '';
      };

    };
})();
