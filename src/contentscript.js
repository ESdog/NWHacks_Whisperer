console.log('<----- whisper: content script started running ----->');
let mathImgs = null;
let highlightedImgIds = [];


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
    console.log("contentscript received via window: " + event.data);
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
        console.log("contentscript received via port:",msg.mymsg);
        window.postMessage(msg.mymsg,"*");
    });
});



// ================================================
// HIGHLIGHTER FUNCTIONS
// ================================================

const ESCAPE_CHARACTERS = {
    "\b": "\\b",
    "\f": "\\f",
    "\n": "\\n",
    "\r": "\\r",
    "\t": "\\t",
    "\v": "\\v"
}

const highlightWiki = (userInputString) => {
    unhighlightElements(highlightedImgIds);
    highlightedElementIds = scanItemsForMatch(userInputString, mathItems.ids, mathItems.tex);
    highlightElements(highlightedElementIds);
}

// If "\u" and "\x" are in the strings, not supposed to be possible options, remained
// INVARIANT: ids and tex are tandem worklists and the same length
// returns a match of all the latex that matches userInputStr
// scanItemsForMatch("\frac", ["valid-Id"], ["\\frac"]);  should match and highlight
const scanItemsForMatch = (userInputString, ids, tex) => {
    let matchedElementIds = [];
    for (let i = 0; i < ids.length; i++) {
        let latexString = tex[i];
        userInputString = parseInBackslash(userInputString);

        if (latexString.includes(userInputString)) {
            matchedElementIds.push(ids[i]);
        }
    }
    return matchedElementIds;
}

//@param matchedElementsIds is a list of String
const highlightElements = (matchedElementIds) => {
    let mathJaxItemObj;
    let highlightedString;
    for (let i = 0; i < matchedElementIds.length; i++) {
        mathJaxItemObj = MathJax.Hub.getAllJax(matchedElementIds[i])[0];
        highlightedString = "\\color{blue}{" + mathJaxItemObj.originalText + "}";
        MathJax.Hub.Queue(["Text",mathJaxItemObj,highlightedString]);
    }
    return matchedElementIds;
}

//@param matchedElementsIds is a list of String
const unhighlightElements = (matchedElementIds) => {
    for (let i = 0; i < matchedElementIds.length; i++) {
        document.getElementById(matchedElementIds[i]).style.background = null;
    }
    return matchedElementIds;
}


//returns the same string except without escaped backslashes
//ie:"\frac\\n" returns "\\frac\\n"
const parseInBackslash = (texString) => {
    const escapedKeys = Object.keys(ESCAPE_CHARACTERS)
    let newString = "";
    for (let i = 0; i < texString.length; i++) {
        const charToParse = texString[i];
        if (escapedKeys.includes(charToParse)) {
            newString += ESCAPE_CHARACTERS[charToParse];
        } else {
            newString += charToParse;
        }
    }
    return newString;
}



