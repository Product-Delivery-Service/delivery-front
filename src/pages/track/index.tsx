import React, { useState } from 'react';
import { LuPackageSearch } from 'react-icons/lu';
import { Grid, TextField, Button, Typography } from '@mui/material';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab';
import axios from "axios"

import './Track.css';
import Navbar from '../navbar';

interface Shipment {
  shipmentName: string;
  trackingCode: string;
  shipmentState: string;
}

const Track: React.FC = () => {
  const API = axios.create({ baseURL: process.env.REACT_APP_MY_API });
  const [trackingCode, setTrackingCode] = useState('');
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleTrack = async () => {
    
    try {
      const response = await API.post("/command/trackingCode", {trackingCode});
        console.log("res", response);
        setShipment(response.data.data);
      } catch (error: any) {
        console.log("err", error);
        setShipment(null);
      setErrorMessage('No such Shipment exists.');
      }

  };

  return (
    <div > <Navbar /> 
    <div className="track-container">
      {/* <Container  className="home-container" >
        <div className="back-container" onClick={() => navigate('/')}>
          <Button variant="outlined" color="primary" onClick={() => navigate('/')} className="home-button">
            <AiOutlineHome />
              Back to Home
          </Button>
        </div>
      </Container> */}

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

  {shipment.shipmentState !== 'Shipment Created' && (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot />
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>In Transit</TimelineContent>
    </TimelineItem>
  )}

  {shipment.shipmentState !== 'Shipment Created' && shipment.shipmentState !== 'In Transit' && (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot />
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>At Company’s Facility</TimelineContent>
    </TimelineItem>
  )}

  {shipment.shipmentState !== 'Shipment Created' && shipment.shipmentState !== 'In Transit' && shipment.shipmentState !== 'At Company\'s Facility' && (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot />
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>Out for Delivery</TimelineContent>
    </TimelineItem>
  )}

  {shipment.shipmentState !== 'Shipment Created' && shipment.shipmentState !== 'In Transit' && shipment.shipmentState !== 'At Company\'s Facility' && shipment.shipmentState !== 'Out for Delivery' && (
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
    </div>
  );
};

export default Track;

