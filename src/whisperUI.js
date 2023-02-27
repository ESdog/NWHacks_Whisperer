/* Post user search as chrome message on keyup
 */

/* Get tabID
 */
chrome.tabs.query({active: true, currentWindow: true}, function (tabArray) {
    var tabId = tabArray[0].id;
    console.log("Tab id:", tabId);
    var port = chrome.tabs.connect(tabId);
    console.log("var port as seen by whisperUI: ",port);
    port.postMessage({mymsg: "Knock knock"});
});


