import cookieManager from './CookieManager.js';

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    console.log('Message received:', request);
    if (request.message === 'isAuthenticated') {
        cookieManager.getAccessToken(function(err, token) {
            if (err) {
              console.error('Could not get cookie:', err);
              sendResponse({ isAuthenticated: false });
            } else {
              console.log('Got token:', token);
              sendResponse({ isAuthenticated: true });
            }
          });
    }
    console.log('Returning true');
    return true;  // Indicate that the response function will be called asynchronously
});

chrome.tabs.onActivated.addListener(function(activeInfo) {
    chrome.tabs.get(activeInfo.tabId, function(tab) {
        console.log("onActivated");
      if (tab && tab.url && tab.url.includes("docs.google.com")) {
        console.log("onActivated at" + tab.url);
        chrome.tabs.sendMessage(tab.id, { message: 'checkAuthentication' });
      }
    });
  });

  let scriptFilename;

  let url = chrome.runtime.getURL('asset-manifest.json');

  fetch(url)
      .then(response => response.json())
      .then(manifest => {
          scriptFilename = manifest['files']['main.js'];
          console.log("scriptFilename : " + scriptFilename);
      });
  
  chrome.tabs.onActivated.addListener(moveToFirstPosition);

  async function moveToFirstPosition(activeInfo) {
    try {
      if (scriptFilename) {
        let [tab] = await chrome.tabs.query({ active: true, currentWindow: true })

        chrome.scripting.executeScript({
          target: {tabId: tab.id},
          files: [scriptFilename]
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
