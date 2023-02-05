console.log(`------------------- background script activated ----------------------`)


// this displays user's search from previous browser session once, at the start of this whisper session
chrome.storage.local.get(["FROM_USER"]).then((result) => {
    console.log("background.js received user input " + result.FROM_USER);
});

// this fires on every keyup
chrome.storage.onChanged.addListener((changes, namespace) => {
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
        console.log(
            `Storage key "${key}" in namespace "${namespace}" changed.`,
            `Old value was "${oldValue}", new value is "${newValue}".`
        );
    }
});