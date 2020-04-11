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
