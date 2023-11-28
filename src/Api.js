import axios from 'axios';
import CookieManager from './CookieManager'; // Make sure the path is correct

function getToken(name) {
  return new Promise((resolve, reject) => {
    CookieManager[name](function(error, token) {
      if (error) {
        reject(error);
      } else {
        resolve(token);
      }
    });
  });
}

const api = axios.create({
  baseURL: 'http://192.168.0.131:5000/api/',
  withCredentials: true, // Ensure cookies are sent with requests
});


// Add a request interceptor
api.interceptors.request.use(async function (config) {
  try {
    const token = await getToken('getAccessToken');
    console.log("getAccessToken", token);
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
  } catch (error) {
    // Handle error: token not found or other errors
    return Promise.reject(error);
  }
});

// Add a response interceptor
api.interceptors.response.use(
  response => response,
  async error => {
    console.log("error", error); 
    if (!error.config.bypassInterceptor && error.response && error.response.status === 401) {
      try {
        const refreshToken = await getToken('getrefreshToken');
        const res = await api.post('/token/refresh', {}, {
          headers: {
            'Authorization': `Bearer ${refreshToken}`
          }
        });
        // Update the access token in cookies if needed
        // Retry the original request with the new token
        const originalRequest = error.config;
        originalRequest.headers['Authorization'] = 'Bearer ' + res.data.access_token;
        return api(originalRequest);
      } catch (refreshError) {
        // Handle refresh token failure
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

api.streamRequest = async function (url, method, data) {
  try {
    const accessToken = await getToken('getAccessToken');
    const headers = {
      'Content-Type': 'application/json',
      ...(accessToken ? { 'Authorization': `Bearer ${accessToken}` } : {}),
    };

    const response = await fetch(`${this.defaults.baseURL}${url}`, {
      method: method,
      headers: headers,
      body: JSON.stringify(data),
      credentials: 'include', // Needed for cookies to be sent with the request
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.body;
  } catch (error) {
    console.error('Error sending stream request:', error);
    throw error;
  }
};

export default api;
