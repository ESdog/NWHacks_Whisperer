alert(`Content script should be working`)
// alert is used as breakpoint

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





//========== ignire below


// returns array of all math jax objects
const getAllMathItems = () => {
    const mathJaxObj = window.MathJax;

    if (mathJaxObj && mathJaxObj.version[0] == '2') {
        const mathItems = mathJaxObj.Hub.getAllJax();
        return mathItems;
    } else {
        console.log("MathJax version 2 not found on site as window.MathJax = " + mathJaxObj );
        return;
    }
}

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



