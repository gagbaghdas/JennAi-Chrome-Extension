import React from 'react';
import Button from '@mui/material/Button';
import { isAuthenticated } from './Utils';
import { useEffect } from 'react';

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
  const loginPageUrl = process.env.REACT_APP_URL + "/login";
  return (
    <div>
      {!auth ? (
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: 10, background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)' }}
          onClick={() => window.open(loginPageUrl, '_blank')}
        >
          Sign In
        </Button>
      ) : (
        <div>Your authenticated view here</div>
      )}
    </div>
  );
}

export default MainComponent;