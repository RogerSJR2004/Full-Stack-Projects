import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

export default function EventDetails({ event, onRegister, showRegisterButton }) {
  if (!event) return <div>No event selected.</div>;
  const imageUrl = event.image || event.imageUrl || '/static/images/cards/contemplative-reptile.jpg';
  return (
    <Card sx={{ maxWidth: 500, mx: 'auto', my: 2 }}>
      <CardMedia
        component="img"
        height="220"
        image={imageUrl}
        alt={event.name || event.title || 'Event image'}
      />
      <CardContent>
        <Typography gutterBottom variant="h4" component="div">
          {event.name || event.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {(event.date || event.time || event.location) && (
            <>
              {event.date} {event.time && `| ${event.time}`} {event.location && `| ${event.location}`}
            </>
          )}
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>{event.description}</Typography>
        {event.speakers && (
          <>
            <Typography variant="h6" sx={{ mt: 2 }}>Speakers / Agenda / Guests</Typography>
            <List>
              {event.speakers.map((sp, idx) => (
                <ListItem key={idx}>{sp}</ListItem>
              ))}
            </List>
          </>
        )}
      </CardContent>
      {showRegisterButton && (
        <CardActions>
          <Button variant="contained" sx={{ mt: 2 }} onClick={onRegister}>Register</Button>
        </CardActions>
      )}
    </Card>
  );
} 