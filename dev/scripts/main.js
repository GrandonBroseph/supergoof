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
