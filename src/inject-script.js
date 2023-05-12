console.log('<----- whisper: bare-bones inject-script started running ----->');
let windowType = "";
let mathItems = null;
// {   version: string
//     ids: array,
//     tex: array};
let highlightedElementIds = [];


// ================================================
// INITIALIZATION FUNCTIONS
// ================================================

// use v2 syntax to get math items
const initializeMathJax2 = () => {
    const arr = window.MathJax.Hub.getAllJax();

    // set up arrays to store objects in same order
    let inputIds = [];
    let originalTexts = [];

    for (const item of arr) {
        // access using v2 keys
        inputIds.push(item.inputID);
        originalTexts.push(item.originalText);
        console.log(`initializeMathJax2: adding tex ` + item.originalText);
    }

    // combine arrays into object
    mathItems = {
        version: `MathJax Version ` + window.MathJax.version,
        ids: inputIds,
        tex: originalTexts};
}

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

const highlightMathJax2 = (userInputString) => {
    unhighlightElements(highlightedElementIds);
    highlightedElementIds = scanItemsForMatch(userInputString, mathItems.ids, mathItems.tex);
    highlightElements(highlightedElementIds);
}

//If "\u" and "\x" are in the strings, not supposed to be possible options, remained
//INVARIANT: ids and tex are tandem worklists and the same length
//returns a match of all the latex that matches userInputStr
//scanItemsForMatch("\frac", ["valid-Id"], ["\\frac"]);  should match and highlight
const scanItemsForMatch = (userInputString, ids, tex) => {
    let matchedElementIds = [];
    userInputString = parseInBackslash(userInputString);
    if (userInputString.length == 0) return matchedElementIds;

    for (let i = 0; i < ids.length; i++) {
        let latexString = tex[i];
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
        mathJaxItemObj = document.getElementById(matchedElementIds[i]);
        mathJaxItemObj.parentElement.style.background = 'red';
    }
    return matchedElementIds;
}

//@param matchedElementsIds is a list of String
const unhighlightElements = (matchedElementIds) => {
    let mathJaxItemObj;
    let unhighlightedString;
    for (let i = 0; i < matchedElementIds.length; i++) {
        mathJaxItemObj = document.getElementById(matchedElementIds[i]);
        mathJaxItemObj.parentElement.style.background = 'white';
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
// GET INJECT-SCRIPT GOING
// ================================================

const initializeAll = () => {
    const mathJaxObj = window.MathJax;

    if (mathJaxObj && mathJaxObj.version[0] == '2') {
        console.log('Searching MathJax version' + mathJaxObj.version);
        windowType = "MathJax 2";
        initializeMathJax2();
    } else if (mathJaxObj && mathJaxObj.version[0] == '3') {
        console.log('Searching MathJax version' + mathJaxObj.version);
        windowType = "MathJax 3";
        // TODO !!!
    } else { // no mathjax
        console.log('Searching lurking image math... wikmedia API?');
        windowType = "Image";
        // TODO !!!
    }
}
initializeAll();

window.postMessage("hello from inject-script","*");
console.log('<----- whisper: bare-bones inject-script said hello ----->');
window.addEventListener("message", (event) => {
    console.log("inject-script received: " + event.data);
    // TODO !!! : if recieved userInput, you will call the following functions depending on windowType:
    //   if windowType = "MathJax 2"
    //          you call: highlightMathJax2(string userInput);
    highlightMathJax2(event.data);
})

