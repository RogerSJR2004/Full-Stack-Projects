import React, { useState, useEffect } from 'react';
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
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import '../../components/auth-dark.css';

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
    <AppBar position="static" className="app-navbar" sx={{ backdropFilter: 'blur(12px)', borderRadius: '0 0 1.5rem 1.5rem', boxShadow: '0 4px 24px rgba(44,62,80,0.18)' }}>
      <Toolbar sx={{ minHeight: 72, px: { xs: 1, md: 4 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <EventAvailableIcon sx={{ color: '#7bb6ff', fontSize: 32, mr: 1 }} />
          <Typography variant="h6" component={RouterLink} to="/" sx={{ textDecoration: 'none', color: '#fff', fontWeight: 900, letterSpacing: 1.5, mr: 3 }}>
            EventManager
          </Typography>
        </Box>
        <Button component={RouterLink} to="/events" className="app-btn" sx={{ background: 'none !important', color: '#e3e9f7 !important', fontWeight: 700, px: 2, py: 1, fontSize: '1.08rem', '&:hover': { color: '#7bb6ff !important', background: '#232a36 !important' } }}>Events</Button>
        <Button component={RouterLink} to="/help" className="app-btn" sx={{ background: 'none !important', color: '#e3e9f7 !important', fontWeight: 700, px: 2, py: 1, fontSize: '1.08rem', '&:hover': { color: '#7bb6ff !important', background: '#232a36 !important' } }}>Help</Button>
        <Button component={RouterLink} to="/addevent" className="app-btn" sx={{ background: 'none !important', color: '#7bb6ff !important', fontWeight: 700, px: 2, py: 1, fontSize: '1.08rem', '&:hover': { color: '#fff !important', background: '#232a36 !important' } }}>Add</Button>
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
    <Box className="app-bg-root" sx={{ minHeight: '100vh' }}>
      <Header />
      {/* Hero Section */}
      <Box className="app-glass-section" sx={{ py: 4, textAlign: 'center', bgcolor: 'transparent', maxWidth: 900, mx: 'auto', mt: 4, mb: 3 }}>
        <Typography variant="h4" className="app-title" gutterBottom>
          Welcome, {userName}!
        </Typography>
        <Typography variant="subtitle1" className="app-subtitle">Manage and explore your events easily.</Typography>
      </Box>
      {/* Filter Section */}
      <Box className="app-glass-section" sx={{ maxWidth: 900, mx: 'auto', mb: 3, py: 2 }}>
        <Stack direction="row" spacing={2} justifyContent="center" sx={{ my: 2 }}>
          {FILTERS.map(tag => (
            <Chip
              key={tag.value}
              label={tag.label}
              color={filter === tag.value ? 'primary' : 'default'}
              onClick={() => setFilter(tag.value)}
              clickable
              sx={{ fontWeight: 700, fontSize: 16, px: 2, py: 1, borderRadius: 2, background: filter === tag.value ? '#7bb6ff' : 'rgba(36,41,54,0.92)', color: filter === tag.value ? '#232a36' : '#e3e9f7', border: filter === tag.value ? '2px solid #7bb6ff' : '2px solid #232a36' }}
            />
          ))}
        </Stack>
      </Box>
      {/* Events Section */}
      <Box className="app-glass-section" sx={{ maxWidth: 900, mx: 'auto', px: 2, pb: 4 }}>
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
