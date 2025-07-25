import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { keyframes } from '@mui/system';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import '../../components/auth-dark.css';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Paper } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import { Link as RouterLink } from 'react-router-dom';

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

// Helper functions for formatting date and datetime-local values
function formatDate(dateStr) {
  if (!dateStr) return '';
  return dateStr.split('T')[0];
}

function formatDateTime(dateStr) {
  if (!dateStr) return '';
  // Returns 'YYYY-MM-DDTHH:mm'
  return dateStr.slice(0, 16);
}

// Helper to convert snake_case keys to camelCase
function toCamelCase(obj) {
  const newObj = {};
  for (const key in obj) {
    const camelKey = key.replace(/_([a-z])/g, g => g[1].toUpperCase());
    newObj[camelKey] = obj[key];
  }
  return newObj;
}

// Header component copied and adapted from UserDashboard.jsx
function Header({ onLogout }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" className="app-navbar" sx={{ backdropFilter: 'blur(12px)', borderRadius: '0 0 1.5rem 1.5rem', boxShadow: '0 4px 24px rgba(44,62,80,0.18)' }}>
      <Toolbar sx={{ minHeight: 72, px: { xs: 1, md: 4 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <EventAvailableIcon sx={{ color: '#7bb6ff', fontSize: 32, mr: 1 }} />
          <Typography variant="h6" component={RouterLink} to="/" sx={{ textDecoration: 'none', color: '#fff', fontWeight: 900, letterSpacing: 1.5, mr: 3 }}>
            EventManager
          </Typography>
        </Box>
        <Button component={RouterLink} to="/events" className="app-btn" sx={{ background: 'none !important', color: '#e3e9f7 !important', fontWeight: 700, px: 2, py: 1, fontSize: '1.08rem', '&:hover': { color: '#7bb6ff !important', background: '#232a36 !important' } }}>Events</Button>
        <Button component={RouterLink} to="/help" className="app-btn" sx={{ background: 'none !important', color: '#e3e9f7 !important', fontWeight: 700, px: 2, py: 1, fontSize: '1.08rem', '&:hover': { color: '#7bb6ff !important', background: '#232a36 !important' } }}>Help</Button>
        <Button component={RouterLink} to="/addevent" className="app-btn" sx={{ background: 'none !important', color: '#7bb6ff !important', fontWeight: 700, px: 2, py: 1, fontSize: '1.08rem', '&:hover': { color: '#fff !important', background: '#232a36 !important' } }}>Add</Button>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton onClick={handleMenu} color="inherit" size="large">
          <Avatar />
        </IconButton>
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem onClick={handleClose} component={RouterLink} to="/profile">Profile</MenuItem>
          <MenuItem onClick={() => { handleClose(); onLogout && onLogout(); }} component={RouterLink} to="/logout">Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default function AddEvent() {
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState('');
  const [events, setEvents] = React.useState([]);
  const [showEvents, setShowEvents] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [editEvent, setEditEvent] = React.useState(null);
  const [editSuccess, setEditSuccess] = React.useState(false);
  const [editError, setEditError] = React.useState('');

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

  const fetchEvents = async () => {
    try {
      const res = await fetch('http://localhost:8080/ems/v1/event/list');
      if (!res.ok) throw new Error('Failed to fetch events');
      const data = await res.json();
      setEvents(data);
      console.log('Fetched events:', data);
    } catch (err) {
      setError(err.message || 'Error fetching events');
    }
  };

  const handleShowEvents = () => {
    setShowEvents((prev) => !prev);
    if (!showEvents) fetchEvents();
  };

  const handleEditClick = (event) => {
    setEditEvent(toCamelCase(event));
    setEditOpen(true);
    setEditSuccess(false);
    setEditError('');
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setEditEvent(null);
  };

  const handleEditSubmit = async (values, { setSubmitting }) => {
    setEditSuccess(false);
    setEditError('');
    try {
      const response = await fetch(`http://localhost:8080/ems/v1/event/${values.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error('Failed to update event');
      setEditSuccess(true);
      fetchEvents();
      setTimeout(() => {
        setEditOpen(false);
        setEditEvent(null);
      }, 1000);
    } catch (err) {
      setEditError(err.message || 'Error updating event');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box className="app-bg-root" sx={{ minHeight: '100vh', py: { xs: 2, sm: 6 }, px: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Header />
      <Card sx={{ width: '100%', maxWidth: 900, mx: 'auto', borderRadius: 4, boxShadow: 6, animation: `${fadeInUp} 0.7s cubic-bezier(0.23, 1, 0.32, 1)` }}>
        <Grid container>
        
          <Grid item xs={12} md={5} sx={{
            background: 'linear-gradient(135deg, #7bb6ff 0%, #e0e7ff 100%)',
            borderTopLeftRadius: 16,
            borderBottomLeftRadius: 16,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            p: { xs: 3, md: 5 },
            minHeight: { xs: 180, md: 500 },
          }}>
            <EventAvailableIcon sx={{ color: '#fff', fontSize: 64, mb: 2 }} />
            <Typography variant="h4" sx={{ color: '#fff', fontWeight: 700, mb: 1 }}>
              Add Event
            </Typography>
            <Typography variant="subtitle1" sx={{ color: '#e3f2fd', mb: 2, textAlign: 'center' }}>
              Fill in the details to create a new event
            </Typography>
            <Button variant="outlined" sx={{ mt: 2, color: '#fff', borderColor: '#fff', '&:hover': { borderColor: '#fff', background: '#7bb6ff22' } }} onClick={handleShowEvents}>
              {showEvents ? 'Hide Events' : 'Show Events'}
            </Button>
          </Grid>
          {/* Right Side: Form */}
          <Grid item xs={12} md={7}>
            <CardContent sx={{ p: { xs: 3, md: 5 } }}>
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
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
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
                        </Grid>
                        <Grid item xs={12} sm={6}>
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
                        </Grid>
                      </Grid>
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
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
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
                        </Grid>
                        <Grid item xs={12} sm={6}>
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
                        </Grid>
                      </Grid>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
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
                        </Grid>
                        <Grid item xs={12} sm={6}>
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
                        </Grid>
                      </Grid>
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
                        sx={{ borderRadius: 2, fontWeight: 600, fontSize: 16 }}
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
            </CardContent>
          </Grid>
        </Grid>
      </Card>
      {/* Event List Section */}
      {showEvents && (
        <Box sx={{ width: '100%', maxWidth: 900, mt: 4 }}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>All Events</Typography>
          <Paper sx={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={events.map(event => ({
                id: event.id,
                name: event.event_name,
                date: event.event_date,
                location: event.event_location,
                status: event.status === 1 ? 'Active' : 'Inactive',
                raw: event,
              }))}
              columns={[
                { field: 'id', headerName: 'ID', width: 70 },
                { field: 'name', headerName: 'Name', width: 180 },
                { field: 'date', headerName: 'Date', width: 130 },
                { field: 'location', headerName: 'Location', width: 160 },
                { field: 'status', headerName: 'Status', width: 100 },
                {
                  field: 'edit',
                  headerName: 'Edit',
                  width: 90,
                  sortable: false,
                  renderCell: (params) => (
                    <IconButton edge="end" aria-label="edit" onClick={() => handleEditClick(params.row.raw)}>
                      <EditIcon />
                    </IconButton>
                  ),
                },
              ]}
              initialState={{ pagination: { paginationModel: { page: 0, pageSize: 5 } } }}
              pageSizeOptions={[5, 10]}
              sx={{ border: 0 }}
              disableRowSelectionOnClick
            />
          </Paper>
        </Box>
      )}
      {/* Edit Event Dialog */}
      <Dialog open={editOpen} onClose={handleEditClose} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Event</DialogTitle>
        <DialogContent>
          {editEvent && (
            <Formik
              initialValues={{
                ...editEvent,
                eventDate: formatDate(editEvent.eventDate),
                publishFrom: formatDateTime(editEvent.publishFrom),
                publishTo: formatDateTime(editEvent.publishTo),
              }}
              validationSchema={Yup.object({
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
              })}
              enableReinitialize
              onSubmit={handleEditSubmit}
            >
              {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
                <Form autoComplete="off">
                  <Stack spacing={2} sx={{ mt: 1 }}>
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
                      value={formatDate(values.eventDate)}
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
                      value={formatDateTime(values.publishFrom)}
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
                      value={formatDateTime(values.publishTo)}
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
                      error={touched.status && Boolean(errors.status)}
                      helperText={touched.status && errors.status}
                    >
                      <MenuItem value={1}>Active</MenuItem>
                      <MenuItem value={0}>Inactive</MenuItem>
                    </TextField>
                  </Stack>
                  <DialogActions sx={{ mt: 2 }}>
                    <Button onClick={handleEditClose} color="secondary" variant="outlined">Cancel</Button>
                    <Button type="submit" variant="contained" disabled={isSubmitting}>Save</Button>
                  </DialogActions>
                  {editSuccess && (
                    <Typography color="success.main" sx={{ mt: 1, textAlign: 'center', fontWeight: 600 }}>
                      Event updated successfully!
                    </Typography>
                  )}
                  {editError && (
                    <Typography color="error.main" sx={{ mt: 1, textAlign: 'center', fontWeight: 600 }}>
                      {editError}
                    </Typography>
                  )}
                </Form>
              )}
            </Formik>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}
