import React, { useState } from "react";
import { Box, TextField, Button, Typography, Link } from "@mui/material";
import  Axios  from "axios";

const Login = ({setNavBarKey,handleClick}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError] =useState('')
  const handleSubmit = (event) => {
    event.preventDefault();
    Axios.post('http://127.0.0.1:8000/api/login', {
      email: email,
      password: password
    })
    .then(response => {
      if(response.status === 200) {
        setNavBarKey('home')
      }
    })
    .catch((error)=>{
       console.log(error.response.data.message);
       setError(error.response.data.message)
     
    })

  };

  return (
    <Box
      sx={{
        width: "400px",
        margin: "50px auto",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
      }}
    >
      <Typography variant="h5" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username/Email"
          variant="outlined"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
              <Typography sx={{
                color: 'red'
              }}>
        {error ? error: ''}
      </Typography>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            marginTop: "20px",
            backgroundColor: "#007bff",
            "&:hover": {
              backgroundColor: "#0056b3",
            },
          }}
        >
          LOGIN
        </Button>
      </form>

      <Typography sx={{ marginTop: "20px" }}>
        Don't have an account?{" "}
        <Link  underline="hover" onClick={()=>handleClick('register')}>
          Register here
        </Link>
      </Typography>
    </Box>
  );
};

export default Login;
