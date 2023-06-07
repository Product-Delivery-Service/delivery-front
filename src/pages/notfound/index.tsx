import React from 'react';
import { Box, Typography } from '@mui/material';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/'); // Replace '/' with the home page URL or route path
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      style={{ cursor: 'pointer' }}
      onClick={handleRedirect}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        textAlign="center"
      >
        <AiOutlineExclamationCircle size={64} color="primary" />
        <Typography variant="h4" component="h1" color="primary" mt={2}>
          Oops! Page Not Found
        </Typography>
        <Typography variant="body1" color="textSecondary" mt={2}>
          The page you're looking for does not exist.
        </Typography>
        <Typography variant="body2" color="textSecondary" mt={2}>
          Click here to go back to the home page.
        </Typography>
      </Box>
    </Box>
  );
};

export default NotFound;