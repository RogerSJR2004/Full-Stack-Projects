import React from 'react';
import { Box, TextField, Button, Typography, Paper, Stack } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

const initialValues = {
  eventName: '',
  eventDescription: '',
  eventDate: '',
  eventLocation: '',
  eventLink: '',
  eventVideoLink: '',
  eventImageLink: '',
  publishFrom: '',
  publishTo: '',
  status: 1,
};

const validationSchema = Yup.object({
  eventName: Yup.string().required('Event name is required'),
  eventDescription: Yup.string().required('Event description is required'),
  eventDate: Yup.string().required('Event date is required'),
  eventLocation: Yup.string().required('Event location is required'),
  eventLink: Yup.string().required('Event link is required'),
  eventVideoLink: Yup.string().required('Event video link is required'),
  eventImageLink: Yup.string().required('Event image link is required'),
  publishFrom: Yup.string().required('Publish from is required'),
  publishTo: Yup.string().required('Publish to is required'),
  status: Yup.number().oneOf([0, 1], 'Invalid status').required('Status is required'),
});

export default function AddEvent() {
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    setSuccess(false);
    setError('');
    try {
      const response = await fetch('http://localhost:8080/ems/v1/event/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        throw new Error('Failed to add event');
      }
      setSuccess(true);
      resetForm();
    } catch (err) {
      setError(err.message || 'Error adding event');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f4f6fa', py: 6 }}>
      <Paper elevation={3} sx={{ maxWidth: 600, mx: 'auto', p: 4 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Add New Event
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
            <Form>
              <Stack spacing={2}>
                <TextField
                  label="Event Name"
                  name="eventName"
                  value={values.eventName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  fullWidth
                  error={touched.eventName && Boolean(errors.eventName)}
                  helperText={touched.eventName && errors.eventName}
                />
                <TextField
                  label="Event Description"
                  name="eventDescription"
                  value={values.eventDescription}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  multiline
                  minRows={3}
                  fullWidth
                  error={touched.eventDescription && Boolean(errors.eventDescription)}
                  helperText={touched.eventDescription && errors.eventDescription}
                />
                <TextField
                  label="Event Date"
                  name="eventDate"
                  type="date"
                  value={values.eventDate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  error={touched.eventDate && Boolean(errors.eventDate)}
                  helperText={touched.eventDate && errors.eventDate}
                />
                <TextField
                  label="Event Location"
                  name="eventLocation"
                  value={values.eventLocation}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  fullWidth
                  error={touched.eventLocation && Boolean(errors.eventLocation)}
                  helperText={touched.eventLocation && errors.eventLocation}
                />
                <TextField
                  label="Event Link"
                  name="eventLink"
                  value={values.eventLink}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  fullWidth
                  error={touched.eventLink && Boolean(errors.eventLink)}
                  helperText={touched.eventLink && errors.eventLink}
                />
                <TextField
                  label="Event Video Link"
                  name="eventVideoLink"
                  value={values.eventVideoLink}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  fullWidth
                  error={touched.eventVideoLink && Boolean(errors.eventVideoLink)}
                  helperText={touched.eventVideoLink && errors.eventVideoLink}
                />
                <TextField
                  label="Event Image Link"
                  name="eventImageLink"
                  value={values.eventImageLink}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  fullWidth
                  error={touched.eventImageLink && Boolean(errors.eventImageLink)}
                  helperText={touched.eventImageLink && errors.eventImageLink}
                />
                <TextField
                  label="Publish From"
                  name="publishFrom"
                  type="datetime-local"
                  value={values.publishFrom}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  error={touched.publishFrom && Boolean(errors.publishFrom)}
                  helperText={touched.publishFrom && errors.publishFrom}
                />
                <TextField
                  label="Publish To"
                  name="publishTo"
                  type="datetime-local"
                  value={values.publishTo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  error={touched.publishTo && Boolean(errors.publishTo)}
                  helperText={touched.publishTo && errors.publishTo}
                />
                <TextField
                  select
                  label="Status"
                  name="status"
                  value={values.status}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                  required
                  sx={{ mb: 2 }}
                  error={touched.status && Boolean(errors.status)}
                  helperText={touched.status && errors.status}
                >
                  <MenuItem value={1}>Active</MenuItem>
                  <MenuItem value={0}>Inactive</MenuItem>
                </TextField>
                <Button type="submit" variant="contained" color="primary" size="large" disabled={isSubmitting}>
                  Add Event
                </Button>
                {success && (
                  <Typography color="success.main">Event added successfully!</Typography>
                )}
                {error && (
                  <Typography color="error.main">{error}</Typography>
                )}
              </Stack>
            </Form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
}
