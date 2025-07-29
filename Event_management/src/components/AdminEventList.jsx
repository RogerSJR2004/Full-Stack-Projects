import React from 'react';
import AdminEventCard from './AdminEventCard';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import '../components/auth-dark.css';

export default function AdminEventList({ events, onEventClick, onEditEvent, onViewEnrollments }) {
  if (!events || events.length === 0) {
    return (
      <Box sx={{ 
        textAlign: 'center', 
        py: 8, 
        color: '#b0b7c3',
        background: 'rgba(255, 255, 255, 0.02)',
        borderRadius: 3,
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          No events found
        </Typography>
        <Typography variant="body2" sx={{ color: '#8a8a8a' }}>
          Create your first event to get started
        </Typography>
      </Box>
    );
  }

  return (
    <Box display="flex" flexWrap="wrap" gap={3} justifyContent="center" alignItems="stretch" sx={{ width: '100%' }}>
      {events.map(event => (
        <AdminEventCard 
          key={event.id} 
          event={event} 
          onClick={() => onEventClick(event)}
          onEdit={onEditEvent}
          onViewEnrollments={onViewEnrollments}
        />
      ))}
    </Box>
  );
} 