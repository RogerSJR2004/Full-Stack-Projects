import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import StarIcon from '@mui/icons-material/Star';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import CelebrationIcon from '@mui/icons-material/Celebration';
import HighlightIcon from '@mui/icons-material/Highlight';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import GroupIcon from '@mui/icons-material/Group';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Grid from '@mui/material/Grid';
import '../components/Event.css';
import { useNavigate } from 'react-router-dom';
import '../components/auth-dark.css';
// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const momentsImages = [
  {
    url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=900&q=80',
    caption: 'Spring Gala: Unforgettable Evenings',
  },
  {
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80',
    caption: 'Summer Festival: Music, Food & Fun',
  },
  {
    url: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=900&q=80',
    caption: 'Fall Harvest: Community & Celebration',
  },
  {
    url: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=900&q=80',
    caption: 'New Year Bash: Ringing in Together',
  },
];

const stats = [
  { icon: <EmojiEventsIcon sx={{ fontSize: 40, color: '#7bb6ff' }} />, label: 'Events Hosted', value: 120 },
  { icon: <GroupIcon sx={{ fontSize: 40, color: '#7bb6ff' }} />, label: 'Attendees', value: 3500 },
  { icon: <LocationOnIcon sx={{ fontSize: 40, color: '#7bb6ff' }} />, label: 'Cities', value: 18 },
];

const allEvents = [
  {
    type: 'past',
    name: 'Spring Gala 2024',
    date: 'April 20, 2024',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80',
    description: 'A magical evening of music, food, and celebration at the annual Spring Gala.',
    feedback: [
      { user: 'Priya S.', avatar: 'https://randomuser.me/api/portraits/women/68.jpg', rating: 5, comment: 'Amazing event! Loved every moment.' },
      { user: 'Rahul D.', avatar: 'https://randomuser.me/api/portraits/men/65.jpg', rating: 4, comment: 'Great atmosphere and music.' },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=900&q=80',
    ],
  },
  {
    type: 'past',
    name: 'Summer Festival 2024',
    date: 'July 15, 2024',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    description: 'Vibrant energy, live music, food vendors, and family-friendly activities.',
    feedback: [
      { user: 'Aisha K.', avatar: 'https://randomuser.me/api/portraits/women/65.jpg', rating: 5, comment: 'So much fun for the whole family!' },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1465101178521-c3a6088bfa0e?auto=format&fit=crop&w=900&q=80',
    ],
  },
  {
    type: 'featured',
    name: 'Fall Harvest Festival 2025',
    date: 'October 10, 2025',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80',
    description: 'Celebrate the harvest season with live music, local vendors, and a fun-filled day for the whole family.',
    feedback: [],
    gallery: [
      'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=900&q=80',
    ],
  },
  {
    type: 'highlight',
    name: 'New Year Bash 2024',
    date: 'December 31, 2024',
    image: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=600&q=80',
    description: 'Ring in the new year with fireworks, music, and dancing!',
    feedback: [
      { user: 'Ravi T.', avatar: 'https://randomuser.me/api/portraits/men/66.jpg', rating: 5, comment: 'Best New Year party ever!' },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1465101178521-c3a6088bfa0e?auto=format&fit=crop&w=900&q=80',
    ],
  },
];

const filterOptions = [
  { label: 'Past', value: 'past', icon: <EventAvailableIcon sx={{ mr: 1 }} /> },
  { label: 'Featured', value: 'featured', icon: <CelebrationIcon sx={{ mr: 1 }} /> },
  { label: 'Highlights', value: 'highlight', icon: <HighlightIcon sx={{ mr: 1 }} /> },
];

