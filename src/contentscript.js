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
    alert('Math message called listener function');

    // check message origin
    const origin = event.data.type;

    if (origin && origin == 'FROM_PAGE') {
        alert('Math received by contentscript');
        ids = event.data.essential.ids;
        tex = event.data.essential.tex;
        scanItemsForMatch(userInputString, ids, tex);
    } else if (origin && origin == 'FROM_USER') {
        alert('User input received by contentscript');
        const input = event.data.essential;

        scanItemsForMatch(input);
    }
});


// ========== utility functions below
const ESCAPE_CHARACTERS = {
    "\b": "b",
    "\f": "f",
    "\n": "n",
    "\r": "r",
    "\t": "t",
    "\v": "v" 
  }


//If "\u" and "\x" are in the strings, not supposed to be possible options, remained
//INVARIANT: ids and tex are tandem worklists and the same length
//returns a match of all the latex that matches userInputStr
//scanItemsForMatch("\frac", ["valid-Id"], ["\\frac"]);  should match and highlight
const scanItemsForMatch = (userInputString, ids, tex) => {
    let matchedElementIds = [];
    for (let i = 0; i < ids.length; i++) {
        latexString = removeDoubleBackslash(tex[i]);
        userInputString = removeSingleBackslash(userInputString);

        if (latexString.includes(userInputString)) {
            matchedElementIds.push(ids[i]);
        }
    }

    highlightElements(matchedElementIds);
    return matchedElementIds;
}

//@param matchedElementsIds is a list of String
const highlightElements = (matchedElementIds) => {
    for (let i = 0; i < matchedElementIds.length; i++) {
        const locationOfElem = document.getElementById(matchedElementIds[i]);
        //!!! TODO
        locationOfElem.parentElement.style.backgroundColor = "red"; //for now
    }
}


//returns the same string except without escaped backslashes 
//ie:""\\frac\n" returns "frac\n"
const removeDoubleBackslash = (texString) => {
    let newString = "";
    for (let i = 0; i < texString.length; i++) {
      if (texString[i] != "\\") {
        newString += texString[i];
      }
    }
    return newString;
  }

  //returns the same string except without escaped backslashes 
  //ie:"\frac\\n" returns "frac\\n"
  const removeSingleBackslash = (texString) => {
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

