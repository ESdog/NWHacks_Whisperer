window.perfWatch = {};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    alert(`onMesage got called from background`);
    window.perfWatch[sender.tab.id] = message.essential || null;
    alert(`tab id got set from background`)
});
