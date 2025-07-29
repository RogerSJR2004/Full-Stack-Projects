import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  TextField, 
  Button, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  Grid
} from '@mui/material';

export default function EventEditForm({ event, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    eventName: '',
    eventDescription: '',
    eventDate: '',
    eventLocation: '',
    eventLink: '',
    eventVideoLink: '',
    eventImageLink: '',
    publishFrom: '',
    publishTo: '',
    status: 1
  });

  const isEditing = !!event;

  useEffect(() => {
    if (event) {
      setFormData({
        eventName: event.event_name || '',
        eventDescription: event.event_description || '',
        eventDate: event.event_date ? event.event_date.split('T')[0] : '',
        eventLocation: event.event_location || '',
        eventLink: event.event_link || '',
        eventVideoLink: event.event_video_link || '',
        eventImageLink: event.event_image_link || '',
        publishFrom: event.publish_from ? event.publish_from.split('T')[0] : '',
        publishTo: event.publish_to ? event.publish_to.split('T')[0] : '',
        status: event.status || 1
      });
    }
  }, [event]);

  const handleChange = (field) => (e) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.eventName || !formData.eventDescription) {
      alert('Event name and description are required!');
      return;
    }

    onSave(event?.id, formData);
  };

  return (
    <Dialog open={true} onClose={onCancel} maxWidth="md" fullWidth>
      <DialogTitle>
        {isEditing ? 'Edit Event' : 'Add New Event'}
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Event Name *"
                value={formData.eventName}
                onChange={handleChange('eventName')}
                required
                margin="normal"
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Event Description *"
                value={formData.eventDescription}
                onChange={handleChange('eventDescription')}
                required
                multiline
                rows={3}
                margin="normal"
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Event Date"
                type="date"
                value={formData.eventDate}
                onChange={handleChange('eventDate')}
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Event Location"
                value={formData.eventLocation}
                onChange={handleChange('eventLocation')}
                margin="normal"
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Event Link"
                value={formData.eventLink}
                onChange={handleChange('eventLink')}
                margin="normal"
                placeholder="https://..."
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Video Link"
                value={formData.eventVideoLink}
                onChange={handleChange('eventVideoLink')}
                margin="normal"
                placeholder="https://..."
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Image Link"
                value={formData.eventImageLink}
                onChange={handleChange('eventImageLink')}
                margin="normal"
                placeholder="https://..."
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Publish From"
                type="date"
                value={formData.publishFrom}
                onChange={handleChange('publishFrom')}
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Publish To"
                type="date"
                value={formData.publishTo}
                onChange={handleChange('publishTo')}
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Status</InputLabel>
                <Select
                  value={formData.status}
                  onChange={handleChange('status')}
                  label="Status"
                >
                  <MenuItem value={1}>Active</MenuItem>
                  <MenuItem value={0}>Inactive</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={onCancel} color="secondary">
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            {isEditing ? 'Update Event' : 'Add Event'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
} 