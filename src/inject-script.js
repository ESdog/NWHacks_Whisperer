console.log('<----- whisper: bare-bones inject-script started running ----->');

/* TODO
inject-script->content->background
https://stackoverflow.com/questions/53289557/chrome-extension-best-way-to-send-messages-from-injected-script-to-background
 */
chrome.storage.onchange.get(["FROM_USER"]).then((result) => {
    console.log("inject-script.js received user input " + result.FROM_USER);
});

window.addEventListener("message", (event) => {

})


