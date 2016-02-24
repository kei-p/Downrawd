const BLOB_PATTERN = /https:\/\/github.com\/(.*)\/blob\/(.*)/;

chrome.tabs.onUpdated.addListener(function(tabId, info, tab){
  if(info.url.match(BLOB_PATTERN)) {
    chrome.pageAction.show(tabId);
  }
});

chrome.pageAction.onClicked.addListener(function(tab){
  chrome.tabs.getSelected(null, function(tab) {
    var url = rawgitUrl(tab.url)
    download(url);
  })
});

function rawgitUrl(url) {
  var contentUrl = url.replace(BLOB_PATTERN, "https://github.com/$1/raw/$2")
  return contentUrl;
}

function download(url) {
  var filename = url.match(".+/(.+?)([\?#;].*)?$")[1]
  var dl = document.createElement('a');
  dl.href = url;
  dl.download = filename;
  dl.click();
};

