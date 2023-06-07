import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LuPackageSearch } from 'react-icons/lu';
import { AiOutlineHome } from 'react-icons/ai';
import { Grid, Container, TextField, Button, Typography } from '@mui/material';
//import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab';
// import Timeline from '@mui/lab/Timeline';
// import TimelineItem from '@mui/lab/TimelineItem';
// import TimelineSeparator from '@mui/lab/TimelineSeparator';
// import TimelineConnector from '@mui/lab/TimelineConnector';
// import TimelineContent from '@mui/lab/TimelineContent';
// import TimelineDot from '@mui/lab/TimelineDot';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab';

import './Track.css';

interface Shipment {
  shipmentName: string;
  trackingCode: string;
  shipmentStatus: string;
}

const Track: React.FC = () => {
  const navigate = useNavigate();
  const [trackingCode, setTrackingCode] = useState('');
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleTrack = () => {
    // Here, you would make an API request to the backend with the tracking code and update the shipment state accordingly
    // For now, let's use a static example for testing

    const staticData: Shipment = {
      shipmentName: 'Air Jordans 3',
      trackingCode: "23",
      shipmentStatus: 'Delivered',
    };

    if (staticData.trackingCode === trackingCode) {
      setShipment(staticData);
      setErrorMessage('');
    } else {
      setShipment(null);
      setErrorMessage('No such Shipment exists.');
    }
  };

  return (
    <div className="track-container">
      {/* <Container maxWidth="sm" className="home-container">
      <div className="back-container" onClick={() => navigate('/')}> */}
        {/* <span className="back-icon">
          <AiOutlineHome />
        </span>
        <span className="back-text">Back to home</span> */}
        {/* <Button variant="outlined" color="primary" onClick={() => navigate('/')} className="home-button">
        <AiOutlineHome />
        Back to Home
      </Button>
      </div>
      </Container> */}

      <Container  className="home-container" >
        <div className="back-container" onClick={() => navigate('/')}>
          {/* <span className="back-icon"> <AiOutlineHome /> </span> <span className="back-text">Back to home</span> */}
          <Button variant="outlined" color="primary" onClick={() => navigate('/')} className="home-button">
            <AiOutlineHome />
              Back to Home
          </Button>
        </div>
      </Container>

      <div className="track-header">
      <Grid container justifyContent="center" alignItems="center" direction="column" spacing={2}>
        <Grid item>
          <div className="purple-container">
            <LuPackageSearch className="icon" />
            <Typography variant="h4" className="white-text">
              Track Shipment
            </Typography>
          </div>
        </Grid>
      </Grid>
      
        {/* <span className="track-icon">
          <LuPackageSearch />
        </span>
        <Typography variant="h4" className="track-text">
          Track Shipment
        </Typography> */}
      </div>
      <div className="track-form">
        <TextField
          label="Enter tracking code"
          value={trackingCode}
          onChange={(e) => setTrackingCode(e.target.value)}
          variant="outlined"
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={handleTrack} className="track-button">
          Track
        </Button>
      </div>
      {shipment && (
        <div className="track-details">
          <Typography variant="h6">Shipment: {shipment.shipmentName}</Typography>
          <Typography>Tracking Code: {shipment.trackingCode}</Typography>
          <Timeline position="alternate">
  <TimelineItem>
    <TimelineSeparator>
      <TimelineDot />
      <TimelineConnector />
    </TimelineSeparator>
    <TimelineContent>Shipment Created</TimelineContent>
  </TimelineItem>

  {shipment.shipmentStatus !== 'Shipment Created' && (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot />
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>In Transit</TimelineContent>
    </TimelineItem>
  )}

  {shipment.shipmentStatus !== 'Shipment Created' && shipment.shipmentStatus !== 'In Transit' && (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot />
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>At Company’s Facility</TimelineContent>
    </TimelineItem>
  )}

  {shipment.shipmentStatus !== 'Shipment Created' && shipment.shipmentStatus !== 'In Transit' && shipment.shipmentStatus !== 'At Company’s Facility' && (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot />
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>Out for Delivery</TimelineContent>
    </TimelineItem>
  )}

  {shipment.shipmentStatus !== 'Shipment Created' && shipment.shipmentStatus !== 'In Transit' && shipment.shipmentStatus !== 'At Company’s Facility' && shipment.shipmentStatus !== 'Out for Delivery' && (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot />
      </TimelineSeparator>
      <TimelineContent>Delivered</TimelineContent>
    </TimelineItem>
  )}
</Timeline>

        </div>
      )}
      {!shipment && <Typography variant="body1" className="error-message">{errorMessage}</Typography>}
    </div>
  );
};

export default Track;

