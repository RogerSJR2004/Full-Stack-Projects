import React from 'react';
import EventCard from './EventCard';
import Box from '@mui/material/Box';
import '../components/auth-dark.css';

export default function EventList({ events, onEventClick }) {
  if (!events || events.length === 0) {
    return <div style={{ color: '#b0b7c3', textAlign: 'center', margin: '2rem 0' }}>No events found.</div>;
  }
  return (
    <Box display="flex" flexWrap="wrap" gap={3} justifyContent="center" alignItems="stretch" sx={{ width: '100%' }}>
      {events.map(event => (
        <EventCard key={event.id} event={event} onClick={() => onEventClick(event)} />
      ))}
    </Box>
  );
} 