const CookieManager = {
    getAccessToken: function(callback) {
      chrome.cookies.get({ url: 'http://127.0.0.1:3000', name: 'access_token' }, function(cookie) {
        if (cookie) {
          callback(null, cookie.value);
        } else {
          callback(new Error('access_token not found'));
        }
      });
    },

    getrefreshToken: function(callback) {
        chrome.cookies.get({ url: 'http://127.0.0.1:3000', name: 'refresh_token' }, function(cookie) {
        if (cookie) {
          callback(null, cookie.value);
        } else {
          callback(new Error('refresh_token not found'));
        }
      });
    },
    
    watchTokenChanges: function(onAdd, onRemove) {
      chrome.cookies.onChanged.addListener(function(changeInfo) {
        if (changeInfo.cookie.name === 'access_token') {
          if (changeInfo.removed) {
            onRemove();
          } else {
            onAdd();
          }
        }
      });
    }
  };

  export default CookieManager;
