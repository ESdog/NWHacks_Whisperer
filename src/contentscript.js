console.log('<----- Content script started running ----->');

function injectScript(file_path, tag) {
    // inject our script at top of body
    var node = document.getElementsByTagName(tag)[0];
    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', file_path);
    node.appendChild(script);
}
// inject get math script
injectScript(chrome.runtime.getURL('src/inject-script.js'), 'body');

// inject highlight latex script
injectScript(chrome.runtime.getURL('src/inject-hlmath.js'), 'body');

console.log('<----- Inject script injected into DOM ----->');

window.addEventListener("message", function (event) {
    // only accept messages from the current tab
    if (event.source != window)
        return;

    // remove condition (chrome.app.isInstalled)
    if (event.data.type && (event.data.type == "FROM_PAGE")) {
        chrome.runtime.sendMessage({ essential: event.data.essential });
    }
}, false);