export default function Featured() {
  const [filter, setFilter] = useState('past');
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryImages, setGalleryImages] = useState([]);
  const filteredEvents = allEvents.filter(e => e.type === filter);

  // Animate stats (simple count up)
  const [counts, setCounts] = useState(stats.map(() => 0));
  React.useEffect(() => {
    const intervals = stats.map((stat, i) =>
      setInterval(() => {
        setCounts(prev => {
          const next = [...prev];
          if (next[i] < stat.value) next[i] += Math.ceil(stat.value / 40);
          if (next[i] > stat.value) next[i] = stat.value;
          return next;
        });
      }, 30)
    );
    return () => intervals.forEach(clearInterval);
  }, []);

  // Open gallery modal
  const handleOpenGallery = (images) => {
    setGalleryImages(images);
    setGalleryOpen(true);
  };
  const handleCloseGallery = () => setGalleryOpen(false);

  return (
    <Box className="app-bg-root" sx={{ minHeight: '100vh' }}>
      {/* Moments Slider */}
      <Box sx={{ maxWidth: 1100, mx: 'auto', mb: 6, borderRadius: 4, overflow: 'hidden', boxShadow: 3 }}>
        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          effect="fade"
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop
          style={{ borderRadius: 16 }}
        >
          {momentsImages.map((img, idx) => (
            <SwiperSlide key={idx}>
              <Box sx={{ position: 'relative', height: { xs: 220, md: 400 }, width: '100%' }}>
                <img src={img.url} alt={img.caption} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 16 }} />
                <Box sx={{ position: 'absolute', bottom: 0, left: 0, width: '100%', bgcolor: 'rgba(36,41,54,0.7)', color: '#fff', py: 2, px: 3, borderRadius: '0 0 16px 16px' }}>
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>{img.caption}</Typography>
                </Box>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      {/* Achievements/Stats Section */}
      <Box sx={{ maxWidth: 1100, mx: 'auto', mb: 8 }}>
        <Grid container spacing={4} justifyContent="center">
          {stats.map((stat, i) => (
            <Grid item xs={12} sm={4} key={stat.label}>
              <Box sx={{ textAlign: 'center', p: 4, background: 'rgba(36,41,54,0.7)', borderRadius: 3, boxShadow: 2 }}>
                {stat.icon}
                <Typography variant="h3" sx={{ color: '#7bb6ff', fontWeight: 900, mt: 1, mb: 0 }}>{counts[i]}</Typography>
                <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700 }}>{stat.label}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Hero Section */}
      <Box sx={{
        py: { xs: 7, md: 10 },
        px: { xs: 2, md: 4 },
        textAlign: 'center',
        background: 'linear-gradient(135deg, rgba(123, 182, 255, 0.08) 0%, rgba(224, 231, 255, 0.03) 100%)',
        mb: 6,
        borderRadius: '0 0 2rem 2rem',
        boxShadow: '0 8px 32px rgba(123, 182, 255, 0.08)'
      }}>
        <Typography variant="h2" className="app-title" sx={{ fontWeight: 900, color: '#fff', mb: 2, fontSize: { xs: '2.2rem', md: '3.2rem' } }}>
          Explore Events
        </Typography>
        <Typography variant="h5" className="app-subtitle" sx={{ color: '#7bb6ff', mb: 2, fontWeight: 600 }}>
          Find your next experience
        </Typography>
        <Typography variant="body1" sx={{ color: '#b0b7c3', maxWidth: 600, mx: 'auto', mb: 2 }}>
          Browse through our curated list of events. Filter by type to see past highlights, featured events, and more!
        </Typography>
      </Box>

      {/* Filter Bar */}
      <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" sx={{ mb: 5 }}>
        {filterOptions.map(opt => (
          <Chip
            key={opt.value}
            label={opt.label}
            icon={opt.icon}
            color={filter === opt.value ? 'primary' : 'default'}
            onClick={() => setFilter(opt.value)}
            sx={{ fontWeight: 700, fontSize: '1.1rem', px: 2.5, py: 1.5, borderRadius: 2, cursor: 'pointer', background: filter === opt.value ? '#7bb6ff' : 'rgba(36,41,54,0.92)', color: filter === opt.value ? '#232a36' : '#e3e9f7', border: filter === opt.value ? '2px solid #7bb6ff' : '2px solid #232a36', boxShadow: filter === opt.value ? '0 4px 16px rgba(123, 182, 255, 0.15)' : 'none', transition: 'all 0.2s' }}
          />
        ))}
      </Stack>
      {/* Events Gallery */}
      <Grid container spacing={4} justifyContent="center" alignItems="stretch" sx={{ px: { xs: 1, md: 4 }, mb: 8 }}>
        {filteredEvents.length === 0 ? (
          <Grid item xs={12}>
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h5" sx={{ color: '#b0b7c3', mb: 2 }}>
                No events found for this filter.
              </Typography>
              <Typography variant="body1" sx={{ color: '#7bb6ff' }}>
                Please try another filter or check back later!
              </Typography>
            </Box>
          </Grid>
        ) : (
          filteredEvents.map((event, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx}>
              <Card 
                className="event-card" 
                sx={{ 
                  height: '100%',
                  borderRadius: 4, 
                  overflow: 'hidden', 
                  display: 'flex', 
                  flexDirection: 'column',
                  background: 'rgba(36,41,54,0.7)',
                  boxShadow: '0 8px 32px rgba(123, 182, 255, 0.10)',
                  border: '1px solid rgba(123, 182, 255, 0.10)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-8px) scale(1.03)',
                    boxShadow: '0 16px 40px rgba(123, 182, 255, 0.18)',
                    borderColor: 'rgba(123, 182, 255, 0.25)'
                  }
                }}
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={event.image}
                  alt={event.name}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                    <Chip label={event.type.charAt(0).toUpperCase() + event.type.slice(1)} size="small" sx={{ background: '#7bb6ff', color: '#232a36', fontWeight: 700 }} />
                  </Stack>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#7bb6ff', mb: 1 }}>{event.name}</Typography>
                  <Typography variant="subtitle2" sx={{ color: '#b0b7c3', mb: 1 }}>{event.date}</Typography>
                  <Typography variant="body2" sx={{ color: '#e3e9f7', mb: 2, flexGrow: 1 }}>{event.description}</Typography>
                  {event.feedback && event.feedback.length > 0 && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="subtitle2" sx={{ color: '#7bb6ff', fontWeight: 600, mb: 1 }}>Feedback</Typography>
                      <Stack direction="row" spacing={1}>
                        {event.feedback.map((fb, i) => (
                          <Box key={i} sx={{ display: 'flex', alignItems: 'center', background: 'rgba(123,182,255,0.08)', borderRadius: 2, px: 1.5, py: 0.5, mr: 1 }}>
                            <Avatar src={fb.avatar} alt={fb.user} sx={{ width: 28, height: 28, mr: 1 }} />
                            <Typography variant="body2" sx={{ color: '#fff', fontWeight: 600, mr: 0.5 }}>{fb.user}</Typography>
                            <StarIcon sx={{ color: '#FFD700', fontSize: 18, verticalAlign: 'middle', mr: 0.2 }} />
                            <Typography variant="body2" sx={{ color: '#FFD700', fontWeight: 700 }}>{fb.rating}</Typography>
                          </Box>
                        ))}
                      </Stack>
                    </Box>
                  )}
                  <Button 
                    variant="outlined" 
                    size="small"
                    sx={{ 
                      mt: 3,
                      borderColor: '#7bb6ff',
                      color: '#7bb6ff',
                      fontWeight: 700,
                      borderRadius: 2,
                      '&:hover': {
                        borderColor: '#7bb6ff',
                        backgroundColor: 'rgba(123, 182, 255, 0.1)'
                      }
                    }}
                    onClick={() => handleOpenGallery(event.gallery)}
                  >
                    See Gallery
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      {/* Gallery Modal */}
      {galleryOpen && (
        <Box sx={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', bgcolor: 'rgba(36,41,54,0.92)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Box sx={{ position: 'relative', width: { xs: '90vw', md: 600 }, bgcolor: '#232a36', borderRadius: 4, boxShadow: 4, p: 3 }}>
            <Button onClick={handleCloseGallery} sx={{ position: 'absolute', top: 8, right: 8, color: '#7bb6ff', fontWeight: 700 }}>Close</Button>
            <Swiper
              modules={[Pagination]}
              pagination={{ clickable: true }}
              style={{ borderRadius: 12 }}
            >
              {galleryImages.map((img, idx) => (
                <SwiperSlide key={idx}>
                  <img src={img} alt={`Gallery ${idx + 1}`} style={{ width: '100%', height: 340, objectFit: 'cover', borderRadius: 12 }} />
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
        </Box>
      )}

      {/* CTA Banner */}
      <Box sx={{ textAlign: 'center', py: 8, background: 'linear-gradient(90deg, #7bb6ff 0%, #e0e7ff 100%)', borderRadius: 4, maxWidth: 1100, mx: 'auto', mb: 8, boxShadow: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 900, color: '#232a36', mb: 2 }}>
          Want to be part of our next big moment?
        </Typography>
        <Typography variant="h6" sx={{ color: '#232a36', mb: 3 }}>
          Join us and create memories that last a lifetime!
        </Typography>
        <Button variant="contained" size="large" sx={{ fontWeight: 700, px: 5, py: 1.5, fontSize: '1.1rem', borderRadius: 3, background: '#232a36', color: '#7bb6ff', '&:hover': { background: '#7bb6ff', color: '#232a36' } }} href="/signup">
          Get Started
        </Button>
      </Box>
    </Box>
  );
}