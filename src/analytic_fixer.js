let script = document.createElement('script');
// just disable sync xhr before document complete
// but give a navigator.sendBeacon replace in beforeunload and pagehide event
script.textContent = `
  (function(){
      const oriOpen = window.XMLHttpRequest.prototype.open;
      window.XMLHttpRequest.prototype.open = function(method,url,async){
        if (async === false) {
            console.log('requested sync xhr to: ', url);
        }
        oriOpen.call(this,method,url);
      }
      window.addEventListener('beforeunload', function () {
        window.XMLHttpRequest = function () {
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
      });
  })()`;
document.firstElementChild.appendChild(script);
