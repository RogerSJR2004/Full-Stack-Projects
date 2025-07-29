import React, { useState, useEffect } from 'react';
import AdminEventList from '../../components/AdminEventList';
import UserTable from './admin/UserTable';
import EnrollTable from '../../components/EnrollTable';
import EventEditForm from './admin/EventEditForm';
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
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import '../../components/auth-dark.css';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

const API_BASE_URL = 'http://localhost:8080/ems/v1';

const FILTERS = [
  { label: 'Events', value: 'events', icon: <EventAvailableIcon sx={{ mr: 1 }} /> },
  { label: 'Users', value: 'users', icon: <GroupIcon sx={{ mr: 1 }} /> },
  { label: 'Enrollments', value: 'enrollments', icon: <HowToRegIcon sx={{ mr: 1 }} /> },
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
          
          <Typography variant="h6" component={RouterLink} to="/" sx={{ textDecoration: 'none', color: '#fff', fontWeight: 900, letterSpacing: 1.5, mr: 3 }}>
            Admin Panel
          </Typography>
        </Box>
        <Button component={RouterLink} to="/events" className="app-btn" sx={{ background: 'none !important', color: '#e3e9f7 !important', fontWeight: 700, px: 2, py: 1, fontSize: '1.08rem', '&:hover': { color: '#7bb6ff !important', background: '#232a36 !important' } }}>Events</Button>
        <Button component={RouterLink} to="/help" className="app-btn" sx={{ background: 'none !important', color: '#e3e9f7 !important', fontWeight: 700, px: 2, py: 1, fontSize: '1.08rem', '&:hover': { color: '#7bb6ff !important', background: '#232a36 !important' } }}>Help</Button>
        <Button component={RouterLink} to="/addevent" className="app-btn" sx={{ background: 'none !important', color: '#7bb6ff !important', fontWeight: 700, px: 2, py: 1, fontSize: '1.08rem', '&:hover': { color: '#fff !important', background: '#232a36 !important' } }}>Add</Button>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton onClick={handleMenu} color="inherit" size="large">
          <Avatar sx={{ bgcolor: '#7bb6ff' }}>
            
          </Avatar>
        </IconButton>
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem onClick={handleClose} component={RouterLink} to="/profile">Profile</MenuItem>
          <MenuItem onClick={() => { handleClose(); onLogout && onLogout(); }} component={RouterLink} to="/logout">Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default function AdminDashboard() {
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventForm, setShowEventForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('events');
  const [stats, setStats] = useState([0, 0, 0, 0]);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Dashboard stats
  const dashboardStats = [
    {
      title: 'Total Events',
      value: events.length,
      icon: <EventAvailableIcon sx={{ fontSize: 40, color: '#7bb6ff' }} />,
      color: '#7bb6ff',
      bgGradient: 'linear-gradient(135deg, rgba(123, 182, 255, 0.1) 0%, rgba(123, 182, 255, 0.05) 100%)'
    },
    {
      title: 'Total Users',
      value: users.length,
      icon: <PeopleIcon sx={{ fontSize: 40, color: '#4caf50' }} />,
      color: '#4caf50',
      bgGradient: 'linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(76, 175, 80, 0.05) 100%)'
    },
    {
      title: 'Total Enrollments',
      value: enrollments.length,
      icon: <HowToRegIcon sx={{ fontSize: 40, color: '#ff9800' }} />,
      color: '#ff9800',
      bgGradient: 'linear-gradient(135deg, rgba(255, 152, 0, 0.1) 0%, rgba(255, 152, 0, 0.05) 100%)'
    },
    {
      title: 'Active Events',
      value: events.filter(e => e.status === 1).length,
      icon: <CheckCircleIcon sx={{ fontSize: 40, color: '#9c27b0' }} />,
      color: '#9c27b0',
      bgGradient: 'linear-gradient(135deg, rgba(156, 39, 176, 0.1) 0%, rgba(156, 39, 176, 0.05) 100%)'
    }
  ];

  // Fetch all data on component mount
  useEffect(() => {
    fetchAllData();
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
  }, [events.length, users.length, enrollments.length]);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [eventsRes, usersRes] = await Promise.all([
        fetch(`${API_BASE_URL}/event/list`),
        fetch(`${API_BASE_URL}/user/list`)
      ]);

      if (!eventsRes.ok || !usersRes.ok) {
        throw new Error('Failed to fetch data');
      }

      const eventsData = await eventsRes.json();
      const usersData = await usersRes.json();

      setEvents(eventsData);
      setUsers(usersData.data || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load data. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const fetchEnrollmentsForEvent = async (eventId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/event/${eventId}/list`);
      if (!response.ok) {
        throw new Error('Failed to fetch enrollments');
      }
      const data = await response.json();
      setEnrollments(data.data || []);
    } catch (err) {
      console.error('Error fetching enrollments:', err);
      setError('Failed to load enrollments.');
    }
  };

  const fetchAllEnrollments = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/report/enroll/all`);
      if (!response.ok) {
        throw new Error('Failed to fetch all enrollments');
      }
      const data = await response.json();
      
      // If we have events data, enrich enrollments with event names
      if (events.length > 0) {
        const enrichedEnrollments = data.data.map(enrollment => {
          const event = events.find(e => e.id === enrollment.event_id);
          return {
            ...enrollment,
            event_name: event ? event.event_name : 'Unknown Event'
          };
        });
        setEnrollments(enrichedEnrollments);
      } else {
        setEnrollments(data.data || []);
      }
    } catch (err) {
      console.error('Error fetching all enrollments:', err);
      setError('Failed to load enrollments.');
    }
  };

  const handleEventClick = async (event) => {
    setSelectedEvent(event);
    await fetchEnrollmentsForEvent(event.id);
    setShowDetailsModal(true);
  };

  const handleUpdateUser = async (userId, updateData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/user/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update user');
      }

      const result = await response.json();
      await fetchAllData();
      alert('User updated successfully!');
      return result;
    } catch (err) {
      console.error('Error updating user:', err);
      alert(`Failed to update user: ${err.message}`);
      throw err;
    }
  };

  const handleUpdateEnrollment = async (eventId, enrollmentId, updateData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/event/${eventId}/enroll/${enrollmentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update enrollment');
      }

      const result = await response.json();
      
      // Refresh enrollments based on current view
      if (selectedEvent) {
        await fetchEnrollmentsForEvent(selectedEvent.id);
      } else if (activeTab === 'enrollments') {
        await fetchAllEnrollments();
      }
      
      alert('Enrollment updated successfully!');
      return result;
    } catch (err) {
      console.error('Error updating enrollment:', err);
      alert(`Failed to update enrollment: ${err.message}`);
      throw err;
    }
  };

  const handleUpdateEvent = async (eventId, updateData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/event/${eventId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        throw new Error('Failed to update event');
      }

      await fetchAllData();
      setShowEventForm(false);
      alert('Event updated successfully!');
    } catch (err) {
      console.error('Error updating event:', err);
      alert('Failed to update event. Please try again.');
    }
  };

  const handleAddEvent = async (eventData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/event/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        throw new Error('Failed to add event');
      }

      await fetchAllData();
      setShowEventForm(false);
      alert('Event added successfully!');
    } catch (err) {
      console.error('Error adding event:', err);
      alert('Failed to add event. Please try again.');
    }
  };

  if (loading) {
    return (
      <Box className="app-bg-root" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress size={60} sx={{ color: '#7bb6ff' }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box className="app-bg-root" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Card sx={{ p: 4, textAlign: 'center', maxWidth: 400 }}>
          <Typography variant="h6" color="error" sx={{ mb: 2 }}>{error}</Typography>
          <Button onClick={fetchAllData} variant="contained">Retry</Button>
        </Card>
      </Box>
    );
  }

  return (
    <Box className="app-bg-root" sx={{ minHeight: '100vh' }}>
      <Header />
      
      {/* Hero Section */}
      <Box sx={{
        position: 'relative',
        py: { xs: 8, md: 12 },
        px: { xs: 2, md: 4 },
        textAlign: 'center',
        background: 'linear-gradient(rgba(36,41,54,0.8), rgba(36,41,54,0.9)), url("https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80")',
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
          <Avatar sx={{ width: 80, height: 80, mx: 'auto', mb: 3, border: '3px solid #7bb6ff', boxShadow: '0 8px 32px rgba(123, 182, 255, 0.3)', bgcolor: '#7bb6ff' }}>
            <AdminPanelSettingsIcon sx={{ fontSize: 40 }} />
          </Avatar>
          <Typography variant="h2" sx={{ fontWeight: 900, color: '#fff', mb: 2, fontSize: { xs: '2.2rem', md: '3.2rem' } }}>
            Admin Dashboard
          </Typography>
          <Typography variant="h5" sx={{ color: '#7bb6ff', mb: 3, fontWeight: 600 }}>
            Manage your event management system
          </Typography>
          <Typography variant="body1" sx={{ color: '#b0b7c3', maxWidth: 600, mx: 'auto', mb: 4 }}>
            Monitor events, manage users, and track enrollments. Everything you need to run your event platform efficiently.
          </Typography>
        </Box>
      </Box>

      {/* Stats Cards */}
      <Box sx={{ 
        py: { xs: 4, md: 6 }, 
        px: { xs: 2, md: 4 }, 
        maxWidth: 1200, 
        mx: 'auto', 
        mb: 6,
        display: 'flex',
        justifyContent: 'center'
      }}>
        <Grid container spacing={3} sx={{ maxWidth: 1000, justifyContent: 'center' }}>
          {dashboardStats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={stat.title} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Card sx={{
                p: 4,
                textAlign: 'center',
                background: stat.bgGradient,
                backdropFilter: 'blur(10px)',
                border: `1px solid ${stat.color}20`,
                borderRadius: 3,
                transition: 'all 0.3s ease',
                width: '100%',
                maxWidth: 280,
                minHeight: 200,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: `0 20px 40px ${stat.color}15`,
                  borderColor: `${stat.color}40`
                }
              }}>
                <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
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
          Management Panel
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 5 }}>
          {FILTERS.map(tag => (
            <Chip
              key={tag.value}
              label={tag.label}
              icon={tag.icon}
              color={activeTab === tag.value ? 'primary' : 'default'}
              onClick={() => {
                setActiveTab(tag.value);
                if (tag.value === 'enrollments') {
                  fetchAllEnrollments();
                }
              }}
              clickable
              sx={{
                fontWeight: 700,
                fontSize: '1.1rem',
                px: 2.5,
                py: 1.5,
                borderRadius: 2,
                background: activeTab === tag.value ? '#7bb6ff' : 'rgba(36,41,54,0.92)',
                color: activeTab === tag.value ? '#232a36' : '#e3e9f7',
                border: activeTab === tag.value ? '2px solid #7bb6ff' : '2px solid #232a36',
                boxShadow: activeTab === tag.value ? '0 4px 16px rgba(123, 182, 255, 0.15)' : 'none',
                transition: 'all 0.2s',
                '&:hover': {
                  background: activeTab === tag.value ? '#7bb6ff' : 'rgba(36,41,54,0.95)',
                  transform: 'translateY(-2px)'
                }
              }}
            />
          ))}
        </Stack>
      </Box>

      {/* Content Section */}
      <Box sx={{ py: { xs: 4, md: 6 }, px: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto', mb: 6 }}>
        <Box sx={{ background: 'rgba(36,41,54,0.6)', borderRadius: 4, p: 4, backdropFilter: 'blur(10px)', border: '1px solid rgba(123, 182, 255, 0.1)' }}>
          
          {/* Events Tab */}
          {activeTab === 'events' && (
            <div>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" sx={{ color: '#7bb6ff', fontWeight: 700 }}>
                  Events Management
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => setShowEventForm(true)}
                  sx={{
                    background: '#7bb6ff',
                    color: '#232a36',
                    fontWeight: 700,
                    px: 3,
                    py: 1,
                    borderRadius: 2,
                    '&:hover': {
                      background: '#6ba5ef',
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  Add New Event
                </Button>
              </Box>
              <AdminEventList 
                events={events} 
                onEventClick={handleEventClick}
                onEditEvent={(event) => {
                  setSelectedEvent(event);
                  setShowEventForm(true);
                }}
                onViewEnrollments={async (event) => {
                  setSelectedEvent(event);
                  await fetchEnrollmentsForEvent(event.id);
                  setShowDetailsModal(true);
                }}
              />
            </div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div>
              <Typography variant="h4" sx={{ color: '#7bb6ff', fontWeight: 700, mb: 3 }}>
                Users Management
              </Typography>
              <UserTable 
                users={users} 
                onUpdateUser={handleUpdateUser}
                showAllUsers={true}
              />
            </div>
          )}

          {/* Enrollments Tab */}
          {activeTab === 'enrollments' && (
            <div>
              <Typography variant="h4" sx={{ color: '#7bb6ff', fontWeight: 700, mb: 3 }}>
                Enrollments Overview
              </Typography>
              <EnrollTable 
                enrollments={enrollments} 
                onUpdateEnrollment={handleUpdateEnrollment}
                eventId={selectedEvent?.id}
                showEventName={true}
              />
            </div>
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
          System Overview
        </Typography>
        <Typography variant="h6" sx={{ color: '#b0b7c3', mb: 4, maxWidth: 600, mx: 'auto', lineHeight: 1.6 }}>
          Your event management system is running smoothly. Monitor key metrics, manage content, and ensure everything operates at peak performance.
        </Typography>
        <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            onClick={() => setShowEventForm(true)}
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
            onClick={() => setActiveTab('users')}
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
            Manage Users
          </Button>
        </Box>
      </Box>

      {/* Event Details Modal */}
      <Dialog 
        open={showDetailsModal} 
        onClose={() => setShowDetailsModal(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            background: 'rgba(36, 41, 54, 0.95)',
            color: '#e3e9f7',
            borderRadius: 3,
            border: '1px solid rgba(123, 182, 255, 0.2)'
          }
        }}
      >
        <DialogTitle sx={{ color: '#7bb6ff', fontWeight: 700 }}>
          {selectedEvent?.event_name} - Details
        </DialogTitle>
        <DialogContent>
          {selectedEvent && (
            <Box>
              <Typography variant="h6" sx={{ color: '#7bb6ff', mb: 2 }}>
                Event Information
              </Typography>
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12} md={6}>
                  <Typography variant="body2" sx={{ color: '#b0b7c3' }}>Date:</Typography>
                  <Typography variant="body1" sx={{ color: '#e3e9f7' }}>
                    {selectedEvent.event_date ? new Date(selectedEvent.event_date).toLocaleDateString() : 'TBD'}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="body2" sx={{ color: '#b0b7c3' }}>Location:</Typography>
                  <Typography variant="body1" sx={{ color: '#e3e9f7' }}>
                    {selectedEvent.event_location || 'TBD'}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" sx={{ color: '#b0b7c3' }}>Description:</Typography>
                  <Typography variant="body1" sx={{ color: '#e3e9f7' }}>
                    {selectedEvent.event_description || 'No description available'}
                  </Typography>
                </Grid>
              </Grid>
              
              <Typography variant="h6" sx={{ color: '#7bb6ff', mb: 2 }}>
                Enrollments ({enrollments.length})
              </Typography>
              <EnrollTable 
                enrollments={enrollments} 
                onUpdateEnrollment={handleUpdateEnrollment}
                eventId={selectedEvent?.id}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowEventForm(true)} variant="contained" sx={{ background: '#7bb6ff', color: '#232a36' }}>
            Edit Event
          </Button>
          <Button onClick={() => setShowDetailsModal(false)} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Event Form Modal */}
      {showEventForm && (
        <EventEditForm
          event={selectedEvent}
          onSave={selectedEvent ? handleUpdateEvent : handleAddEvent}
          onCancel={() => setShowEventForm(false)}
        />
      )}
      
      <Footer />
    </Box>
  );
}
