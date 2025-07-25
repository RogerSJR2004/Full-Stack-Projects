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
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import PeopleIcon from '@mui/icons-material/People';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import '../components/auth-dark.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const featuredEvents = [
  {
    title: 'Spring Gala 2025',
    date: 'April 20, 2025',
    time: '7:00 PM',
    location: 'Grand Ballroom, Downtown',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80',
    description: 'Join us for an unforgettable evening of music, food, and celebration at the annual Spring Gala!',
    attendees: '150+ attending'
  },
  {
    title: 'Summer Festival 2025',
    date: 'July 15, 2025',
    time: '2:00 PM',
    location: 'Central Park',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    description: 'Experience the vibrant energy of our Summer Festival with live music, food vendors, and family-friendly activities.',
    attendees: '500+ attending'
  },
  {
    title: 'Fall Harvest Festival 2025',
    date: 'October 10, 2025',
    time: '11:00 AM',
    location: 'Community Gardens',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80',
    description: 'Celebrate the harvest season with live music, local vendors, and a fun-filled day for the whole family.',
    attendees: '300+ attending'
  },
];

const testimonials = [
  {
    name: 'Priya S.',
    role: 'Event Organizer',
    text: 'EventManager made it so easy to find and join amazing events. The platform is intuitive and the community is vibrant. Highly recommended!',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
  {
    name: 'Rahul D.',
    role: 'Tech Enthusiast',
    text: 'The best platform for discovering local happenings and meeting new people. I\'ve attended over 20 events this year alone!',
    avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
  },
  {
    name: 'Aisha K.',
    role: 'Community Leader',
    text: 'I love how simple and intuitive the platform is. The event discovery features are amazing and I never miss an event now!',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
  },
];

const features = [
  {
    icon: <EventAvailableIcon sx={{ fontSize: 40, color: '#7bb6ff' }} />,
    title: 'Discover Events',
    description: 'Browse through thousands of events happening in your area'
  },
  {
    icon: <PeopleIcon sx={{ fontSize: 40, color: '#7bb6ff' }} />,
    title: 'Connect & Network',
    description: 'Meet like-minded people and build meaningful connections'
  },
  {
    icon: <LocationOnIcon sx={{ fontSize: 40, color: '#7bb6ff' }} />,
    title: 'Local & Global',
    description: 'Find events both in your neighborhood and around the world'
  }
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
    <Box className="app-bg-root" sx={{ minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box 
        sx={{ 
          background: 'linear-gradient(135deg, rgba(123, 182, 255, 0.1) 0%, rgba(224, 231, 255, 0.05) 100%)',
          py: { xs: 8, md: 12 },
          px: { xs: 2, md: 4 },
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Background decoration */}
        <Box 
          sx={{ 
            position: 'absolute',
            top: -50,
            right: -50,
            width: 200,
            height: 200,
            background: 'radial-gradient(circle, rgba(123, 182, 255, 0.1) 0%, transparent 70%)',
            borderRadius: '50%',
            zIndex: 0
          }}
        />
        <Box 
          sx={{ 
            position: 'absolute',
            bottom: -30,
            left: -30,
            width: 150,
            height: 150,
            background: 'radial-gradient(circle, rgba(123, 182, 255, 0.08) 0%, transparent 70%)',
            borderRadius: '50%',
            zIndex: 0
          }}
        />
        
        <Box sx={{ position: 'relative', zIndex: 1, maxWidth: 1200, mx: 'auto' }}>
          <EventAvailableIcon sx={{ fontSize: 80, color: '#7bb6ff', mb: 3 }} />
          <Typography 
            variant="h1" 
            sx={{ 
              fontWeight: 900, 
              fontSize: { xs: '2.5rem', md: '4rem' },
              color: '#fff',
              mb: 2,
              background: 'linear-gradient(45deg, #fff 30%, #7bb6ff 90%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Welcome to EventManager
          </Typography>
          <Typography 
            variant="h4" 
            sx={{ 
              color: '#7bb6ff', 
              fontWeight: 600, 
              mb: 3,
              fontSize: { xs: '1.5rem', md: '2rem' }
            }}
          >
            Discover. Join. Celebrate.
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              color: '#b0b7c3', 
              maxWidth: 800, 
              mx: 'auto', 
              mb: 6,
              lineHeight: 1.6,
              fontSize: { xs: '1rem', md: '1.25rem' }
            }}
          >
            Your one-stop platform to explore, register, and participate in the most exciting events around you. 
            Join our vibrant community and never miss out on the fun!
          </Typography>
          <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button 
              component={Link} 
              to="/events" 
              variant="contained" 
              className="app-btn" 
              size="large"
              sx={{ 
                px: 4, 
                py: 1.5, 
                fontSize: '1.1rem',
                fontWeight: 700,
                borderRadius: 3,
                boxShadow: '0 8px 32px rgba(123, 182, 255, 0.3)',
                '&:hover': {
                  boxShadow: '0 12px 40px rgba(123, 182, 255, 0.4)',
                  transform: 'translateY(-2px)'
                }
              }}
            >
              Explore Events
            </Button>
            <Button 
              component={Link} 
              to="/login" 
              variant="outlined" 
              className="app-btn-outline" 
              size="large"
              sx={{ 
                px: 4, 
                py: 1.5, 
                fontSize: '1.1rem',
                fontWeight: 700,
                borderRadius: 3,
                borderWidth: 2,
                '&:hover': {
                  borderWidth: 2,
                  transform: 'translateY(-2px)'
                }
              }}
            >
              Get Started
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: { xs: 6, md: 8 }, px: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto' }}>
        <Typography 
          variant="h3" 
          sx={{ 
            textAlign: 'center', 
            fontWeight: 700, 
            color: '#fff',
            mb: 6,
            fontSize: { xs: '2rem', md: '2.5rem' }
          }}
        >
          Why Choose EventManager?
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card 
                sx={{ 
                  p: 4, 
                  textAlign: 'center', 
                  background: 'rgba(36,41,54,0.6)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(123, 182, 255, 0.1)',
                  borderRadius: 3,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 20px 40px rgba(123, 182, 255, 0.15)',
                    borderColor: 'rgba(123, 182, 255, 0.3)'
                  }
                }}
              >
                <Box sx={{ mb: 2 }}>
                  {feature.icon}
                </Box>
                <Typography variant="h5" sx={{ fontWeight: 700, color: '#fff', mb: 2 }}>
                  {feature.title}
                </Typography>
                <Typography variant="body1" sx={{ color: '#b0b7c3', lineHeight: 1.6 }}>
                  {feature.description}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Featured Events Section */}
      <Box sx={{ py: { xs: 6, md: 8 }, px: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto' }}>
        <Typography 
          variant="h3" 
          sx={{ 
            textAlign: 'center', 
            fontWeight: 700, 
            color: '#fff',
            mb: 6,
            fontSize: { xs: '2rem', md: '2.5rem' }
          }}
        >
          Featured Upcoming Events
        </Typography>
        <Box sx={{ maxWidth: 1100, mx: 'auto', position: 'relative' }}>
          <Swiper
            modules={[Pagination]}
            spaceBetween={24}
            slidesPerView={1.1}
            breakpoints={{
              600: { slidesPerView: 1.5 },
              900: { slidesPerView: 2.2 },
              1200: { slidesPerView: 3 },
            }}
            pagination={{ clickable: true }}
            style={{ paddingBottom: 40 }}
          >
            {featuredEvents.map((event, idx) => (
              <SwiperSlide key={idx}>
                <Card 
                  sx={{ 
                    height: '100%',
                    borderRadius: 3,
                    overflow: 'hidden',
                    background: 'rgba(36,41,54,0.6)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(123, 182, 255, 0.1)',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 8px 32px rgba(123, 182, 255, 0.10)',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 20px 40px rgba(123, 182, 255, 0.15)',
                      borderColor: 'rgba(123, 182, 255, 0.3)'
                    }
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={event.image}
                    alt={event.title}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#fff', mb: 2 }}>
                      {event.title}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <AccessTimeIcon sx={{ fontSize: 16, color: '#7bb6ff', mr: 1 }} />
                      <Typography variant="body2" sx={{ color: '#7bb6ff', fontWeight: 600 }}>
                        {event.date} • {event.time}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <LocationOnIcon sx={{ fontSize: 16, color: '#7bb6ff', mr: 1 }} />
                      <Typography variant="body2" sx={{ color: '#7bb6ff' }}>
                        {event.location}
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: '#b0b7c3', mb: 2, flexGrow: 1 }}>
                      {event.description}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Typography variant="caption" sx={{ color: '#7bb6ff', fontWeight: 600 }}>
                        {event.attendees}
                      </Typography>
                      <Button 
                        variant="outlined" 
                        size="small"
                        sx={{ 
                          borderColor: '#7bb6ff',
                          color: '#7bb6ff',
                          '&:hover': {
                            borderColor: '#7bb6ff',
                            backgroundColor: 'rgba(123, 182, 255, 0.1)'
                          }
                        }}
                      >
                        Learn More
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Button 
            component={Link} 
            to="/events" 
            variant="contained" 
            className="app-btn"
            size="large"
            sx={{ 
              px: 4, 
              py: 1.5, 
              fontSize: '1.1rem',
              fontWeight: 700,
              borderRadius: 3
            }}
          >
            View All Events
          </Button>
        </Box>
      </Box>

      {/* Testimonials Section */}
      <Box sx={{ py: { xs: 6, md: 8 }, px: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto' }}>
        <Typography 
          variant="h3" 
          sx={{ 
            textAlign: 'center', 
            fontWeight: 700, 
            color: '#fff',
            mb: 6,
            fontSize: { xs: '2rem', md: '2.5rem' }
          }}
        >
          What Our Community Says
        </Typography>
        <Box sx={{ position: 'relative', maxWidth: 800, mx: 'auto' }}>
          <IconButton 
            onClick={handlePrev} 
            sx={{ 
              position: 'absolute', 
              left: -60, 
              top: '50%', 
              transform: 'translateY(-50%)',
              zIndex: 2, 
              background: 'rgba(36,41,54,0.9)',
              border: '1px solid rgba(123, 182, 255, 0.2)',
              boxShadow: 2,
              '&:hover': { 
                background: '#232a36',
                borderColor: 'rgba(123, 182, 255, 0.4)'
              }
            }}
          >
            <ArrowBackIosNewIcon sx={{ color: '#7bb6ff' }} />
          </IconButton>
          
          <Card 
            sx={{ 
              p: 6, 
              borderRadius: 4, 
              background: 'rgba(36,41,54,0.6)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(123, 182, 255, 0.1)',
              textAlign: 'center',
              position: 'relative',
              minHeight: 300
            }}
          >
            <FormatQuoteIcon sx={{ fontSize: 60, color: '#7bb6ff', opacity: 0.3, position: 'absolute', top: 20, left: 20 }} />
            <Avatar 
              src={testimonials[testimonialIndex].avatar} 
              alt={testimonials[testimonialIndex].name} 
              sx={{ 
                width: 80, 
                height: 80, 
                mx: 'auto', 
                mb: 3, 
                border: '3px solid #7bb6ff',
                boxShadow: '0 8px 32px rgba(123, 182, 255, 0.3)'
              }} 
            />
            <Typography 
              variant="h6" 
              sx={{ 
                fontStyle: 'italic', 
                color: '#e3e9f7', 
                fontSize: '1.25rem',
                lineHeight: 1.6,
                mb: 3,
                px: 2
              }}
            >
              "{testimonials[testimonialIndex].text}"
            </Typography>
            <Typography variant="h6" sx={{ color: '#7bb6ff', fontWeight: 700, mb: 1 }}>
              {testimonials[testimonialIndex].name}
            </Typography>
            <Typography variant="body2" sx={{ color: '#b0b7c3' }}>
              {testimonials[testimonialIndex].role}
            </Typography>
          </Card>
          
          <IconButton 
            onClick={handleNext} 
            sx={{ 
              position: 'absolute', 
              right: -60, 
              top: '50%', 
              transform: 'translateY(-50%)',
              zIndex: 2, 
              background: 'rgba(36,41,54,0.9)',
              border: '1px solid rgba(123, 182, 255, 0.2)',
              boxShadow: 2,
              '&:hover': { 
                background: '#232a36',
                borderColor: 'rgba(123, 182, 255, 0.4)'
              }
            }}
          >
            <ArrowForwardIosIcon sx={{ color: '#7bb6ff' }} />
          </IconButton>
        </Box>
      </Box>

      {/* CTA Section */}
      <Box 
        sx={{ 
          py: { xs: 6, md: 8 }, 
          px: { xs: 2, md: 4 }, 
          textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(123, 182, 255, 0.1) 0%, rgba(224, 231, 255, 0.05) 100%)',
          borderRadius: '20px 20px 0 0',
          mt: 8
        }}
      >
        <Typography 
          variant="h3" 
          sx={{ 
            fontWeight: 700, 
            color: '#fff',
            mb: 3,
            fontSize: { xs: '2rem', md: '2.5rem' }
          }}
        >
          Ready to Join the Fun?
        </Typography>
        <Typography 
          variant="h6" 
          sx={{ 
            color: '#b0b7c3', 
            mb: 4,
            maxWidth: 600,
            mx: 'auto',
            lineHeight: 1.6
          }}
        >
          Start discovering amazing events and connecting with people who share your interests.
        </Typography>
        <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button 
            component={Link} 
            to="/signup" 
            variant="contained" 
            className="app-btn"
            size="large"
            sx={{ 
              px: 4, 
              py: 1.5, 
              fontSize: '1.1rem',
              fontWeight: 700,
              borderRadius: 3,
              boxShadow: '0 8px 32px rgba(123, 182, 255, 0.3)',
              '&:hover': {
                boxShadow: '0 12px 40px rgba(123, 182, 255, 0.4)',
                transform: 'translateY(-2px)'
              }
            }}
          >
            Create Account
          </Button>
          <Button 
            component={Link} 
            to="/login" 
            variant="outlined" 
            className="app-btn-outline"
            size="large"
            sx={{ 
              px: 4, 
              py: 1.5, 
              fontSize: '1.1rem',
              fontWeight: 700,
              borderRadius: 3,
              borderWidth: 2,
              '&:hover': {
                borderWidth: 2,
                transform: 'translateY(-2px)'
              }
            }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Landing;
