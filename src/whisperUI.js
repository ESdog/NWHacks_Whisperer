window.postMessage("hello from whisperUI","*");
console.log('<----- whisper: bare-bones inject-script said hello ----->');
window.addEventListener("message", (event) => {
    console.log("whisperUI received: " + event.data);
})

/* Post user search as window message on keyup
 */
const search = window.document.getElementById("searchText");
console.log("element to attach keyup listener to:" + search);
search.addEventListener("keyup", function () {
    if(search.value == "") {
        return;
    }
    window.postMessage(search.value,"*");
});

console.log("chrome.tabs API as seen by whisperUI: ",chrome.tabs)

/* Post user search as chrome message on keyup
 */

/* Open connection by providing tabID
 */
function getCurrentTabId(cb) {
    var query = {active: true, currentWindow: true};
    chrome.tabs.query(query, function (tabArray) {
        console.log("Tab id: " + tabArray[0].id);
        cb(tabArray[0].id)
    });
}
function connectToCurrentTab () {
    getCurrentTabId(function(currentTabId) {
        return chrome.tabs.connect(currentTabId, {name: "popup"});
    });
}
var port = connectToCurrentTab();
console.log("var port as seen by whisperUI: ",port)
port.postMessage({joke: "Knock knock"});
port.onMessage.addListener(function(msg) {
    console.log(msg.question);
    if (msg.question === "Who's there?")
        port.postMessage({answer: "Madame"});
    else if (msg.question === "Madame who?")
        port.postMessage({answer: "Madame... Bovary"});
});
