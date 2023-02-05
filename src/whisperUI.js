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
    // getRegexOccurences(search.value);

    chrome.storage.local.set({ FROM_USER: search.value }).then(() => {
        console.log("chrome.storage.local value under key FROM_USER is set to " + search.value);
    });
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
