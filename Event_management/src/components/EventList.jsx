import React from 'react';
import EventCard from './EventCard';
import Box from '@mui/material/Box';

export default function EventList({ events, onEventClick }) {
  if (!events || events.length === 0) {
    return <div>No events found.</div>;
  }
  return (
    <Box display="flex" flexWrap="wrap" gap={2} justifyContent="center">
      {events.map(event => (
        <EventCard key={event.id} event={event} onClick={() => onEventClick(event)} />
      ))}
    </Box>
  );
} 