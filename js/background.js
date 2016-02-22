chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
  chrome.pageAction.show(sender.tab.id);
});

chrome.pageAction.onClicked.addListener(function(tab){
  chrome.tabs.getSelected(null, function(tab) {
    var url = rawgitUrl(tab.url)
    download(url);
  })
});

function rawgitUrl(url) {
  var contentUrl = url.replace(/https:\/\/github.com\/(.*)\/blob\/(.*)/, "https://github.com/$1/raw/$2")
  return contentUrl;
}

function download(url) {
  var filename = url.match(".+/(.+?)([\?#;].*)?$")[1]
  var dl = document.createElement('a');
  dl.href = url;
  dl.download = filename;
  dl.click();
};

