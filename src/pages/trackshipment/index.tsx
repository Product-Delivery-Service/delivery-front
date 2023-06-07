import React, { useState } from 'react';
import { Container, Grid, Typography, TextField, Button } from '@mui/material';
import { LuPackageSearch } from 'react-icons/lu';
import { AiOutlineHome } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import './TrackShipment.css';

const TrackShipment: React.FC = () => {
  const [shipmentCode, setShipmentCode] = useState('');
  const navigate = useNavigate();

  const handleTrackShipment = () => {
    // Simulating API call and response
    const response = {
      id: 1234,
      code: shipmentCode,
      status: 'Shipment Delivered',
    };

    // Update the shipment data with the response
    setShipment(response);
  };

  const handleGoBack = () => {
    navigate('/');
  };

  const [shipment, setShipment] = useState<{ id: number; code: string; status: string } | null>(null);

  return (
    <Container maxWidth="sm" className="container">
      <Button variant="outlined" color="primary" onClick={handleGoBack} className="home-button">
        <AiOutlineHome />
        Back to Home
      </Button>

      <Grid container justifyContent="center" alignItems="center" direction="column" spacing={2}>
        <Grid item>
          <div className="purple-container">
            <LuPackageSearch className="icon" />
            <Typography variant="h4" className="white-text">
              Track Shipment
            </Typography>
          </div>
        </Grid>

        <Grid item>
          <div className="blue-container">
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={9}>
                <TextField
                  label="Shipment Code"
                  fullWidth
                  value={shipmentCode}
                  onChange={(e) => setShipmentCode(e.target.value)}
                  inputProps={{
                    style: { width: '100%' }, // Set the width of the input field
                    className: 'white-input', // Apply white color to the input text
                  }}
                />
              </Grid>
              <Grid item xs={3}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleTrackShipment}
                  className="track-button"
                  fullWidth
                >
                  Track
                </Button>
              </Grid>
            </Grid>
          </div>
        </Grid>

        {shipment && (
          <Grid item>
            <div className="shipment-details">
              <Typography variant="h5">Shipment Details</Typography>
              <Typography>
                <strong>Shipment Code:</strong> {shipment.code}
              </Typography>
              <Typography>
                <strong>Status:</strong> {shipment.status}
              </Typography>
            </div>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default TrackShipment;


// import React, { useState } from 'react';
// import { Container, Grid, Typography, TextField, Button } from '@mui/material';
// import { LuPackageSearch } from 'react-icons/lu';
// import { AiOutlineHome } from 'react-icons/ai';
// import { useNavigate } from 'react-router-dom';
// import './TrackShipment.css';

// const TrackShipment: React.FC = () => {
//   const [shipmentCode, setShipmentCode] = useState('');
//   const navigate = useNavigate();

//   const handleTrackShipment = () => {
//     // Track shipment logic goes here
//   };

//   const handleGoBack = () => {
//     navigate('/');
//   };

//   return (
//     <Container maxWidth="sm" className="container">
//       <Button variant="outlined" color="primary" onClick={handleGoBack} className="home-button">
//         <AiOutlineHome />
//         Back to Home
//       </Button>

//       <Grid container justifyContent="center" alignItems="center" direction="column" spacing={2}>
//         <Grid item>
//           <div className="purple-container">
//             <LuPackageSearch className="icon" />
//             <Typography variant="h4" className="white-text">
//               Track Shipment
//             </Typography>
//           </div>
//         </Grid>

//         <Grid item>
//           <div className="blue-container">
//             <Grid container spacing={2} alignItems="center">
//               <Grid item xs={9}>
//                 <TextField
//                   label="Shipment Code"
//                   fullWidth
//                   value={shipmentCode}
//                   onChange={(e) => setShipmentCode(e.target.value)}
//                   inputProps={{
//                     style: { width: '100%' }, // Set the width of the input field
//                     className: 'white-input', // Apply white color to the input text
//                   }}
//                 />
//               </Grid>
//               <Grid item xs={3}>
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   onClick={handleTrackShipment}
//                   className="track-button"
//                   fullWidth
//                 >
//                   Track
//                 </Button>
//               </Grid>
//             </Grid>
//           </div>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

// export default TrackShipment;

