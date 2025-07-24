import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import '../components/auth-dark.css';

export default function EventCard({ event, onClick }) {
  const imageUrl = event.image || event.imageUrl || '/static/images/cards/contemplative-reptile.jpg';
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
          {event.name || event.title}
        </Typography>
        <Typography variant="body2" sx={{ color: '#b0b7c3', mb: 1 }}>
          {event.date || event.time || ''}
        </Typography>
        <Typography variant="body2" sx={{ color: '#e3e9f7' }}>
          {event.description?.slice(0, 100) || 'No description.'}{event.description?.length > 100 ? '...' : ''}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" className="app-btn-outline" sx={{ fontWeight: 700, borderRadius: 2, px: 2, py: 0.7 }} onClick={e => { e.stopPropagation(); onClick && onClick(); }}>View Details</Button>
      </CardActions>
    </Card>
  );
} 