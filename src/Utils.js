import CookieManager from './CookieManager';

export async function isAuthenticated (){
    return new Promise((resolve, reject) => {
        try {
            console.log("isAuthenticated");
            CookieManager.getAccessToken(function(err, token) {
                if (err) {
                  console.log('Could not get cookie:', err);
                  resolve(false);
                } else {
                  console.log('Got token:', token);
                  resolve(true);
                }
            });
        }
        catch (ex) {
            reject(ex);
        }
    });
}