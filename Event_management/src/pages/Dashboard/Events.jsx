import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import EventList from '../../components/EventList';
import '../../components/Event.css';
import '../../components/auth-dark.css';

const EVENTS_API = 'http://localhost:8080/ems/v1/event/list'; // need to enhance this page entirely add card componeent instead of box, also change the button to enroll button -> this register the event for the users

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [location, setLocation] = useState('all');

  useEffect(() => {
    fetch(EVENTS_API)
      .then((res) => res.json())
      .then((data) => {
        setEvents(Array.isArray(data) ? data : data.events || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Helper to parse and categorize events
  const now = new Date();
  const parseDate = (dateStr) => new Date(dateStr);
  const isUpcoming = (event) => parseDate(event.event_date) >= now && (event.status === 1 || event.status === 'active');
  const isPast = (event) => parseDate(event.event_date) < now || event.status === 0 || event.status === 'completed';

  // Filtered and categorized events
  let filteredEvents = events.filter(e => {
    const matchesSearch =
      e.event_name?.toLowerCase().includes(search.toLowerCase()) ||
      e.event_description?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'all' || e.category === category;
    const matchesLocation = location === 'all' || e.event_location === location;
    return matchesSearch && matchesCategory && matchesLocation;
  });

  const upcoming = filteredEvents.filter(isUpcoming);
  const past = filteredEvents.filter(isPast);

  // Unique categories and locations for filter dropdowns
  const categories = Array.from(new Set(events.map(e => e.category).filter(Boolean)));
  const locations = Array.from(new Set(events.map(e => e.event_location).filter(Boolean)));

  return (
    <Box className="app-bg-root" sx={{ minHeight: '100vh', pb: 8 }}>
      {/* Hero Section */}
      <Box sx={{ py: { xs: 6, md: 8 }, px: { xs: 2, md: 4 }, textAlign: 'center', mb: 4 }}>
        <Typography variant="h2" className="app-title" sx={{ fontWeight: 900, color: '#7bb6ff', mb: 2 }}>
          Discover Events
        </Typography>
        <Typography variant="h6" className="app-subtitle" sx={{ color: '#b0b7c3', maxWidth: 600, mx: 'auto', mb: 2 }}>
          Find amazing events happening around you. From tech conferences to music festivals, there's something for everyone.
        </Typography>
      </Box>
      {/* Search & Filter Bar */}
      <Box sx={{ maxWidth: 900, mx: 'auto', mb: 5, display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center', background: 'rgba(36,41,54,0.92)', borderRadius: 3, p: 2, boxShadow: 2 }}>
        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ flex: 2, minWidth: 180, padding: '0.7em 1em', borderRadius: 8, border: '1px solid #232a36', background: '#232a36', color: '#e3e9f7', fontSize: 16 }}
        />
        <select value={category} onChange={e => setCategory(e.target.value)} style={{ flex: 1, minWidth: 120, padding: '0.7em 1em', borderRadius: 8, border: '1px solid #232a36', background: '#232a36', color: '#e3e9f7', fontSize: 16 }}>
          <option value="all">All Categories</option>
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
        <select value={location} onChange={e => setLocation(e.target.value)} style={{ flex: 1, minWidth: 120, padding: '0.7em 1em', borderRadius: 8, border: '1px solid #232a36', background: '#232a36', color: '#e3e9f7', fontSize: 16 }}>
          <option value="all">All Locations</option>
          {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
        </select>
      </Box>
      {/* Upcoming Events Section */}
      <Box sx={{ maxWidth: 1200, mx: 'auto', mb: 6 }}>
        <Typography variant="h5" className="app-section-title" sx={{ color: '#fff', mb: 2, textAlign: 'left' }}>
          <span role="img" aria-label="upcoming"></span> Upcoming Events <span style={{ color: '#7bb6ff' }}>({upcoming.length})</span>
        </Typography>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
            <CircularProgress color="primary" />
          </Box>
        ) : (
          <EventList events={upcoming} onEventClick={() => {}} />
        )}
      </Box>
      {/* Past Events Section */}
      <Box sx={{ maxWidth: 1200, mx: 'auto', mb: 8 }}>
        <Typography variant="h5" className="app-section-title" sx={{ color: '#fff', mb: 2, textAlign: 'left' }}>
          <span role="img" aria-label="past"></span> Past Events <span style={{ color: '#7bb6ff' }}>({past.length})</span>
        </Typography>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
            <CircularProgress color="primary" />
          </Box>
        ) : (
          <EventList events={past} onEventClick={() => {}} />
        )}
      </Box>
    </Box>
  );
}

export default Events;
