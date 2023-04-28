console.log('<----- whisper: content script started running ----->');

/* Get inject-script into webpage DOM
*/
function injectScript(file_path, tag) {
    // inject our script at top of body
    var node = document.getElementsByTagName(tag)[0];
    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', file_path);
    node.appendChild(script);
}
injectScript(chrome.runtime.getURL('src/inject-script.js'), 'body');
console.log('<----- whisper: bare-bones inject script injected into DOM ----->');

window.postMessage("hello from contentscript","*");
console.log('<----- whisper: bare-bones contentscript said hello ----->');
window.addEventListener("message", (event) => {
    console.log("contentscript received: " + event.data);
})




/* Receive search value from whisperUI
 */
chrome.runtime.onConnect.addListener(function(port) {
    port.onMessage.addListener(function(msg) {
        console.log("contentscript port.onMessage fired:",msg.mymsg);
    });
});



