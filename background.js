
var urlFilters = [];

// Update url filters
function setUrlFilters() {
    chrome.storage.sync.get("urlFilters", function(data) {
        if (data.urlFilters) {
            urlFilters = data.urlFilters;
        }
    });
}

// Register listener for when user updates url filters
chrome.runtime.onMessage.addListener(setUrlFilters);

// On each page visit, check if url is in one of the url filters
chrome.history.onVisited.addListener((historyItem) => {
    const pageUrl = new URL(historyItem.url);
    urlFilters.forEach(filter => {
        if (pageUrl.hostname.includes(filter)) {
            chrome.history.deleteUrl({url: historyItem.url});
        }
    });
});
