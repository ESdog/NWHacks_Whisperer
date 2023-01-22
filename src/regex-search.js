// From https://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
function escapeRegex(string) {
    return string.replace(/[/\-\\^$*+?.()|[\]{}]/g, '\\$&');
}

// From https://stackoverflow.com/questions/4029109/javascript-regex-how-to-put-a-variable-inside-a-regular-expression
// and https://codepen.io/tniezurawski/pen/wvzyVEE
export function getRegexOccurrences(expression) {
    alert("called method in RegexSearch")
    const regex = new RegExp(expression, 'gi');

    let text = window.body.innerText;
    text = text.replace(/(<mark class="highlight">|<\/mark>)/gim, '');

    const newText = text.replace(regex, '<mark class="highlight">$&</mark>');
    window.body.innerText = newText;
}

