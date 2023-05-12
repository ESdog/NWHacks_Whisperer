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
    let arr = document.querySelectorAll("img.mwe-math-fallback-image-inline");
    // arr = arr.prototype.push.apply(arr,document.querySelectorAll("img.mwe-math-fallback-image-display"));

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
        ids.push(item.id);
        i++;
    }

    // combine arrays into object
    mathImgs = {
        ids: ids,
        tex: alts
    };
}

initializeWikimedia();


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
    unhighlightImgs(highlightedImgIds);
    highlightedImgIds = scanItemsForMatch(userInputString, mathImgs.ids, mathImgs.tex);
    highlightImgs(highlightedImgIds);
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
const highlightImgs = (matchedElementIds) => {
    for (let i = 0; i < matchedElementIds.length; i++) {
        document.getElementById(matchedElementIds[i]).style.background = "#b0ebe4";
    }
    return matchedElementIds;
}

//@param matchedElementsIds is a list of String
const unhighlightImgs = (matchedElementIds) => {
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


// ================================================
// COMMUNICATION FUNCTIONS
// ================================================


/* Receive search value from whisperUI
 */
chrome.runtime.onConnect.addListener(function(port) {
    port.onMessage.addListener(function(msg) {
        console.log("contentscript received via port:",msg.mymsg);
        window.postMessage(msg.mymsg,"*");

        // search in wikimedia API
        highlightWiki(msg.mymsg);
        console.log("contentscript will highlight:",msg.mymsg);
    });
});



