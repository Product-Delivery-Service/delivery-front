import React, { useState } from 'react';
import { TextField, Button, Typography, Paper } from '@mui/material';
import { styled } from '@mui/system';

const StyledContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  background: '#f5f5f5',
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

const ContactPage = () => {


  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phoneNumber: '',
    trackingCode: '',
    message: '',
  });

  const [formErrors, setFormErrors] = useState({
    fullnameError: false,
    emailError: false,
    phoneNumberError: false,
  });

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email:string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phoneNumber: string ) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber);
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
  
    setFormErrors({
      fullnameError: false,
      emailError: false,
      phoneNumberError: false
    });
  
    let hasErrors = false;
  
    if (formData.fullname.trim() === '') {
      setFormErrors((prevErrors) => ({ ...prevErrors, fullnameError: true }));
      hasErrors = true;
    }
  
    if (formData.email.trim() !== '' && !validateEmail(formData.email)) { 
      setFormErrors((prevErrors) => ({ ...prevErrors, emailError: true }));
      hasErrors = true;
    }
  
    if (formData.phoneNumber.trim() === '' || !validatePhoneNumber(formData.phoneNumber)) {
      setFormErrors((prevErrors) => ({ ...prevErrors, phoneNumberError: true }));
      hasErrors = true;
    }
  
    if (hasErrors) {
      return;
    }
  
    // Send form data to the server for further handling
    console.log(formData);
  };

  return (
    <StyledContainer>
      <StyledPaper elevation={3}>
        <StyledTitle variant="h4">Contact</StyledTitle>
        <StyledForm onSubmit={handleSubmit}>
          <StyledTextField
            id="fullname"
            name="fullname"
            label="Full Name"
            variant="outlined"
            value={formData.fullname}
            onChange={handleInputChange}
            error={formErrors.fullnameError}
            helperText={formErrors.fullnameError && 'Please enter your full name'}
          />
          <StyledTextField
            id="email"
            name="email"
            label="Email"
            variant="outlined"
            value={formData.email}
            onChange={handleInputChange}
            error={formErrors.emailError}
            helperText={formErrors.emailError && 'Please enter a valid email'}
          />
          <StyledTextField
            id="phoneNumber"
            name="phoneNumber"
            label="Phone Number"
            variant="outlined"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            error={formErrors.phoneNumberError}
            helperText={formErrors.phoneNumberError && 'Please enter a valid phone number'}
          />
          <StyledTextField
            id="trackingCode"
            name="trackingCode"
            label="Tracking Code"
            variant="outlined"
            value={formData.trackingCode}
            onChange={handleInputChange}
          />
          <StyledTextField
            id="message"
            name="message"
            label="Message"
            variant="outlined"
            multiline
            rows={4}
            value={formData.message}
            onChange={handleInputChange}
          />
          <StyledButton variant="contained" type="submit">
            Submit
          </StyledButton>
        </StyledForm>
      </StyledPaper>
    </StyledContainer>
  );
};

export default ContactPage;
