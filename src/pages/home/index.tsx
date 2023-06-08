import React from 'react';
import { Box, Typography, Button, Grid, Toolbar, AppBar, IconButton } from '@mui/material';
import { GiCardboardBox, GiAirplaneDeparture, GiDeliveryDrone } from 'react-icons/gi';
import { MdLocalShipping, MdHome } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import Navbar from '../navbar';

const HomePage = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div>
        <Navbar />
    <Box p={4} textAlign="center">


      <Typography variant="h2" component="h1" mt={4}>
        Welcome to DeliveryApp
      </Typography>
      <Typography variant="h5" component="p" color="textSecondary" mt={2} mb={4}>
        Reliable and Fast Delivery Services
      </Typography>

      <Grid container spacing={4} justifyContent="center">
      <Grid item xs={12} sm={6} md={4} lg={3}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            p={2}
            borderRadius={4}
            boxShadow={2}
          >
            <GiCardboardBox size={48} />
            <Typography variant="h6" component="h2" mt={2}>
              Track Your Packages
            </Typography>
            <Typography variant="body2" component="p" color="textSecondary" mt={2}>
              Easily track the status and location of your packages.
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            p={2}
            borderRadius={4}
            boxShadow={2}
          >
            <MdLocalShipping size={48} />
            <Typography variant="h6" component="h2" mt={2}>
              Reliable Shipping
            </Typography>
            <Typography variant="body2" component="p" color="textSecondary" mt={2}>
              We ensure your packages are handled with care and delivered on time.
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            p={2}
            borderRadius={4}
            boxShadow={2}
          >
            <GiAirplaneDeparture size={48} />
            <Typography variant="h6" component="h2" mt={2}>
              Global Delivery
            </Typography>
            <Typography variant="body2" component="p" color="textSecondary" mt={2}>
              We offer worldwide shipping to reach your destination.
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            p={2}
            borderRadius={4}
            boxShadow={2}
          >
            <GiDeliveryDrone size={48} />
            <Typography variant="h6" component="h2" mt={2}>
              Fast Delivery
            </Typography>
            <Typography variant="body2" component="p" color="textSecondary" mt={2}>
              Our speedy delivery options get your packages delivered in no time.
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Box mt={4}>
        <Button variant="contained" color="primary" size="large" onClick={() => handleNavigation('/createshipment')}>
          Get Started
        </Button>
      </Box>
    </Box>
    </div>
  );
};

export default HomePage;
