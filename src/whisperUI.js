import {getRegexOccurences} from "./regex-search.js";

const search = document.getElementById("searchText");
const latexBtn = document.getElementById("LatexBtn");
const regexBtn = document.getElementById("RegexBtn");

// If false, search latex, else search regex
let state = false;

search.addEventListener("keyup", function () {
    getRegexOccurences(search.value);

    // system below should be unneeded
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
