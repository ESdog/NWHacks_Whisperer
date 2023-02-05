import {getRegexOccurences} from "./regex-search.js";

const search = document.getElementById("searchText");
const latexBtn = document.getElementById("LatexBtn");
const regexBtn = document.getElementById("RegexBtn");

// If false, search latex, else search regex
// TODO
let state = false;

search.addEventListener("keyup", function () {
    if(search.value == "") {
        return;
    }
    getRegexOccurences(search.value);

    // TODO system below should be intercepted at background, not injected script
    console.log(search.value);
    window.postMessage({ type: "FROM_USER", essential: search.value });
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
