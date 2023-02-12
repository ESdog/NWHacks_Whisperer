import {getRegexOccurences} from "./regex-search.js";
import {scanItemsForMatch, highlightElements, removeDoubleBackslash, removeSingleBackslash} from "./inject-hlmath.js";

const search = document.getElementById("searchText");
const latexBtn = document.getElementById("LatexBtn");
const regexBtn = document.getElementById("RegexBtn");

// If false, search latex, else search regex
// TODO
let state = false;

search.addEventListener("keyup", function () {
    // if(search.value == "") {
    //     return;
    // }
    if (state) {
        getRegexOccurences(search.value);
    } else {
        // TODO system below should be intercepted at background, not injected script
        // posts to wrong window
        chrome.tabs.sendMessage(1, search.value, () => {
            alert("call back function called after inject-hlmath.js");
        });
        console.log(search.value);
        window.postMessage({ type: "FROM_USER", essential: search.value });
    }

});

latexBtn.addEventListener("click", function () {
    latexBtn.className = "active";
    regexBtn.className = "tab";
    state = false;
});

regexBtn.addEventListener("click", function () {
    regexBtn.className = "active";
    latexBtn.className = "tab";
    state = true;
});

latexBtn.click();
