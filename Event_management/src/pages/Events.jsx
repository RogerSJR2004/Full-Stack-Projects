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
import { useNavigate } from 'react-router-dom';
import '../components/auth-dark.css';

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
    <Box className="app-bg-root">
      <Box className="app-glass-section" sx={{ width: '100%', minHeight: '100vh', py: 6, px: { xs: 2, md: 8 } }}>
        <Typography variant="h2" className="app-title" align="center" gutterBottom>
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
              sx={{ fontWeight: 600, fontSize: '1rem', px: 2, py: 1, borderRadius: 2, cursor: 'pointer', background: filter === opt.value ? '#7bb6ff' : 'rgba(36,41,54,0.92)', color: filter === opt.value ? '#232a36' : '#e3e9f7', border: filter === opt.value ? '2px solid #7bb6ff' : '2px solid #232a36' }}
            />
          ))}
        </Stack>
        {/* Events Gallery */}
        <Box className="events-gallery" sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center', alignItems: 'stretch' }}>
          {filteredEvents.map((event, idx) => (
            <Card key={idx} className="event-card" sx={{ width: 340, borderRadius: 4, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="180"
                image={event.image}
                alt={event.name}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#7bb6ff', mb: 1 }}>{event.name}</Typography>
                <Typography variant="subtitle2" sx={{ color: '#b0b7c3', mb: 1 }}>{event.date}</Typography>
                <Typography variant="body2" sx={{ color: '#e3e9f7', mb: 2 }}>{event.description}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
}