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
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import { Link as RouterLink } from 'react-router-dom';
import Footer from '../../components/Footer';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import PeopleIcon from '@mui/icons-material/People';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import '../../components/auth-dark.css';
import CircularProgress from '@mui/material/CircularProgress';

const FILTERS = [
  { label: 'My Events', value: 'my', icon: <EventAvailableIcon sx={{ mr: 1 }} /> },
  { label: 'Available', value: 'available', icon: <CalendarTodayIcon sx={{ mr: 1 }} /> },
  { label: 'Past Events', value: 'past', icon: <CheckCircleIcon sx={{ mr: 1 }} /> },
];

// Stats section is based on the user id and the events that are registered by the user -> update this section

// My events la based on user id it show and for available section it show only current date and future date events, past events is all the events that are completed

// Dummy data for dashboard stats
const dashboardStats = [
  {
    title: 'Requested Events',
    value: 1,
    icon: <EventAvailableIcon sx={{ fontSize: 40, color: '#7bb6ff' }} />,
    color: '#7bb6ff',
    bgGradient: 'linear-gradient(135deg, rgba(123, 182, 255, 0.1) 0%, rgba(123, 182, 255, 0.05) 100%)'
  },
  {
    title: 'Events Attended',
    value: 1,
    icon: <PeopleIcon sx={{ fontSize: 40, color: '#4caf50' }} />,
    color: '#4caf50',
    bgGradient: 'linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(76, 175, 80, 0.05) 100%)'
  },
  {
    title: 'Available Events',
    value: 10,
    icon: <CalendarTodayIcon sx={{ fontSize: 40, color: '#ff9800' }} />,
    color: '#ff9800',
    bgGradient: 'linear-gradient(135deg, rgba(255, 152, 0, 0.1) 0%, rgba(255, 152, 0, 0.05) 100%)'
  }
];

// Helper functions to segregate events into available (upcoming) and past
function parseDate(dateStr) {
  return new Date(dateStr);
}

// Fetch events from API and filter available (upcoming) events
async function fetchAvailableEvents() {
  try {
    const response = await fetch('http://localhost:8080/ems/v1/event/list');
    if (!response.ok) {
      throw new Error('Failed to fetch events');
    }
    const data = await response.json();
    // Filter for available events: status 1 or 'active', and event_date >= today
    const now = new Date();
    const availableEvents = (Array.isArray(data) ? data : data.events || []).filter(event => {
      const eventDate = new Date(event.event_date);
      return (
        (event.status === 1 || event.status === 'active') &&
        eventDate >= now
      );
    });
    return availableEvents;
  } catch (error) {
    console.error('Error fetching available events:', error);
    return [];
  }
}

function isPastEvent(event) {
  // status 0 or 'completed', or event_date < today
  const now = new Date();
  const eventDate = parseDate(event.event_date);
  return (
    eventDate < now ||
    event.status === 0 ||
    event.status === 'completed'
  );
}

