import React, { useState } from 'react';
import { TextField, Button, Stepper, Step, StepLabel, Container, Grid, Box, MenuItem } from '@mui/material';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { format } from 'date-fns';
import axios from "axios"
import { Link } from "react-router-dom";
import Navbar from '../navbar';
import { toast } from 'react-hot-toast';


interface FormData {
  senderName: string;
  senderAddress: string;
  senderPhone: string;
  senderEmail: string;
  receiverAddress: string;
  receiverPhone: string;
  receiverName: string;
  receiverEmail: string;
  shipmentDate: Date;
  shipmentCount: number;
  shipmentName: string;
  shipmentValue: number | string;
  shipmentPrice: number | string;
  shipmentWeight: number | string;
  shipmentService: string;
}

const validationSchema = yup.object().shape({
  senderName: yup.string().required('Sender Name is required'),
  senderAddress: yup.string().required('Sender Address is required'),
  senderPhone: yup
    .string()
    .matches(/^(?:\+212|0)[567]\d{8}$/, 'Invalid Moroccan phone number')
    .required('Sender Phone is required'),
  senderEmail: yup.string().email('Invalid email address').required('Sender Email is required'),
  receiverName: yup.string().required('Receiver Name is required'),
  receiverAddress: yup.string().required('Receiver Address is required'),
  receiverPhone: yup
    .string()
    .matches(/^(?:\+212|0)[567]\d{8}$/, 'Invalid Moroccan phone number')
    .required('Receiver Phone is required'),
  receiverEmail: yup.string().email('Invalid email address').required('Receiver Email is required'),
  shipmentDate: yup.date().required('Shipment Date is required'),
  shipmentName: yup.string().required('Service Name is required'),
  shipmentCount: yup.number().required('Package Count is required'),
  shipmentValue: yup.string().required('Package Value is required'),
  shipmentPrice: yup.string().required('Package Price is required'),
  shipmentWeight: yup.string().required('Package Weight is required'),
  shipmentService: yup.string().required('Service Type is required'),
});

