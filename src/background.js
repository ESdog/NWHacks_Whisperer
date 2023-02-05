console.log(`------------------- background script activated ----------------------`)
chrome.storage.local.get(["FROM_USER"]).then((result) => {
    console.log("background.js received user input " + result.FROM_USER);
});

async () => {
    const item = chrome.storage.local.get(["FROM_USER"]);
    console.log(`background script received ` + item);
}