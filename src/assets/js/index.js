//
// index.js
//

'use strict';

var MYEJSPROJECT = {};

MYEJSPROJECT = {

  init : function(){

    MYEJSPROJECT.os = MYEJSPROJECT.checkDevice();
    MYEJSPROJECT.ww = $(window).width();
    MYEJSPROJECT.wh = $(window).height();
    MYEJSPROJECT.st = 0;

    $(function(){
      MYEJSPROJECT.bind();
    });

    $(window)
      .on('load', function() {
      })
      .on('scroll touchmove', function(e) {
      });

  },

  bind : function() {
    MYEJSPROJECT.smoothScroll.init();
  },

  //
  // check device
  //
  checkDevice : function(){
    var u = window.navigator.userAgent.toLowerCase();
    if(u.indexOf("iphone") != -1) { return 'iphone' }
    else { return null }
    // var _ua = (function(u){
      // return {
      //   Tablet:(u.indexOf("windows") != -1 && u.indexOf("touch") != -1 && u.indexOf("tablet pc") == -1)
      //     || u.indexOf("ipad") != -1
      //     || (u.indexOf("android") != -1 && u.indexOf("mobile") == -1)
      //     || (u.indexOf("firefox") != -1 && u.indexOf("tablet") != -1)
      //     || u.indexOf("kindle") != -1
      //     || u.indexOf("silk") != -1
      //     || u.indexOf("playbook") != -1,
      //   Mobile:(u.indexOf("windows") != -1 && u.indexOf("phone") != -1)
      //     || u.indexOf("iphone") != -1
      //     || u.indexOf("ipod") != -1
      //     || (u.indexOf("android") != -1 && u.indexOf("mobile") != -1)
      //     || (u.indexOf("firefox") != -1 && u.indexOf("mobile") != -1)
      //     || u.indexOf("blackberry") != -1
      // }
    // })(window.navigator.userAgent.toLowerCase());
    // if(_ua.Tablet){
    //   return 'tablet'
    // } else if(_ua.Mobile){
    //   return 'sp';
    // } else {
    //   return 'pc';
    // }
  },

}

MYEJSPROJECT.init();
