import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import StarIcon from '@mui/icons-material/Star';
import '../components/Event.css';

const allEvents = [
  {
    type: 'past',
    name: 'Spring Gala 2024',
    date: 'April 20, 2024',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80',
    description: 'A magical evening of music, food, and celebration at the annual Spring Gala.',
    feedback: [
      { user: 'Priya S.', avatar: 'https://randomuser.me/api/portraits/women/68.jpg', rating: 5, comment: 'Amazing event! Loved every moment.' },
      { user: 'Rahul D.', avatar: 'https://randomuser.me/api/portraits/men/65.jpg', rating: 4, comment: 'Great atmosphere and music.' },
    ],
  },
  {
    type: 'past',
    name: 'Summer Festival 2024',
    date: 'July 15, 2024',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    description: 'Vibrant energy, live music, food vendors, and family-friendly activities.',
    feedback: [
      { user: 'Aisha K.', avatar: 'https://randomuser.me/api/portraits/women/65.jpg', rating: 5, comment: 'So much fun for the whole family!' },
    ],
  },
  {
    type: 'featured',
    name: 'Fall Harvest Festival 2025',
    date: 'October 10, 2025',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80',
    description: 'Celebrate the harvest season with live music, local vendors, and a fun-filled day for the whole family.',
    feedback: [],
  },
  {
    type: 'highlight',
    name: 'New Year Bash 2024',
    date: 'December 31, 2024',
    image: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=600&q=80',
    description: 'Ring in the new year with fireworks, music, and dancing!',
    feedback: [
      { user: 'Ravi T.', avatar: 'https://randomuser.me/api/portraits/men/66.jpg', rating: 5, comment: 'Best New Year party ever!' },
    ],
  },
];

const filterOptions = [
  { label: 'Past', value: 'past' },
  { label: 'Featured', value: 'featured' },
  { label: 'Highlights', value: 'highlight' },
];

export default function Events() {
  const [filter, setFilter] = useState('past');
  const filteredEvents = allEvents.filter(e => e.type === filter);

  return (
    <Box className="events-bg" sx={{ width: '100%', minHeight: '100vh', background: 'linear-gradient(120deg, #e0eafc 0%, #cfdef3 100%)', py: 8, px: { xs: 2, md: 8 } }}>
      <Typography variant="h2" className="events-title" align="center" gutterBottom sx={{ fontWeight: 900, color: 'primary.main', mb: 4 }}>
        Events
      </Typography>
      {/* Filter Bar */}
      <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" sx={{ mb: 5 }}>
        {filterOptions.map(opt => (
          <Chip
            key={opt.value}
            label={opt.label}
            color={filter === opt.value ? 'primary' : 'default'}
            onClick={() => setFilter(opt.value)}
            sx={{ fontWeight: 600, fontSize: '1rem', px: 2, py: 1, borderRadius: 2, cursor: 'pointer' }}
          />
        ))}
      </Stack>
      {/* Events Gallery */}
      <Box className="events-gallery" sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center', alignItems: 'stretch' }}>
        {filteredEvents.map((event, idx) => (
          <Card key={idx} className="event-card" sx={{ width: 340, boxShadow: 6, borderRadius: 4, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <CardMedia
              component="img"
              height="180"
              image={event.image}
              alt={event.name}
              sx={{ objectFit: 'cover' }}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>{event.name}</Typography>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>{event.date}</Typography>
              <Typography variant="body2" color="text.primary" sx={{ mb: 2 }}>{event.description}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}