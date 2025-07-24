import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { keyframes } from '@mui/system';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import '../../components/auth-dark.css';

const fadeInUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(40px) scale(0.98);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

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

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)', color: '#7bb6ff', fontWeight: 700 }}
  >
    •
  </Box>
);

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
    <Box className="app-bg-root" sx={{ minHeight: '100vh', py: { xs: 2, sm: 6 }, px: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box className="app-glass-card" sx={{ width: '100%', maxWidth: 480, mx: 'auto', position: 'relative', animation: `${fadeInUp} 0.7s cubic-bezier(0.23, 1, 0.32, 1)` }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
          <EventAvailableIcon sx={{ color: '#7bb6ff', fontSize: 48, mb: 1 }} />
          <Typography variant="h4" className="app-title" gutterBottom>
            Add Event
          </Typography>
          <Typography variant="subtitle2" className="app-subtitle" sx={{ mb: 2 }}>
            Fill in the details to create a new event
          </Typography>
        </Box>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
            <Form autoComplete="off">
              <Stack spacing={2}>
                <TextField
                  label={<>{bull} Event Name</>}
                  name="eventName"
                  value={values.eventName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  fullWidth
                  autoComplete="off"
                  error={touched.eventName && Boolean(errors.eventName)}
                  helperText={touched.eventName && errors.eventName}
                  className="auth-input"
                />
                <TextField
                  label={<>{bull} Event Description</>}
                  name="eventDescription"
                  value={values.eventDescription}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  multiline
                  minRows={3}
                  fullWidth
                  autoComplete="off"
                  error={touched.eventDescription && Boolean(errors.eventDescription)}
                  helperText={touched.eventDescription && errors.eventDescription}
                  className="auth-input"
                />
                <TextField
                  label={<>{bull} Event Date</>}
                  name="eventDate"
                  type="date"
                  value={values.eventDate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  autoComplete="off"
                  error={touched.eventDate && Boolean(errors.eventDate)}
                  helperText={touched.eventDate && errors.eventDate}
                  className="auth-input"
                />
                <TextField
                  label={<>{bull} Event Location</>}
                  name="eventLocation"
                  value={values.eventLocation}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  fullWidth
                  autoComplete="off"
                  error={touched.eventLocation && Boolean(errors.eventLocation)}
                  helperText={touched.eventLocation && errors.eventLocation}
                  className="auth-input"
                />
                <TextField
                  label={<>{bull} Event Link</>}
                  name="eventLink"
                  value={values.eventLink}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  fullWidth
                  autoComplete="off"
                  error={touched.eventLink && Boolean(errors.eventLink)}
                  helperText={touched.eventLink && errors.eventLink}
                  className="auth-input"
                />
                <TextField
                  label={<>{bull} Event Video Link</>}
                  name="eventVideoLink"
                  value={values.eventVideoLink}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  fullWidth
                  autoComplete="off"
                  error={touched.eventVideoLink && Boolean(errors.eventVideoLink)}
                  helperText={touched.eventVideoLink && errors.eventVideoLink}
                  className="auth-input"
                />
                <TextField
                  label={<>{bull} Event Image Link</>}
                  name="eventImageLink"
                  value={values.eventImageLink}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  fullWidth
                  autoComplete="off"
                  error={touched.eventImageLink && Boolean(errors.eventImageLink)}
                  helperText={touched.eventImageLink && errors.eventImageLink}
                  className="auth-input"
                />
                <TextField
                  label={<>{bull} Publish From</>}
                  name="publishFrom"
                  type="datetime-local"
                  value={values.publishFrom}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  autoComplete="off"
                  error={touched.publishFrom && Boolean(errors.publishFrom)}
                  helperText={touched.publishFrom && errors.publishFrom}
                  className="auth-input"
                />
                <TextField
                  label={<>{bull} Publish To</>}
                  name="publishTo"
                  type="datetime-local"
                  value={values.publishTo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  autoComplete="off"
                  error={touched.publishTo && Boolean(errors.publishTo)}
                  helperText={touched.publishTo && errors.publishTo}
                  className="auth-input"
                />
                <TextField
                  select
                  label={<>{bull} Status</>}
                  name="status"
                  value={values.status}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  fullWidth
                  required
                  className="auth-input"
                  error={touched.status && Boolean(errors.status)}
                  helperText={touched.status && errors.status}
                >
                  <MenuItem value={1}>Active</MenuItem>
                  <MenuItem value={0}>Inactive</MenuItem>
                </TextField>
              </Stack>
              <CardActions sx={{ flexDirection: 'column', alignItems: 'stretch', gap: 1, px: 0, pb: 0, mt: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  className="app-btn"
                  size="large"
                  disabled={isSubmitting}
                >
                  Add Event
                </Button>
                {success && (
                  <Typography color="success.main" sx={{ mt: 1, textAlign: 'center', fontWeight: 600 }}>
                    Event added successfully!
                  </Typography>
                )}
                {error && (
                  <Typography color="error.main" sx={{ mt: 1, textAlign: 'center', fontWeight: 600 }}>
                    {error}
                  </Typography>
                )}
              </CardActions>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
}
