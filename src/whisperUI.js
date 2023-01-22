//import {getRegexOccurrences} from "/Whisper/src/regex-search.js";

const search = document.getElementById("searchText");
const latexBtn = document.getElementById("LatexBtn");
const regexBtn = document.getElementById("RegexBtn");

// If false, search latex, else search regex
let state = false;

search.addEventListener("keyup", function () {
    getRegexOccurrences(search.value);
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

function getRegexOccurrences(expression) {
    //alert("called RegEx highlight")
    const regex = new RegExp(expression, 'gi');

    findTextInNode(window.document.body, expression);
}

function findTextInNode (parentNode, expression) {
    for(let i = parentNode.childNodes.length-1; i >= 0; i--){
        let node = parentNode.childNodes[i];

        //  Make sure this is a text node
        if(node.nodeType == Element.TEXT_NODE){
            let text = node.textContent;
            text = text.replace(/(<span style="background-color:red>|<\/span>)/gim, '');

            const newText = text.replace(expression,'$1<span style="background-color:red;">$2</span>');
            node.textContent = newText;
        } else if(node.nodeType == Element.ELEMENT_NODE){
            //  Check this node's child nodes for text nodes to act on
            findTextInNode(node, expression);
        }
    }
}