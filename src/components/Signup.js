import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User signed up:", credentials);
    navigate("/");
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center">Sign Up</Typography>
      <form onSubmit={handleSubmit}>
        <TextField fullWidth label="Email" name="email" margin="normal" onChange={handleChange} />
        <TextField fullWidth label="Password" name="password" type="password" margin="normal" onChange={handleChange} />
        <Button type="submit" variant="contained" color="primary" fullWidth>Sign Up</Button>
      </form>
    </Container>
  );
};

export default Signup;
