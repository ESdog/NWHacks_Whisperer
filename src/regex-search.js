// From https://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
function escapeRegex(string) {
    return string.replace(/[/\-\\^$*+?.()|[\]{}]/g, '\\$&');
}

// From https://stackoverflow.com/questions/4029109/javascript-regex-how-to-put-a-variable-inside-a-regular-expression
// and https://codepen.io/tniezurawski/pen/wvzyVEE
export function getRegexOccurences(expression) {
    alert("Regex search called");
    const regex = new RegExp(expression, 'gi');

    let text = document.body.innerHTML;
    b.innerHTML=b.innerHTML.replace(p,'$1<span style="background-color:red;">$2</span>');

    text = text.replace(/(<mark class="highlight">|<\/mark>)/gim, '');

    const newText = text.replace(regex, '<mark class="highlight">$&</mark>');
    $box.innerHTML = newText;
}
