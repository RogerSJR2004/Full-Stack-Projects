import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import '../components/auth-dark.css';

export default function EventDetails({ event, onRegister, showRegisterButton }) {
  if (!event) return <div style={{ color: '#b0b7c3', textAlign: 'center', margin: '2rem 0' }}>No event selected.</div>;
  const imageUrl = event.image || event.imageUrl || '/static/images/cards/contemplative-reptile.jpg';
  return (
    <Card className="event-card" sx={{ maxWidth: 500, mx: 'auto', my: 2, borderRadius: 3, boxShadow: 8, background: 'rgba(36,41,54,0.97) !important', color: '#e3e9f7', border: '1.5px solid rgba(255,255,255,0.09)', p: 2 }}>
      <CardMedia
        component="img"
        height="220"
        image={imageUrl}
        alt={event.name || event.title || 'Event image'}
        sx={{ objectFit: 'cover', borderRadius: 2 }}
      />
      <CardContent>
        <Typography gutterBottom variant="h4" component="div" sx={{ color: '#7bb6ff', fontWeight: 800 }}>
          {event.name || event.title}
        </Typography>
        <Typography variant="subtitle1" sx={{ color: '#b0b7c3', fontWeight: 600, mb: 1 }}>
          {(event.date || event.time || event.location) && (
            <>
              {event.date} {event.time && `| ${event.time}`} {event.location && `| ${event.location}`}
            </>
          )}
        </Typography>
        <Typography variant="body1" sx={{ mt: 2, color: '#e3e9f7' }}>{event.description}</Typography>
        {event.speakers && (
          <>
            <Typography variant="h6" sx={{ mt: 2, color: '#7bb6ff', fontWeight: 700 }}>Speakers / Agenda / Guests</Typography>
            <List>
              {event.speakers.map((sp, idx) => (
                <ListItem key={idx} sx={{ color: '#e3e9f7' }}>{sp}</ListItem>
              ))}
            </List>
          </>
        )}
      </CardContent>
      {showRegisterButton && (
        <CardActions>
          <Button variant="contained" className="app-btn" sx={{ mt: 2, fontWeight: 700, borderRadius: 2 }} onClick={onRegister}>Register</Button>
        </CardActions>
      )}
    </Card>
  );
} 