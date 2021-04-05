
// Fill in the current url filters in the text area
chrome.storage.sync.get("urlFilters", function(data) {
    if (data.urlFilters) {
        var urlsField = document.getElementById("urls")
        urlsField.value = data.urlFilters.join("\n") + "\n";
    }
});

// Set function for save button
document.getElementById("saveButton").addEventListener("click", saveUrls);

// Update url filters
function saveUrls() {
    const urlsField = document.getElementById("urls");
    const urls = urlsField.value.split("\n").filter(n => n);
    chrome.storage.sync.set({ urlFilters: urls });
    chrome.runtime.sendMessage({ urlFilters: urls });
    document.getElementById("successMessage").innerHTML = "Successfully saved new url filters!";
}
