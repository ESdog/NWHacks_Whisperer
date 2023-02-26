const search = document.getElementById("searchText");

/* Update chrome.storage.local whenever keyup in UI search box
   @warning Works but throws Uncaught TypeError: Cannot read properties of null (reading 'addEventListener')
 */
search.addEventListener("keyup", function () {
    if(search.value == "") {
        return;
    }

    chrome.storage.local.set({ FROM_USER: search.value }).then(() => {
        console.log("chrome.storage.local value under key FROM_USER is set to " + search.value);
    });
});
