import React from 'react';
import { Button,  Typography, Grid } from '@mui/material';

function Login() {

const loginPageUrl = process.env.REACT_APP_URL + "/login";

return (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh',  background: 'linear-gradient(180deg, #B0E0E6, #FFFFFF)' }}>
    <Grid>
      <Grid item style={{ marginBottom: 0 }}>
        <Typography variant="h4" align="center">
          🌐 Jenna
        </Typography>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: 10, background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)' }}
          onClick={() => window.open(loginPageUrl, '_blank')}
        >
          Login
        </Button>
      </Grid>
    </Grid>
  </div>
);
}

export default Login;
