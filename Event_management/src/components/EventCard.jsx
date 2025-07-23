import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function EventCard({ event, onClick }) {
  const imageUrl = event.image || event.imageUrl || '/static/images/cards/contemplative-reptile.jpg';
  return (
    <Card sx={{ maxWidth: 345, mb: 3, boxShadow: 2, borderRadius: 2 }}>
      <CardMedia
        component="img"
        alt={event.name || event.title || 'Event image'}
        height="140"
        image={imageUrl}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {event.name || event.title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {event.description?.slice(0, 100) || 'No description.'}{event.description?.length > 100 ? '...' : ''}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={e => { e.stopPropagation(); onClick && onClick(); }}>View Details</Button>
      </CardActions>
    </Card>
  );
} 