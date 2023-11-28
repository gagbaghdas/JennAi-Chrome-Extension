import React from 'react';
import { isAuthenticated } from './Utils';
import { useEffect } from 'react';
import ChatWindow from './components/ChatWindow';
import Login from './components/Login';

// Assuming this is your main component for the extension
const MainComponent = () => {
  const [auth, setAuth] = React.useState(false);
  console.log("MainComponent");
  useEffect(() => {
    isAuthenticated().then((result) => {
      console.log("isAuthenticated : " + result);
      setAuth(result);
    });
  }, []);
  return (
    <div style={{ width: '300px', height: '200px' }}>
      {!auth ? (
       <Login />
      ) : (
<div id="chat-window-container" style={{ position: 'fixed', right: '0', top: '0', width: '300px', height: '100vh' }}>
  <ChatWindow />
</div>

      )}
    </div>
  );

}

export default MainComponent;