const MultiStepForm: React.FC = () => {
  const API = axios.create({ baseURL: process.env.REACT_APP_MY_API });
  const initialValues: FormData = {
    senderName: '',
    senderAddress: '',
    senderPhone: '',
    senderEmail: '',
    receiverAddress: '',
    receiverPhone: '',
    receiverName: '',
    receiverEmail: '',
    shipmentDate: new Date(),
    shipmentName: '',
    shipmentCount: 1,
    shipmentValue: '',
    shipmentPrice: '',
    shipmentWeight: '',
    shipmentService: '',
  };

  const steps = [
    'Sender Information',
    'Receiver Information',
    'Shipment Details',
    'Finish',
  ];

  const [activeStep, setActiveStep] = useState(0);

  const [trackingCode, setTrackingCode] = useState("")

  const handleSubmit = async (values: FormData) => {
    console.log(values)
    try {
      const response = await API.post("/command", values, { withCredentials: true });
        console.log("res", response);
        setTrackingCode(response.data.data.trackingCode)
        toast.success('Shipment submitted successfully!');
      } catch (error: any) {
        console.log("err", error);
        toast.error('An Error occurred.');
      }
  };

  const getStepContent = (
    step: number,
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    handleBlur: (event: React.FocusEvent<HTMLInputElement>) => void,
    values: FormData,
    errors: any,
    touched: any
  ) => {
    switch (step) {
      case 0:
        return (
          <>
            <Grid item xs={12}>
              <TextField
                name="senderName"
                label="Sender Name"
                value={values.senderName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.senderName && !!errors.senderName}
                helperText={touched.senderName && errors.senderName}
                fullWidth
              />
            </Grid>
            {/* Add other fields for Sender Information */}
            <Grid item xs={12}>
              <TextField
                name="senderAddress"
                label="Sender Address"
                value={values.senderAddress}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.senderAddress && !!errors.senderAddress}
                helperText={touched.senderAddress && errors.senderAddress}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="senderPhone"
                label="Sender Phone"
                value={values.senderPhone}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.senderPhone && !!errors.senderPhone}
                helperText={touched.senderPhone && errors.senderPhone}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="senderEmail"
                label="Sender Email"
                value={values.senderEmail}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.senderEmail && !!errors.senderEmail}
                helperText={touched.senderEmail && errors.senderEmail}
                fullWidth
              />
            </Grid>
          </>
        );
      case 1:
        return (
          <>
            <Grid item xs={12}>
              <TextField
                name="receiverName"
                label="Receiver Name"
                value={values.receiverName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.receiverName && !!errors.receiverName}
                helperText={touched.receiverName && errors.receiverName}
                fullWidth
              />
            </Grid>
            {/* Add other fields for Receiver Information */}
            <Grid item xs={12}>
              <TextField
                name="receiverAddress"
                label="Receiver Address"
                value={values.receiverAddress}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.receiverAddress && !!errors.receiverAddress}
                helperText={touched.receiverAddress && errors.receiverAddress}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="receiverPhone"
                label="Receiver Phone"
                value={values.receiverPhone}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.receiverPhone && !!errors.receiverPhone}
                helperText={touched.receiverPhone && errors.receiverPhone}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="receiverEmail"
                label="Receiver Email"
                value={values.receiverEmail}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.receiverEmail && !!errors.receiverEmail}
                helperText={touched.receiverEmail && errors.receiverEmail}
                fullWidth
              />
            </Grid>
          </>
        );
      case 2:

        // let shipmentPrice: number | string = '';
        if (values.shipmentService === 'Standard Shipping') {
          values.shipmentPrice = 100;
        } else if (values.shipmentService === 'Express Shipping') {
          values.shipmentPrice = 350;
        } else if (values.shipmentService === 'Overnight Priority') {
          values.shipmentPrice = 800;
        }

        return (
          <>
            <Grid item xs={12}>
              <TextField
                name="shipmentDate"
                label="Shipment Date"
                type="date"
                value={format(values.shipmentDate, 'yyyy-MM-dd')}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.shipmentDate && !!errors.shipmentDate}
                helperText={touched.shipmentDate && errors.shipmentDate}
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
              />
            </Grid>
            {/* Add other fields for Shipment Details */}
            <Grid item xs={12}>
              <TextField
                name="shipmentName"
                label="Shipment Name"
                type="name"
                value={values.shipmentName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.shipmentName && !!errors.shipmentName}
                helperText={touched.shipmentName && errors.shipmentName}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="shipmentCount"
                label="Package Count"
                type="number"
                value={values.shipmentCount}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.shipmentCount && !!errors.shipmentCount}
                helperText={touched.shipmentCount && errors.shipmentCount}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="shipmentValue"
                label="Package Value"
                value={values.shipmentValue}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.shipmentValue && !!errors.shipmentValue}
                helperText={touched.shipmentValue && errors.shipmentValue}
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                name="shipmentWeight"
                label="Package Weight"
                value={values.shipmentWeight}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.shipmentWeight && !!errors.shipmentWeight}
                helperText={touched.shipmentWeight && errors.shipmentWeight}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="shipmentService"
                label="Service Type"
                value={values.shipmentService}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.shipmentService && !!errors.shipmentService}
                helperText={touched.shipmentService && errors.shipmentService}
                fullWidth
                select  // Change to a select input for dropdown
              >
                <MenuItem value="Standard Shipping">Standard Shipping</MenuItem>
                <MenuItem value="Express Shipping">Express Shipping</MenuItem>
                <MenuItem value="Overnight Priority">Overnight Priority</MenuItem>
              </TextField>
            </Grid>
           <Grid item xs={12}>
              <TextField
                name="shipmentPrice"
                label="Shipment Price"
                value={values.shipmentPrice}  // Use the determined shipment price
                InputProps={{ readOnly: true }} // Make the field read-only
                fullWidth
              />
            </Grid>
          </>
        );
      case 3:
        return (
          <>
            <Box style={{ display:"flex", justifyContent: "center", alignItems: "center", flexDirection: "column", width: "100%"}} textAlign="center">
              <h2>Form submitted successfully!
                <br/>
                Here is Your Tracking Code:
              </h2>
              <h1 style={{marginTop: '-10px', color: "green"}}>{trackingCode}</h1>
              <Box>
              <Button style={{marginRight: "50px"}} variant="contained" color="primary" onClick={() => navigator.clipboard.writeText(trackingCode)}>
                Copy Code
              </Button>
              <Link to="/trackshipment">
              <Button style={{marginRight: "50px"}} variant="outlined" color="primary">
                Track Shipment
              </Button>
              </Link>
              <Button variant="outlined" color="primary" onClick={() => setActiveStep(0)}>
                Reset
              </Button>
              </Box>
            </Box>
          </>
        );
      default:
        return null;
    }
  };

  return ( 
    <Container style={{ display:"flex", justifyContent: "center", alignItems: "center", height:"100vh"}} maxWidth="sm">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnMount
      >
        {({ values, errors, touched, handleChange, handleBlur }) => (
          <Form>
            <Stepper activeStep={activeStep}>
              {steps.map((label, index) => (
                <Step key={index}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <Box mt={3}>
              
                <Box>
                  <Grid container spacing={2}>
                    {getStepContent(activeStep, handleChange, handleBlur, values, errors, touched)}
                  </Grid>
                  {activeStep === steps.length -1 ? (
                null
              ) : (
                  <Box mt={2} display="flex" justifyContent="space-between">
                    <Button
                      variant="outlined"
                      color="primary"
                      disabled={activeStep === 0}
                      onClick={() => setActiveStep((prev) => prev - 1)}
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      type={activeStep === steps.length - 2 ? 'submit' : 'button'}
                      disabled={!values.shipmentService && activeStep === steps.length - 1}
                      onClick={() => {
                        setActiveStep((prev) => prev + 1)
                        if(activeStep === steps.length - 2) {
                          handleSubmit(values)
                        }
                      }}
                    >
                      {activeStep === steps.length - 2 ? 'Submit' : 'Next'}
                    </Button>
                  </Box>
              )}
                </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

//export default MultiStepForm;

const MyComponent: React.FC = () => {
  return (
    <>
      <Navbar />
      <MultiStepForm />
    </>
  );
};

export default MyComponent;
