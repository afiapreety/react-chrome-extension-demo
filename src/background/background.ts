//background.js

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'open-sidepanel',
    title: 'Open blocks sidepanel',
    contexts: ['selection']
  });
});

chrome.contextMenus.onClicked.addListener((data, tab) => {
  chrome.sidePanel.open({ windowId: tab.windowId });
});
    