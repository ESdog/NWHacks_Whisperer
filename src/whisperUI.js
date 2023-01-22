const search = document.getElementById("searchText");
const latexBtn = document.getElementById("LatexBtn");
const regexBtn = document.getElementById("RegexBtn");
const pressedColour = "rgb(89,89,89)";
const unpressedColour = "rgb(241,241,241)";

// If false, search latex, else search regex
let state = false;

search.addEventListener("keyup", function () {
    alert(search.value);
});
latexBtn.addEventListener("click", function () {
    latexBtn.style.backgroundColor = pressedColour;
    regexBtn.style.backgroundColor = unpressedColour;
    state = false;
});

regexBtn.addEventListener("click", function () {
    regexBtn.style.backgroundColor = pressedColour;
    latexBtn.style.backgroundColor = unpressedColour;
    state = true;
});
