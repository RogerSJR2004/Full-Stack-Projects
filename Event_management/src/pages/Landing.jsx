import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import '../components/Landing.css';
import Avatar from '@mui/material/Avatar';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const featuredEvents = [
  {
    title: 'Spring Gala 2025',
    date: 'April 20, 2025',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80',
    description: 'Join us for an unforgettable evening of music, food, and celebration at the annual Spring Gala!'
  },
  {
    title: 'Summer Festival 2025',
    date: 'July 15, 2025',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    description: 'Experience the vibrant energy of our Summer Festival with live music, food vendors, and family-friendly activities.'
  },
  {
    title: 'Fall Harvest Festival 2025',
    date: 'October 10, 2025',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80',
    description: 'Celebrate the harvest season with live music, local vendors, and a fun-filled day for the whole family.'
  },
];

const testimonials = [
  {
    name: 'Priya S.',
    text: 'EventManager made it so easy to find and join amazing events. Highly recommended!',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
  {
    name: 'Rahul D.',
    text: 'The best platform for discovering local happenings and meeting new people.',
    avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
  },
  {
    name: 'Aisha K.',
    text: 'I love how simple and intuitive the platform is. I never miss an event now!',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
  },
];

function Landing() {
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const handlePrev = () => {
    setTestimonialIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };
  const handleNext = () => {
    setTestimonialIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <Box className="landing-root">
      {/* Welcome Banner & Tagline */}
      <Box className="hero-section" sx={{ py: 10, px: 2, position: 'relative', textAlign: 'center', background: 'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)', borderRadius: 4, boxShadow: 6, mb: 6 }}>
        <Box className="hero-overlay" sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.15, background: 'url(https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80) center/cover no-repeat', zIndex: 0, borderRadius: 4 }} />
        <Typography variant="h2" className="hero-title" gutterBottom sx={{ color: '#1a237e', fontWeight: 900, letterSpacing: 2, zIndex: 1, position: 'relative' }}>
          Welcome to <span style={{ color: '#1976d2' }}>EventManager</span>
        </Typography>
        <Typography variant="h5" className="hero-subtitle" gutterBottom sx={{ color: '#263238', fontWeight: 500, zIndex: 1, position: 'relative', mb: 2 }}>
          Discover. Join. Celebrate.
        </Typography>
        <Typography variant="body1" sx={{ color: '#37474f', maxWidth: 600, mx: 'auto', mb: 4, zIndex: 1, position: 'relative' }}>
          Your one-stop platform to explore, register, and participate in the most exciting events around you. Join our vibrant community and never miss out on the fun!
        </Typography>
        <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', mt: 2, zIndex: 1, position: 'relative' }}>
          <Button component={Link} to="/events" variant="contained" color="primary" size="large" className="hero-cta">
            View Events
          </Button>
          <Button component={Link} to="/login" variant="outlined" color="primary" size="large" className="hero-cta">
            Login
          </Button>
        </Box>
      </Box>

      {/* Featured Upcoming Events */}
      <Box className="featured-event-section" sx={{ py: 6, px: 2, mb: 6 }}>
        <Typography variant="h4" align="center" sx={{ fontWeight: 700, color: 'primary.main', mb: 3 }}>
          Featured Upcoming Events
        </Typography>
        <Box className="featured-events-carousel" sx={{ display: 'flex', gap: 4, overflowX: 'auto', justifyContent: 'center', alignItems: 'stretch', pb: 2, px: 1, scrollSnapType: 'x mandatory' }}>
          {featuredEvents.map((event, idx) => (
            <Card key={idx} className="event-card" sx={{ minWidth: 320, maxWidth: 380, flex: '0 0 auto', boxShadow: 6, borderRadius: 4, overflow: 'hidden', position: 'relative', scrollSnapAlign: 'center', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="200"
                image={event.image}
                alt={event.title}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ p: 3, flexGrow: 1 }}>
                <Typography variant="h6" component="div" gutterBottom sx={{ fontWeight: 700 }}>
                  {event.title}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  {event.date}
                </Typography>
                <Typography variant="body2" color="text.primary">
                  {event.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      {/* Testimonials */}
      <Box className="testimonials-section" sx={{ py: 7, px: 2, background: 'linear-gradient(120deg, #e0eafc 0%, #cfdef3 100%)', borderRadius: 4, maxWidth: 1200, mx: 'auto', mb: 6, position: 'relative', overflow: 'hidden' }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ color: 'primary.main', fontWeight: 800, mb: 4, letterSpacing: 1 }}>
          What Our Users Say
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', minHeight: 350 }}>
          <IconButton onClick={handlePrev} className="testimonial-nav-btn" sx={{ position: 'absolute', left: 0, zIndex: 2, background: '#fff', boxShadow: 2, ':hover': { background: '#e3f2fd' } }}>
            <ArrowBackIosNewIcon color="primary" />
          </IconButton>
          <Box className="testimonial-card" sx={{ minWidth: 340, maxWidth: 380, flex: '0 0 auto', p: 4, borderRadius: 4, boxShadow: 3, background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', mx: 1, mb: 2, transition: 'box-shadow 0.3s, transform 0.3s', animation: 'slideInTestimonial 0.7s ease' }}>
            <FormatQuoteIcon sx={{ fontSize: 40, color: '#90caf9', position: 'absolute', top: 18, left: 18, opacity: 0.25 }} />
            <Avatar src={testimonials[testimonialIndex].avatar} alt={testimonials[testimonialIndex].name} sx={{ width: 64, height: 64, mb: 2, border: '3px solid #e3f2fd', boxShadow: 1 }} />
            <Typography variant="body1" gutterBottom sx={{ fontStyle: 'italic', color: '#263238', fontSize: '1.15rem', textAlign: 'center', mb: 2 }}>
              "{testimonials[testimonialIndex].text}"
            </Typography>
            <Typography variant="subtitle2" color="primary" sx={{ fontWeight: 700, mt: 1, textAlign: 'center' }}>- {testimonials[testimonialIndex].name}</Typography>
          </Box>
          <IconButton onClick={handleNext} className="testimonial-nav-btn" sx={{ position: 'absolute', right: 0, zIndex: 2, background: '#fff', boxShadow: 2, ':hover': { background: '#e3f2fd' } }}>
            <ArrowForwardIosIcon color="primary" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}

export default Landing;
