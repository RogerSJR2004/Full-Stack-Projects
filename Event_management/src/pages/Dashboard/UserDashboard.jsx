import React, { useState } from 'react';
import EventList from '../../components/EventList';
import EventDetails from '../../components/EventDetails';
import '../../components/Dashboard.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { Link as RouterLink } from 'react-router-dom';
import Footer from '../../components/Footer'; 


import { useEffect } from 'react';

const FILTERS = [
  { label: 'My Events', value: 'my' },
  { label: 'Upcoming', value: 'upcoming' },
  { label: 'Past', value: 'past' },
];

function Header({ onLogout }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: 1, mr: 3 }}>
          EventManager
        </Typography>
        <Button color="inherit" component={RouterLink} to="/events">Events</Button>
        <Button color="inherit" component={RouterLink} to="/help">Help</Button>
        <Button color="inherit" component={RouterLink} to="/logout">Logout</Button>
        <Button color="inherit" component={RouterLink} to="/addevent">Add</Button>
  
        <Box sx={{ flexGrow: 1 }} />
        <IconButton onClick={handleMenu} color="inherit" size="large">
          <Avatar />
        </IconButton>
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem onClick={handleClose} component={RouterLink} to="/profile">Profile</MenuItem>
          <MenuItem onClick={() => { handleClose(); onLogout && onLogout(); }} component={RouterLink} to="/logout">Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

// If logout cliked it need to redirected to home page



export default function UserDashboard() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showRegister, setShowRegister] = useState(false);
  const [filter, setFilter] = useState('my');
  const [events, setEvents] = useState([]);
  const userName = 'User'; // Replace with actual user name from context/auth

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:8080/ems/v1/event/list');
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
        setEvents([]);
      }
    };
    fetchEvents();
  }, []);

  const handleEventClick = event => {
    setSelectedEvent(event);
    setShowRegister(false);
  };

  const handleRegister = () => {
    setShowRegister(true);
  };

  const closeDetails = () => {
    setSelectedEvent(null);
    setShowRegister(false);
  };

  let filteredEvents = events;
  if (filter === 'my') {
    filteredEvents = events.filter(e => e.owner === 'me');
  } else if (filter === 'upcoming') {
    filteredEvents = events.filter(e => e.status === 'upcoming');
  } else if (filter === 'past') {
    filteredEvents = events.filter(e => e.status === 'past');
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f4f6fa' }}>
      <Header />
      {/* Hero Section */}
      <Box sx={{ py: 4, textAlign: 'center', bgcolor: 'transparent' }}>
        <Typography variant="h4" fontWeight={600} gutterBottom>
          Welcome, {userName}!
        </Typography>
        <Typography variant="subtitle1">Manage and explore your events easily.</Typography>
      </Box>
      {/* Filter Section */}
      <Stack direction="row" spacing={2} justifyContent="center" sx={{ my: 2 }}>
        {FILTERS.map(tag => (
          <Chip
            key={tag.value}
            label={tag.label}
            color={filter === tag.value ? 'primary' : 'default'}
            onClick={() => setFilter(tag.value)}
            clickable
            sx={{ fontWeight: 600, fontSize: 16, px: 2, py: 1 }}
          />
        ))}
      </Stack>
      {/* Events Section */}
      <Box sx={{ maxWidth: 800, mx: 'auto', px: 2, pb: 4 }}>
        <EventList events={filteredEvents} onEventClick={handleEventClick} />
      </Box>
      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="event-details-modal">
          <button className="close-btn" onClick={closeDetails}>X</button>
          <EventDetails event={selectedEvent} onRegister={handleRegister} showRegisterButton={!showRegister} />
          {showRegister && <RegisterForm onSubmit={() => setShowRegister(false)} />}
        </div>
      )}
      <Footer />
    </Box>
  );
}
