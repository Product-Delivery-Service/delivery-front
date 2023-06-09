import React, { useState } from 'react';
import { TextField, Button, Typography, Paper } from '@mui/material';
import { styled } from '@mui/system';
import axios from "axios"
import Navbar from '../navbar';
import { BsEnvelopeCheck } from 'react-icons/bs';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';



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
  '& .MuiButton-label': {
    display: 'flex',
    alignItems: 'center',
    marginRight: '8px',
  },
  '& .icon-wrapper': {
    marginRight: '8px', // Add margin-right to the icon wrapper span for spacing
  },
});

const ContactPage = () => {
  
  const navigate = useNavigate();

  // const handleSubmit = () => {
  //   navigate('/');
  //   toast.success('Message sent');
  // };

  const API = axios.create({ baseURL: process.env.REACT_APP_MY_API });

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    trackingCode: '',
    message: '',
  });

  const [formErrors, setFormErrors] = useState({
    fullNameError: false,
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

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
  
    setFormErrors({
      fullNameError: false,
      emailError: false,
      phoneNumberError: false
    });
  
    let hasErrors = false;
  
    if (formData.fullName.trim() === '') {
      setFormErrors((prevErrors) => ({ ...prevErrors, fullNameError: true }));
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
  
    try {
      const response = await API.post("/message", formData);
        console.log("res", response);
        navigate('/'); // navigate to the home page
        toast.success('Message sent'); // display the notification
      } catch (error: any) {
        console.log("err", error);
        toast.error('An Error occurred.');
      }
    console.log(formData);
  };

  return (
    <div>
    <Navbar />
    <StyledContainer>
      <StyledPaper elevation={3}>
        <StyledTitle variant="h4">Contact</StyledTitle>
        <StyledForm onSubmit={handleSubmit}>
          <StyledTextField
            id="fullName"
            name="fullName"
            label="Full Name"
            variant="outlined"
            value={formData.fullName}
            onChange={handleInputChange}
            error={formErrors.fullNameError}
            helperText={formErrors.fullNameError && 'Please enter your full name'}
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
          <StyledButton variant="contained" type="submit" onClick={handleSubmit}>
            <span className="icon-wrapper">
              <BsEnvelopeCheck />
            </span>
            <span>Submit Message</span>
          </StyledButton>
        </StyledForm>
      </StyledPaper>
    </StyledContainer>
    </div>
  );
};

export default ContactPage;
