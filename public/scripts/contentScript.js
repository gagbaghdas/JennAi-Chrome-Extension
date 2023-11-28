function CheckAuthentication (){
  console.log('checkAuthentication');
  chrome.runtime.sendMessage({ message: 'isAuthenticated' }, function(response) {
    console.log('isAuthenticated response:', response);
    if (response && response.isAuthenticated) {
        AddButtons();
    } else {
        RemoveButtons();
    }
  });
}

CheckAuthentication ();
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message === 'checkAuthentication') {
    console.log('checkAuthentication from listener');
    CheckAuthentication ();
  }
});

// Global button IDs
const topButtonId = 'top-button';
const bottomButtonId = 'bottom-button';

function AddButtons(){
  const topButton = document.createElement('button');
  topButton.innerText = 'Top Button';
  topButton.style.position = 'fixed';
  topButton.style.top = '10px';
  topButton.style.right = '10px';
  topButton.id = topButtonId;  // Setting an ID for the button
  document.body.appendChild(topButton);

  const bottomButton = document.createElement('button');
  bottomButton.innerText = 'Bottom Button';
  bottomButton.style.position = 'fixed';
  bottomButton.style.bottom = '10px';
  bottomButton.style.right = '10px';
  bottomButton.id = bottomButtonId;  // Setting an ID for the button
  document.body.appendChild(bottomButton);
}

function RemoveButtons(){
  const topButton = document.getElementById(topButtonId);
  const bottomButton = document.getElementById(bottomButtonId);

  // Remove the buttons if they exist
  if (topButton) {
    topButton.remove();
  }

  if (bottomButton) {
    bottomButton.remove();
  }
}

// // Check for any previous instances of the extension and remove them
// const existingApp = document.getElementById('my-extension-root');
// if (existingApp) existingApp.remove();

// // Create a new div element to mount your React app
// const appRoot = document.createElement('div');
// appRoot.id = 'my-extension-root';
// document.body.appendChild(appRoot);

// // Inject your bundled React script into the page
// const script = document.createElement('script');
// script.src = chrome.runtime.getURL('static/js/main.js');  // assuming your bundled script is named main.js
// document.head.appendChild(script);


