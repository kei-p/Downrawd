const BLOB_REGEXP = {
  pattern: /(https:\/\/github.com)\/(.*)\/blob\/(.*)/,
  replacement: "$1/$2/raw/$3"
};

chrome.tabs.onUpdated.addListener(function(tabId, info, tab){
  if(info.url.match(BLOB_REGEXP.pattern)) {
    chrome.pageAction.show(tabId);
  }
});

chrome.pageAction.onClicked.addListener(function(tab){
  chrome.tabs.getSelected(null, function(tab) {
    var url = rawgitUrl(tab.url, BLOB_REGEXP)
    var filename = url.match(".+/(.+?)([\?#;].*)?$")[1]
    download(url, filename);
  })
});

function rawgitUrl(url, regexp) {
  var contentUrl = url.replace(regexp.pattern, regexp.replacement)
  return contentUrl;
}

function download(url, filename) {
  var dl = document.createElement('a');
  dl.href = url;
  dl.download = filename;
  dl.click();
};

