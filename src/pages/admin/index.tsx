import React, { useState } from 'react';
import { TextField, Button, Typography, Paper, IconButton, Box } from '@mui/material';
import { styled } from '@mui/system';
import axios from "axios"
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { AppBar, Toolbar } from '@mui/material';
import { FaPaperPlane } from 'react-icons/fa';


const StyledContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  background: '#f5f5f5',
  //marginTop: '64px',
});

const StyledPaper = styled(Paper)({
  padding: '32px',
  width: '400px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  borderRadius: '8px',
});

const StyledTitle = styled(Typography)({
  marginBottom: '16px',
  textAlign: 'center',
  color: '#333',
  fontWeight: 'bold',
  fontSize: '24px',
});

const StyledForm = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  width: '100%',
});

const StyledTextField = styled(TextField)({
  width: '100%',
  '& .MuiOutlinedInput-root': {
    borderRadius: '4px',
  },
});

const StyledButton = styled(Button)({
  width: '100%',
  background: '#007bff',
  color: '#fff',
  '&:hover': {
    background: '#0069d9',
  },
});

// const Admin = () => {
const AuthBox = () => {

  const API = axios.create({ baseURL: process.env.REACT_APP_MY_API });
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const validateEmail = (email: string) => {
    // Regular expression to validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignIn = async () => {
    setEmailError(false);
    setPasswordError(false);

    // Perform validation
    if (email === "" || !validateEmail(email)) {
      setEmailError(true);
      return;
    }

    if (password === "") {
      setPasswordError(true);
      return;
    }

    
    console.log("Email:", email);
    console.log("Password:", password);
    // navigate('/dashboard', { replace: true });
    try {
      console.log("hfdj")
      const response = await API.post("/auth/login", {email, password}, { withCredentials: true });
      console.log("res", response);
      navigate("/dashboard", { replace: true });
      } catch (error: any) {
        console.log("err", error);
      }
  };


  return (
    <div>
      <AppBar position="static">
        <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Button component={RouterLink} to="/" color="inherit">
                <IconButton color="inherit">
                  <FaPaperPlane />
                </IconButton>
                <Typography variant="h6" component="span" sx={{ ml: 2, textDecoration: 'none', color: 'inherit' }}>
                  Delivery App
                </Typography>
              </Button>
            </Box>
        </Toolbar>
      </AppBar>
    <StyledContainer>
      <StyledPaper elevation={3}>
        <StyledTitle variant="h4">Authentification Administrateur</StyledTitle>
        <StyledForm>
          <StyledTextField
            id="Email"
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={emailError}
            helperText={emailError ? "Invalid email format" : ""}
          />
          <StyledTextField
            id="Password"
            label="Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={passwordError}
            helperText={passwordError ? "Password is required" : ""}
          />
          <StyledButton variant="contained" onClick={handleSignIn}>
            S'authentifier
          </StyledButton>
        </StyledForm>
      </StyledPaper>
    </StyledContainer>
    </div>
  );
};

//export default AuthBox;
//export default Admin;

const Admin = () => {
  return (
    <div>
      <AuthBox />
    </div>
  );
};

export default Admin;
