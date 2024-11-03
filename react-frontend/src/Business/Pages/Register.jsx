import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Link,
  Paper,
  Grid,
} from '@mui/material';
import  Axios  from 'axios';

function Register() {
  const [formData, setFormData] = useState({
    usernameEmail: '',
    mobileNumber: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
    Axios.post(`http://127.0.0.1:8000/api/register`, {
        username:formData.usernameEmail,
        email: formData.usernameEmail,
        mobile: formData.mobileNumber,
        password: formData.password,
        password_confirmation: formData.confirmPassword,
  
    })
    .then ((response)=>{
        console.log(response,"response")
    })
    .catch((error)=>{
        console.log(error,"error")
    });
   
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
      <Paper elevation={3} style={{ padding: '2rem', maxWidth: '400px', width: '100%' }}>
        <Typography variant="h5" align="center" gutterBottom>
          Register
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username/Email"
            name="usernameEmail"
            fullWidth
            margin="normal"
            value={formData.usernameEmail}
            onChange={handleChange}
          />
          <TextField
            label="Mobile Number"
            name="mobileNumber"
            fullWidth
            margin="normal"
            value={formData.mobileNumber}
            onChange={handleChange}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            margin="normal"
            value={formData.password}
            onChange={handleChange}
          />
          <TextField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            fullWidth
            margin="normal"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: '1rem' }}
          >
            Register
          </Button>
        </form>
        <Box textAlign="center" marginTop="1rem">
          <Typography variant="body2">
            Already have an account?{' '}
            <Link href="#" underline="hover">
              Login here
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Grid>
  );
}

export default Register;
