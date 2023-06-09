import React, { useState } from 'react';
import { LuPackageSearch } from 'react-icons/lu';
import { Grid, TextField, Button, Typography } from '@mui/material';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab';
import {BiMap} from 'react-icons/bi';
import axios from 'axios';
import toast from 'react-hot-toast';

import Navbar from '../navbar';

interface Shipment {
  shipmentName: string;
  trackingCode: string;
  shipmentState: string;
}

const TrackShipment: React.FC = () => {

  const API = axios.create({ baseURL: process.env.REACT_APP_MY_API });

  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  // const handleTrack = async () => {
    
  //   try {
  //     const response = await API.post("/command/trackingCode", {trackingCode});
  //       console.log("res", response);
  //       setShipment(response.data.data);
  //       toast.success('Shipment found!'); 
  //     } catch (error: any) {
  //       console.log("err", error);
  //       setShipment(null);
  //     setErrorMessage('No such Shipment exists.');
  //     toast.error('No such Shipment exists!');
  //     }

  // };
  const handleTrack = async () => {
    const response = await API.post("/command/trackingCode", { trackingCode });
    console.log("res", response);
  
    if (response.data.data) {
      setShipment(response.data.data);
      toast.success('Shipment found!'); // Show success toast
    } else {
      setShipment(null);
      setErrorMessage('No such Shipment exists.');
      toast.error('Shipment not found!'); // Show error toast
    }
  };

  const [trackingCode, setTrackingCode] = useState('');



  return (
    <div>
      <Navbar />
      <Grid container justifyContent="center" alignItems="center" direction="column" style={{ marginTop: '40px' }}>
        <Grid item>
          <div style={{ backgroundColor: '#42a5f5', padding: '20px', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
              <LuPackageSearch size={48} color="white" style={{ marginRight: '12px' }} />
              <Typography variant="h4" style={{ color: 'white' }}>
                Track Shipment
              </Typography>
            </div>
            <Typography variant="subtitle1" style={{ color: 'white', marginBottom: '16px' }}>
              Enter your tracking code below to track your shipment:
            </Typography>
            <div style={{ display: 'flex', alignItems: 'center' }}>
             <TextField
                label="Enter tracking code"
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value)}
                variant="outlined"
                fullWidth
                size="medium"
                sx={{
                  background: 'white',
                  borderRadius: '4px',
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderRadius: '4px'
                    },
                    "& input": {
                      padding: '12px 14px'
                    }
                  }
                }}
              />
              <Button variant="contained" color="primary" endIcon={<BiMap />} onClick={handleTrack} style={{ marginLeft: '16px', height: '48px', width: '120px', minHeight: '48px', display: 'flex', alignItems: 'center' }}>
                Track
              </Button>
            </div>
          </div>

        </Grid>

        <Grid item>
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
        </Grid>
      </Grid>
      </div>

  );
};

export default TrackShipment;











