//background.js
let kalturaUrl = null;

chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    if (details.url.includes('https://cfvod.kaltura.com/scf/hls/p/')) {
      kalturaUrl = details.url.replace('scf/hls', 'pd');
    }
  },
  {urls: ["<all_urls>"]},
  ["blocking"]
);

chrome.browserAction.onClicked.addListener(function(tab) {
  if (kalturaUrl) {
    chrome.tabs.create({ url: kalturaUrl });
  } else {
    alert("No Kaltura video detected on this page.");
  }
});