let script = document.createElement('script');
script.textContent = '(' + (function () {
  window.addEventListener('beforeunload', function () {
    XMLHttpRequest = function () {
      return {
        open: function (method, url, async) {
          this.url = url;
        },
        send: function (data){
          navigator.sendBeacon(this.url, data);
          console.log('beacon queued', this.url, data);
        },
      }
    };
  })
}).toString() + ')();';
document.firstElementChild.appendChild(script);