export default function UserDashboard() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showRegister, setShowRegister] = useState(false);
  const [filter, setFilter] = useState('my');
  const [events, setEvents] = useState([]);
  const [stats, setStats] = useState(dashboardStats.map(() => 0));
  const [myEvents, setMyEvents] = useState([]);
  const [loadingMyEvents, setLoadingMyEvents] = useState(false);
  const userEmail = 'jeevin@gmail.com'; // TODO: Replace with actual logged-in user's email
  const userName = 'Roger'; // Need to replace with actual user name from auth

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

  // Animate stats
  useEffect(() => {
    const intervals = dashboardStats.map((stat, i) =>
      setInterval(() => {
        setStats(prev => {
          const next = [...prev];
          if (next[i] < stat.value) next[i] += Math.ceil(stat.value / 40);
          if (next[i] > stat.value) next[i] = stat.value;
          return next;
        });
      }, 30)
    );
    return () => intervals.forEach(clearInterval);
  }, []);

  useEffect(() => {
    const fetchMyEvents = async () => {
      setLoadingMyEvents(true);
      const myEnrolledEvents = [];
      for (const event of events) {
        try {
          const enrollRes = await fetch(`http://localhost:8080/ems/v1/event/${event.id}/list`);
          const enrollData = await enrollRes.json();
          if (Array.isArray(enrollData.data) && enrollData.data.some(enroll => enroll.email_address === userEmail)) {
            myEnrolledEvents.push(event);
          }
        } catch (e) {
          // Ignore errors for individual events
        }
      }
      setMyEvents(myEnrolledEvents);
      setLoadingMyEvents(false);
    };
    fetchMyEvents();
  }, [events, userEmail]);

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
    filteredEvents = myEvents;
  } else if (filter === 'available') {
    const now = new Date();
    filteredEvents = events.filter(e => {
      const eventDate = new Date(e.event_date);
      return (eventDate >= now && (e.status === 1 || e.status === 'active'));
    });
  } else if (filter === 'past') {
    const now = new Date();
    filteredEvents = events.filter(e => {
      const eventDate = new Date(e.event_date);
      return (eventDate < now || e.status === 0 || e.status === 'completed');
    });
  }

  return (
    <Box className="app-bg-root" sx={{ minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box sx={{
        position: 'relative',
        py: { xs: 8, md: 12 },
        px: { xs: 2, md: 4 },
        textAlign: 'center',
        background: 'linear-gradient(rgba(36,41,54,0.8), rgba(36,41,54,0.9)), url("https://images.unsplash.com/photo-1501281668785-207828eb24e3?auto=format&fit=crop&w=1200&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '0 0 2rem 2rem',
        mb: 6,
        overflow: 'hidden'
      }}>
        {/* Background decoration */}
        <Box sx={{
          position: 'absolute',
          top: -50,
          right: -50,
          width: 200,
          height: 200,
          background: 'radial-gradient(circle, rgba(123, 182, 255, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          zIndex: 0
        }} />
        <Box sx={{
          position: 'absolute',
          bottom: -30,
          left: -30,
          width: 150,
          height: 150,
          background: 'radial-gradient(circle, rgba(123, 182, 255, 0.08) 0%, transparent 70%)',
          borderRadius: '50%',
          zIndex: 0
        }} />
        
        <Box sx={{ position: 'relative', zIndex: 1, maxWidth: 1200, mx: 'auto' }}>
          <Avatar sx={{ width: 80, height: 80, mx: 'auto', mb: 3, border: '3px solid #7bb6ff', boxShadow: '0 8px 32px rgba(123, 182, 255, 0.3)' }}>
            {userName.charAt(0)}
          </Avatar>
          <Typography variant="h2" sx={{ fontWeight: 900, color: '#fff', mb: 2, fontSize: { xs: '2.2rem', md: '3.2rem' } }}>
            Welcome back, {userName}!
          </Typography>
          <Typography variant="h5" sx={{ color: '#7bb6ff', mb: 3, fontWeight: 600 }}>
            Ready to discover your next adventure?
          </Typography>
          <Typography variant="body1" sx={{ color: '#b0b7c3', maxWidth: 600, mx: 'auto', mb: 4 }}>
            Your dashboard is your command center for all things events. Track your activities, discover new opportunities, and stay connected with your community.
          </Typography>
        </Box>
      </Box>

      {/* Stats Cards */}
      <Box sx={{ py: { xs: 4, md: 6 }, px: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto', mb: 6 }}>
        <Grid container spacing={3}>
          {dashboardStats.map((stat, index) => (
            <Grid item xs={12} sm={4} key={stat.title}>
              <Card sx={{
                p: 4,
                textAlign: 'center',
                background: stat.bgGradient,
                backdropFilter: 'blur(10px)',
                border: `1px solid ${stat.color}20`,
                borderRadius: 3,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: `0 20px 40px ${stat.color}15`,
                  borderColor: `${stat.color}40`
                }
              }}>
                <Box sx={{ mb: 2 }}>
                  {stat.icon}
                </Box>
                <Typography variant="h3" sx={{ color: stat.color, fontWeight: 900, mb: 1 }}>
                  {stats[index]}
                </Typography>
                <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700 }}>
                  {stat.title}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Filter Section */}
      <Box sx={{ py: { xs: 4, md: 6 }, px: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto', mb: 6 }}>
        <Typography variant="h3" sx={{ textAlign: 'center', fontWeight: 700, color: '#fff', mb: 4, fontSize: { xs: '2rem', md: '2.5rem' } }}>
          Your Events
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 5 }}>
          {FILTERS.map(tag => (
            <Chip
              key={tag.value}
              label={tag.label}
              icon={tag.icon}
              color={filter === tag.value ? 'primary' : 'default'}
              onClick={() => setFilter(tag.value)}
              clickable
              sx={{
                fontWeight: 700,
                fontSize: '1.1rem',
                px: 2.5,
                py: 1.5,
                borderRadius: 2,
                background: filter === tag.value ? '#7bb6ff' : 'rgba(36,41,54,0.92)',
                color: filter === tag.value ? '#232a36' : '#e3e9f7',
                border: filter === tag.value ? '2px solid #7bb6ff' : '2px solid #232a36',
                boxShadow: filter === tag.value ? '0 4px 16px rgba(123, 182, 255, 0.15)' : 'none',
                transition: 'all 0.2s',
                '&:hover': {
                  background: filter === tag.value ? '#7bb6ff' : 'rgba(36,41,54,0.95)',
                  transform: 'translateY(-2px)'
                }
              }}
            />
          ))}
        </Stack>
      </Box>

      {/* Events Section */}
      <Box sx={{ py: { xs: 4, md: 6 }, px: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto', mb: 6 }}>
        <Box sx={{ background: 'rgba(36,41,54,0.6)', borderRadius: 4, p: 4, backdropFilter: 'blur(10px)', border: '1px solid rgba(123, 182, 255, 0.1)' }}>
          {filter === 'my' && loadingMyEvents ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
              <CircularProgress color="primary" />
            </Box>
          ) : (
            <EventList events={filteredEvents} onEventClick={handleEventClick} />
          )}
        </Box>
      </Box>

      {/* CTA Section */}
      <Box sx={{
        py: { xs: 6, md: 8 },
        px: { xs: 2, md: 4 },
        textAlign: 'center',
        background: 'linear-gradient(135deg, rgba(123, 182, 255, 0.1) 0%, rgba(224, 231, 255, 0.05) 100%)',
        borderRadius: 4,
        maxWidth: 1200,
        mx: 'auto',
        mb: 6,
        boxShadow: 2
      }}>
        <Typography variant="h3" sx={{ fontWeight: 700, color: '#fff', mb: 3, fontSize: { xs: '2rem', md: '2.5rem' } }}>
          Ready to Create Something Amazing?
        </Typography>
        <Typography variant="h6" sx={{ color: '#b0b7c3', mb: 4, maxWidth: 600, mx: 'auto', lineHeight: 1.6 }}>
          Host your own event and bring people together. Share your passion, knowledge, or simply create a space for connection.
        </Typography>
        <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            component={RouterLink}
            to="/addevent"
            variant="contained"
            size="large"
            sx={{
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: 700,
              borderRadius: 3,
              background: '#7bb6ff',
              color: '#232a36',
              boxShadow: '0 8px 32px rgba(123, 182, 255, 0.3)',
              '&:hover': {
                background: '#6ba5ef',
                boxShadow: '0 12px 40px rgba(123, 182, 255, 0.4)',
                transform: 'translateY(-2px)'
              }
            }}
          >
            Create Event
          </Button>
          <Button
            component={RouterLink}
            to="/events"
            variant="outlined"
            size="large"
            sx={{
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: 700,
              borderRadius: 3,
              borderWidth: 2,
              borderColor: '#7bb6ff',
              color: '#7bb6ff',
              '&:hover': {
                borderColor: '#7bb6ff',
                background: 'rgba(123, 182, 255, 0.1)',
                transform: 'translateY(-2px)'
              }
            }}
          >
            Explore More
          </Button>
        </Box>
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
