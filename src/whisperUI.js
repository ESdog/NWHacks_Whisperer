/* Send message from whisperUI to contentscript
 */
chrome.tabs.query({active: true, currentWindow: true}, function (tabArray) {
    /*
    chrome.tabs.query is used to get the tabId, which is required in chrome.tabs.connect(tabId).
    The tabId is only alive inside this function scope.
     */
    var tabId = tabArray[0].id;
    console.log("whisperUI tab id:", tabId);

    /*

     */
    var port = chrome.tabs.connect(tabId);
    port.postMessage({mymsg: "hello hello from whisperUI through chrome.runtime.port!"});
    console.log('<----- sent message from whisperUI to contentscript via chrome.runtime.port ----->');
});


