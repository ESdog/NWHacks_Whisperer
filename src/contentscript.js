console.log('<----- whisper: content script started running ----->');

function injectScript(file_path, tag) {
    // inject our script at top of body
    var node = document.getElementsByTagName(tag)[0];
    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', file_path);
    node.appendChild(script);
}
// inject inject-script
injectScript(chrome.runtime.getURL('src/inject-script.js'), 'body');

console.log('<----- whisper: bare-bones inject script injected into DOM ----->');




