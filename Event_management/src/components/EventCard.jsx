import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import '../components/auth-dark.css';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import MenuItem from '@mui/material/MenuItem';

export default function EventCard({ event, onClick }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = (e) => {
    e.stopPropagation();
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const imageUrl = event.event_image_link || event.image || event.imageUrl || '/static/images/cards/contemplative-reptile.jpg';
  const [form, setForm] = React.useState({
    full_name: '',
    email_address: '',
    mobile: '',
    country: '',
    state: '',
    district: '',
    meta_1: '',
    meta_2: '',
    meta_3: ''
  });
  const [submitting, setSubmitting] = React.useState(false);
  const [snackbar, setSnackbar] = React.useState({ open: false, message: '', severity: 'success' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(`http://localhost:8080/ems/v1/event/${event.id}/enroll`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error('Failed to enroll');
      setSnackbar({ open: true, message: 'Enrollment successful!', severity: 'success' });
      setOpen(false);
      setForm({
        full_name: '', email_address: '', mobile: '', country: '', state: '', district: '', meta_1: '', meta_2: '', meta_3: ''
      });
    } catch (err) {
      setSnackbar({ open: true, message: err.message || 'Error occurred', severity: 'error' });
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Card className="event-card" sx={{ maxWidth: 345, mb: 3, borderRadius: 3, boxShadow: 6, background: 'rgba(36,41,54,0.92) !important', color: '#e3e9f7', border: '1.5px solid rgba(255,255,255,0.06)', transition: 'transform 0.18s', '&:hover': { transform: 'scale(1.03)', boxShadow: 8 } }}>
      <CardMedia
        component="img"
        alt={event.name || event.title || 'Event image'}
        height="160"
        image={imageUrl}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" sx={{ color: '#7bb6ff', fontWeight: 700 }}>
          {event.event_name || event.name || event.title}
        </Typography>
        <Typography variant="body2" sx={{ color: '#b0b7c3', mb: 1 }}>
          {event.event_date || event.date || event.time || ''}
        </Typography>
        <Typography variant="body2" sx={{ color: '#e3e9f7' }}>
          {event.event_description?.slice(0, 100) || event.description?.slice(0, 100) || 'No description.'}{(event.event_description?.length > 100 || event.description?.length > 100) ? '...' : ''}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" className="app-btn-outline" sx={{ fontWeight: 700, borderRadius: 2, px: 2, py: 0.7 }} onClick={handleOpen}>Apply</Button>
      </CardActions>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Event Enrollment</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16, minWidth: 320, marginTop: 8 }}>
            <TextField label="Full Name" name="full_name" value={form.full_name} onChange={handleChange} fullWidth required margin="dense" />
            <TextField label="Email Address" name="email_address" value={form.email_address} onChange={handleChange} fullWidth required margin="dense" type="email" />
            <TextField label="Mobile" name="mobile" value={form.mobile} onChange={handleChange} fullWidth required margin="dense" />
            <TextField label="Country" name="country" value={form.country} onChange={handleChange} fullWidth required margin="dense" />
            <TextField label="State" name="state" value={form.state} onChange={handleChange} fullWidth required margin="dense" />
            <TextField label="District" name="district" value={form.district} onChange={handleChange} fullWidth required margin="dense" />
            <TextField
              select
              label="Meta 1"
              name="meta_1"
              value={form.meta_1}
              onChange={handleChange}
              fullWidth
              margin="dense"
              required
            >
              <MenuItem value="">Select participation type</MenuItem>
              <MenuItem value="Online participation">Online participation</MenuItem>
              <MenuItem value="In-person participation">In-person participation</MenuItem>
              <MenuItem value="Hybrid">Hybrid</MenuItem>
            </TextField>
            <TextField
              select
              label="Meta 2"
              name="meta_2"
              value={form.meta_2}
              onChange={handleChange}
              fullWidth
              margin="dense"
              required
            >
              <MenuItem value="">Select transportation need</MenuItem>
              <MenuItem value="No transportation needed">No transportation needed</MenuItem>
              <MenuItem value="Need transportation">Need transportation</MenuItem>
            </TextField>
            <TextField
              select
              label="Meta 3"
              name="meta_3"
              value={form.meta_3}
              onChange={handleChange}
              fullWidth
              margin="dense"
              required
            >
              <MenuItem value="">Select food preference</MenuItem>
              <MenuItem value="Vegetarian">Vegetarian</MenuItem>
              <MenuItem value="Non-vegetarian">Non-vegetarian</MenuItem>
              <MenuItem value="Vegan">Vegan</MenuItem>
            </TextField>
            <DialogActions>
              <Button onClick={handleClose} disabled={submitting}>Cancel</Button>
              <Button type="submit" variant="contained" className="app-btn" disabled={submitting}>{submitting ? 'Submitting...' : 'Submit'}</Button>
            </DialogActions>
          </form>
        </DialogContent>
        <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Dialog>
    </Card>
  );
} 