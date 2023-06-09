import React, { useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
import { Grid, Typography } from '@mui/material';
import { AiOutlinePrinter } from 'react-icons/ai';
import { BsPrinter } from 'react-icons/bs';
import { Document, Page, Text, View } from '@react-pdf/renderer';
import { TbFileDownload } from 'react-icons/tb'; 
import QRCode from 'qrcode';
import { Image } from '@react-pdf/renderer';
import axios from 'axios';
import Navbar from '../navbar';
import { jabakLahDeliveryBase64 } from './imageData';
import { saveAs } from 'file-saver';
import { pdf } from '@react-pdf/renderer';

interface Shipment {
    //Sender Info
    senderName: string;
    senderAddress: string;
    senderPhone: string;
    senderEmail: string;
    //Receiver Info
    receiverName: string;
    receiverAddress: string;
    receiverPhone: string;
    receiverEmail: string;
    //Shipment Details
    shipmentDate: Date;
    shipmentName: string;
    shipmentCount: number;
    shipmentValue: number;
    shipmentPrice: number;
    shipmentWeight: number;
    shipmentService: string;
    trackingCode: string;
  }  

const styles = {
    container: {
      padding: 16,
    },
    title: {
      fontSize: 18,
      fontWeight: 700,
      marginBottom: 8,
    },
    field: {
      fontSize: 14,
      marginBottom: 4,
    },
  };


async function generateQRCode(trackingCode: string) {
    try {
      const qrCodeDataURL = await QRCode.toDataURL(trackingCode);
      return qrCodeDataURL;
    } catch (error) {
      console.error(error);
      return '';
    }
}


  const ShipmentPDF: React.FC<{ shipment: Shipment; qrCodeDataURL: string }> = ({
    shipment,
    qrCodeDataURL,
  }) => {

    const readableDate = new Date(shipment.shipmentDate).toLocaleString();

    return (

    <Document>
      <Page size="A4" style={styles.container}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
          <Image src={jabakLahDeliveryBase64} style={{ width: 200, height: 100, marginRight: 8 }} />
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Jabak Lah - Delivery</Text>
        </View>
            <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>Shipment Details</Text>
                <Text style={styles.field}>Sender Name: {shipment.senderName}</Text>
                <Text style={styles.field}>Sender Address: {shipment.senderAddress}</Text>
                <Text style={styles.field}>Sender Phone: {shipment.senderPhone}</Text>
                <Text style={styles.field}>Sender Email: {shipment.senderEmail}</Text>
                <Text style={styles.field}>Receiver Name: {shipment.receiverName}</Text>
                <Text style={styles.field}>Receiver Address: {shipment.receiverAddress}</Text>
                <Text style={styles.field}>Receiver Phone: {shipment.receiverPhone}</Text>
                <Text style={styles.field}>Receiver Email: {shipment.receiverEmail}</Text>
                <Text style={styles.field}>Shipment Date: {readableDate}</Text>
                <Text style={styles.field}>Shipment Name: {shipment.shipmentName}</Text>
                <Text style={styles.field}>Shipment Count: {shipment.shipmentCount}</Text>
                <Text style={styles.field}>Shipment Value: {shipment.shipmentValue}</Text>
                <Text style={styles.field}>Shipment Price: {shipment.shipmentPrice}</Text>
                <Text style={styles.field}>Shipment Weight: {shipment.shipmentWeight}</Text>
                <Text style={styles.field}>Shipment Service: {shipment.shipmentService}</Text>
                <Text style={styles.field}>Tracking Code: {shipment.trackingCode}</Text>
                {/* Add more shipment details */}
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 16 }}>QR Code</Text>
                {qrCodeDataURL && <Image src={qrCodeDataURL} style={{ width: 250, height: 250 }}/>}
            </View>
      </Page>
    </Document>
    );
  };
  
const PrintLabel: React.FC = () => {

    const API = axios.create({ baseURL: process.env.REACT_APP_MY_API });
    const [trackingCode, setTrackingCode] = useState('');
    const [shipment, setShipment] = useState<Shipment | null>(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [qrCodeDataURL, setQrCodeDataURL] = useState('');

    const generatePdfDocument = async (
        shipment: Shipment,
        qrCodeDataURL: string,
        fileName: string
      ) => {
        const blob = await pdf(
          <ShipmentPDF shipment={shipment} qrCodeDataURL={qrCodeDataURL} />
        ).toBlob();
        saveAs(blob, fileName);
      };

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

    useEffect(() => {
        const fetchData = async () => {
          if (trackingCode) {
            const dataURL = await generateQRCode(trackingCode);
            setQrCodeDataURL(dataURL);
          } else {
            setQrCodeDataURL('');
          }
        };
    
        fetchData();
      }, [trackingCode]);
  

  return (
    <div>
      <div>
      <Navbar />
      <Grid container justifyContent="center" alignItems="center" direction="column" style={{ marginTop: '40px' }}>
        <Grid item>
          <div style={{ backgroundColor: '#42a5f5', padding: '20px', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
              <AiOutlinePrinter size={48} color="white" style={{ marginRight: '12px' }} />
              <Typography variant="h4" style={{ color: 'white' }}>
                Print Shipping Label
              </Typography>
            </div>
            <Typography variant="subtitle1" style={{ color: 'white', marginBottom: '16px' }}>
                Make sure the label is visible and on the top of your package.
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
              <Button variant="contained" color="primary" endIcon={<BsPrinter />} onClick={handleTrack} style={{ marginLeft: '16px', height: '48px', width: '150px', minHeight: '48px', display: 'flex', alignItems: 'center' }}>
              Generate
              </Button>
            </div>
          </div>
        </Grid>
        <Grid item>
          {errorMessage && (
            <Typography variant="subtitle1" style={{ color: 'red', marginTop: '16px' }}>
              {errorMessage}
            </Typography>
          )}
        </Grid>
        <br />
        <Grid item>
        <div>
    {shipment && (
      <div>
        
        <div>
        <View style={{ marginTop: 16 }}>
        <Button
        onClick={() =>
          generatePdfDocument(
            shipment,
            qrCodeDataURL,
            `shipment_${shipment.trackingCode}.pdf`
          )
        }
        variant="contained"
        color="primary"
        startIcon={<TbFileDownload />}
      >
        Download Shipment PDF
      </Button>
          </View>
        </div>

      </div>
    )}
  </div>
        </Grid>

      </Grid>
      </div>
    </div>
  );
};

export default PrintLabel;
