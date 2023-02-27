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

/* Get tabID
 */
chrome.tabs.query({active: true, currentWindow: true}, function (tabArray) {
    var tabId = tabArray[0].id;
    console.log("Tab id:", tabId);
    var port = chrome.tabs.connect(tabId);
    console.log("var port as seen by whisperUI: ",port);
    port.postMessage({mymsg: "Knock knock"});
});


