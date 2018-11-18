let script = document.createElement('script');
//just disable sync xhr
script.textContent = `
  const oriOpen = window.XMLHttpRequest.prototype.open;
  window.XMLHttpRequest.prototype.open = function(method,url,async){
    oriOpen.call(this,method,url);
  }`;
document.firstElementChild.appendChild(script);
