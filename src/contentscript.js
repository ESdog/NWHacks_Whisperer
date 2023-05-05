console.log('<----- whisper: content script started running ----->');
let mathImgs = null;

// ================================================
// INITIALIZATION FUNCTIONS
// ================================================

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

window.addEventListener("message", (event) => {
    console.log("contentscript received: " + event.data);
})

/* Catalogue all math images.
 * Symmetric to InitializeMathJax2 and InitializeMathJax2; consider refactoring.
 */
const initializeWikimedia = () => {
    // 'mwe-math-fallback-image-inline' is the specific math image tag used by wikipedia
    const arr = document.querySelectorAll('img.mwe-math-fallback-image-inline');

    // set up arrays to store objects in same order
    let ids = [];
    let alts = [];

    let i = 0; // counter
    for (const item of arr) {
        // access and store latex, which is the alt attribute
        alts.push(item.alt);
        console.log(`initializeWikimedia is adding latex: ` + item.alt);

        // since wikimedia images do not come with html id, we assign id
        item.setAttribute("id", `whisper-id-` + i);
        console.log(`initializeWikimedia assigned id: ` + item.id);  // item is updated live
    }

    // combine arrays into object
    mathImgs = {
        ids: ids,
        tex: alts
    };
}

initializeWikimedia();

// ================================================
// COMMUNICATION FUNCTIONS
// ================================================


/* Receive search value from whisperUI
 */
chrome.runtime.onConnect.addListener(function(port) {
    port.onMessage.addListener(function(msg) {
        console.log("contentscript port.onMessage fired:",msg.mymsg);
        window.postMessage(msg.mymsg,"*");
    });
});





