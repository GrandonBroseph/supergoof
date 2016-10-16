var parelax = require('./parelax')()

new Vue({
  el: '#wrap'
})

var item = document.querySelector('#screen');
var header = document.querySelector('#header');
var scrollPos, scrollMax, scrollTick;
window.addEventListener("scroll", function(e) {
  scrollPos = document.body.scrollTop;
  scrollMax = item.getBoundingClientRect().height - header.getBoundingClientRect().height - 1;
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

document.querySelector('#screen-arrow').addEventListener('click', function() {
  var velocity = .5
  var speed = 1.08;
  var bounce = .2
  var finito = false
  var bouncing = false
  var max = item.getBoundingClientRect().height - header.getBoundingClientRect().height;
  function loop() {
    if (!bouncing)
      velocity *= speed
    else
      velocity += speed
    document.body.scrollTop += velocity
    if (document.body.scrollTop > max) {
      document.body.scrollTop = max
      velocity *= -bounce
      bouncing = true
      setTimeout(function() {
        finito = true
      }, 1000)
    }
    if (!finito)
      window.requestAnimationFrame(loop)
  }
  loop()
})
