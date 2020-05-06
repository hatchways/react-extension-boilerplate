/*global chrome*/

/** This opens the extension when the user clicks on the icon */
chrome.browserAction.onClicked.addListener((tab) => {
  // Send a message to the active tab
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {
      message: "clicked_browser_action",
    });
  });
});

/** this is hack to make requests from the app */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  fetch(request.input, {
    ...request.init,
    method: "GET",
    contentType: "json",
  }).then(
    (response) => {
      if (response.redirected) {
        chrome.tabs.create({ url: response.url });
        sendResponse([
          {
            status: response.status,
            redirected: response.redirected,
            url: response.url,
            statusText: response.statusText,
          },
          null,
        ]);
      } else
        return response.text().then(function (text) {
          sendResponse([
            {
              body: text,
              status: response.status,
              redirected: response.redirected,
              url: response.url,
              statusText: response.statusText,
            },
            null,
          ]);
        });
    },
    (error) => {
      sendResponse([null, error]);
    }
  );
  return true;
});
