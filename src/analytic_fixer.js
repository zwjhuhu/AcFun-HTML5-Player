let script = document.createElement('script');
// just disable sync xhr before document complete
// but give a navigator.sendBeacon replace in beforeunload and pagehide event
script.textContent = '('
    + (function(){
      if ([
        /acfun\.cn\/v\//,
        /acfun\.cn\/bangumi\//,
        /hapame\.com\/video\//
      ].find(i => i.test(location.href))) {
        console.log('[AHP] 假装有flash');
        navigator.mimeTypes["application/x-shockwave-flash"] = navigator.mimeTypes["application/x-shockwave-flash"] || [];
      }
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
  }).toString() + ')();';
document.firstElementChild.appendChild(script);
