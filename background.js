'use strict';
// Button to watch immediately

let GetURL = document.getElementById('GetURL');
GetURL.onclick = function(element) {
  getCurrentTabUrl();
};

function getCurrentTabUrl() {
  var queryInfo = {
    active: true,
    currentWindow: true
  };
  chrome.tabs.query(queryInfo, (tabs) => {
    var tab = tabs[0];
    var url = tab.url;
    document.getElementById('url').innerHTML = url;
  });
}

//this is the botton for potato later.

// let Timer = document.getElementById('Timer');
// function openInNewTab(url) {
//   var win = window.open(url, '_blank');
//   win.focus();
// }
 // window.open(url)
 // Looking into this as on option as well for opening the URL in a new tab
