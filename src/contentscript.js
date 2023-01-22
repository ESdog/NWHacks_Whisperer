console.log('<----- Content script started running ----->');

function injectScript(file_path, tag) {
    // inject our script at top of body
    var node = document.getElementsByTagName(tag)[0];
    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', file_path);
    node.appendChild(script);
}

injectScript(chrome.runtime.getURL('src/inject-script.js'), 'body');

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


// ========================= get math items from insert-script, store as global variable
let ids;
let tex;
window.addEventListener("message", (event)=>{
    // Normally you would check event.origin
    // To verify the targetOrigin matches
    // this window's domain
    const origin = event.data.type;

    if (origin && origin == 'FROM_PAGE') {
        alert('Message received by contentscript');
        ids = event.data.essential;
        tex = event.data.essential.tex;
    }
});


// ========== ignore below


// ERROR: does not like backslashes
//returns a match of all the latex that matches userInputStr
const scanItemsForMatch = (userInputString) => {
    const matchedElements = getAllMathItems().filter((mathItem) => {
        userInputString = userInputString;
        const itemLatex = mathItem.originalText;

        return itemLatex.includes(userInputString);
    });

    highlightElements(matchedElements);
    return matchedElements;
}

//@param matchedElements
const highlightElements = (matchedElements) => {
    for (let i = 0; i < matchedElements.length; i++) {
        const locationOfElem = document.getElementById(matchedElements[i].inputID);
        locationOfElem.parentElement.style.backgroundColor = "red"; //for now
    }
}



