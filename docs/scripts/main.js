(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var parelax = require('./parelax')()

new Vue({
  el: '#wrap'
})

var item = document.querySelector('#screen')
var header = document.querySelector('#header');
var scrollPos, scrollMax, scrollTick;
window.addEventListener("scroll", function(e) {
  scrollPos = document.body.scrollTop;
  scrollMax = item.getBoundingClientRect().height - header.getBoundingClientRect().height;
  if (!scrollTick) {
    window.requestAnimationFrame(function() {
      if (scrollPos > scrollMax) {
        header.classList.add("sticky");
      } else {
        header.classList.remove("sticky");
      }
      scrollTick = false;
    });
  }
  scrollTick = true;
});

},{"./parelax":2}],2:[function(require,module,exports){
module.exports = (function() {
  function load() {
    var attributeName = "data-parallax";
    var elements = document.querySelectorAll("[" + attributeName + "]");
    var data = [];
    console.log(elements)
    for (var i = 0, element; element = elements[i++];) { // Loop through relevant elements
      for (var j = 0, attribute; attribute = element.attributes[j++];) { // Loop through attributes
        if (attribute.name === attributeName) {
          data.push({
            element: element,
            scale: parseFloat(attribute.value)
          });
          // element.removeAttribute(attributeName);
          break;
        }
      }
    }
    var scrollTick, scrollPos;
    function parelax(scrollPos) {
      for (var i = 0, item; item = data[i++];) {
        item.element.style.transform = "translateY("+(scrollPos * item.scale)+"px)";
        console.log(item, scrollPos, "translateY("+(scrollPos * item.scale)+"px)");
      }
    }
    function listener(event) {
      scrollPos = ((event && event.target.scrollingElement) || document.body).scrollTop;
      if (!scrollTick) {
        window.requestAnimationFrame(function() {
          parelax(scrollPos);
          scrollTick = false;
        });
      }
      scrollTick = true;
    }
    ["load", "scroll", "resize", "orientationchange"].some(function(event) {
      window.addEventListener(event, listener)
    });
    return {}
  }
  // window.addEventListener("load", load);
  return load;
})();

},{}]},{},[1]);
