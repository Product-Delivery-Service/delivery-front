import React, { useState } from 'react';
import { TextField, Button, Stepper, Step, StepLabel, Container, Grid, Box } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { format } from 'date-fns';

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
  shipmentValue: number | string;
  shipmentPrice: number | string;
  shipmentWeight: number | string;
  shipmentService: string;
  trackingCode: string;
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
  shipmentCount: yup.number().required('Package Count is required'),
  shipmentValue: yup.string().required('Package Value is required'),
  shipmentPrice: yup.string().required('Package Price is required'),
  shipmentWeight: yup.string().required('Package Weight is required'),
  shipmentService: yup.string().required('Service Type is required'),
  trackingCode: yup.string().required('Tracking Code is required'),
});

const MultiStepForm: React.FC = () => {
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
    shipmentCount: 0,
    shipmentValue: '',
    shipmentPrice: '',
    shipmentWeight: '',
    shipmentService: '',
    trackingCode: '',
  };

  const steps = [
    'Sender Information',
    'Receiver Information',
    'Shipment Details',
    'Confirmation',
  ];

  const [activeStep, setActiveStep] = useState(0);

  const handleSubmit = (values: FormData) => {
    alert('Form submitted successfully!');
    // Add your form submission logic here
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
                name="shipmentPrice"
                label="Package Price"
                value={values.shipmentPrice}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.shipmentPrice && !!errors.shipmentPrice}
                helperText={touched.shipmentPrice && errors.shipmentPrice}
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
              />
            </Grid>
          </>
        );
      case 3:
        return (
          <>
            <Grid item xs={12}>
              <TextField
                name="trackingCode"
                label="Tracking Code"
                value={values.trackingCode}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.trackingCode && !!errors.trackingCode}
                helperText={touched.trackingCode && errors.trackingCode}
                fullWidth
              />
            </Grid>
            {/* Add other fields for Confirmation */}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="sm">
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
              {activeStep === steps.length ? (
                <Box textAlign="center">
                  <h2>Form submitted successfully!</h2>
                  <Button variant="contained" color="primary" onClick={() => setActiveStep(0)}>
                    Reset
                  </Button>
                </Box>
              ) : (
                <Box>
                  <Grid container spacing={2}>
                    {getStepContent(activeStep, handleChange, handleBlur, values, errors, touched)}
                  </Grid>
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
                      type="submit"
                      disabled={!values.shipmentService && activeStep === steps.length - 1}
                      onClick={() => setActiveStep((prev) => prev + 1)}
                    >
                      {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                    </Button>
                  </Box>
                </Box>
              )}
            </Box>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default MultiStepForm;
