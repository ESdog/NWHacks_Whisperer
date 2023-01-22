console.log('<----- Injected script started running ----->');

// return json type object {"MathJax": MathJax DOM object}
function checkMathJax() {
    let main = {};
   // solution to "window.MathJax is not a function" — it is just an attribute
    main.MathJax = window.MathJax;

    // this breakpoint works!
    alert(`MathJax Version:` + main.MathJax.version);
    return main;
}

// setInterval(() => {
//     let mathjax = checkMathJax();
//     window.postMessage({ type: "FROM_PAGE", essential: mathjax });
// }, 500);

let mathjax = checkMathJax();
// postMessage is not able to construct objects with methods, thus, flatten mathjax into string
mathjax = JSON.parse(JSON.stringify(mathjax));
window.postMessage({ type: "FROM_PAGE", essential: mathjax });



// console.log('<----- Content script started running ----->');
//
// function injectScript(file_path, tag) {
//     var node = document.getElementsByTagName(tag)[0];
//     var script = document.createElement('script');
//     script.setAttribute('type', 'text/javascript');
//     script.setAttribute('src', file_path);
//     node.appendChild(script);
// }
//
// injectScript(chrome.extension.getURL('inject-script.js'), 'body');
//
// window.addEventListener("message", function (event) {
//     // only accept messages from the current tab
//     if (event.source != window)
//         return;
//
//     if (event.data.type && (event.data.type == "FROM_PAGE") && typeof chrome.app.isInstalled !== 'undefined') {
//         chrome.runtime.sendMessage({ essential: event.data.essential });
//     }
// }, false);