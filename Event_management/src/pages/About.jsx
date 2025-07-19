import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import '../components/About.css';

const team = [
  { name: 'Priya Sharma', role: 'Founder & CEO', avatar: 'https://randomuser.me/api/portraits/women/68.jpg' },
  { name: 'Rahul Desai', role: 'Lead Developer', avatar: 'https://randomuser.me/api/portraits/men/65.jpg' },
  { name: 'Aisha Khan', role: 'Community Manager', avatar: 'https://randomuser.me/api/portraits/women/65.jpg' },
];



function About() {
  return (
    <Box className="about-bg" sx={{ width: '100%', minHeight: '100vh', background: 'linear-gradient(120deg, #e0eafc 0%, #cfdef3 100%)' }}>
      {/* Mission Section */}
      <Box sx={{ py: 10, px: 2, position: 'relative', textAlign: 'center', background: 'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)', borderRadius: 4, boxShadow: 6, mb: 6 }}>
        <Typography variant="h2" className="about-title" gutterBottom sx={{ color: '#1a237e', fontWeight: 900, letterSpacing: 2, zIndex: 1, position: 'relative' }}>
          About EventManager
        </Typography>
        <Typography variant="h5" className="about-mission" gutterBottom sx={{ color: '#263238', fontWeight: 500, zIndex: 1, position: 'relative', mb: 2 }}>
          Connecting people through events
        </Typography>
        <Typography variant="body1" sx={{ color: '#37474f', maxWidth: 700, mx: 'auto', mb: 4, zIndex: 1, position: 'relative' }}>
          EventManager is a platform dedicated to bringing communities together by making it easy to discover, join, and celebrate events of all kinds. Our mission is to empower people to connect, share, and create memorable experiences.
        </Typography>
      </Box>
      
    </Box>
  );
}

export default About;