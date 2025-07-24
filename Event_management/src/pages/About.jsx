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
import '../components/auth-dark.css';

const team = [
  { name: 'Priya Sharma', role: 'Founder & CEO', avatar: 'https://randomuser.me/api/portraits/women/68.jpg' },
  { name: 'Rahul Desai', role: 'Lead Developer', avatar: 'https://randomuser.me/api/portraits/men/65.jpg' },
  { name: 'Aisha Khan', role: 'Community Manager', avatar: 'https://randomuser.me/api/portraits/women/65.jpg' },
];



function About() {
  return (
    <Box className="app-bg-root">
      {/* Mission Section */}
      <Box className="app-glass-section" sx={{ py: 8, px: 2, textAlign: 'center', mb: 6 }}>
        <Typography variant="h2" className="app-title" gutterBottom>
          About EventManager
        </Typography>
        <Typography variant="h5" className="app-subtitle" gutterBottom>
          Connecting people through events
        </Typography>
        <Typography variant="body1" sx={{ color: '#b0b7c3', maxWidth: 700, mx: 'auto', mb: 4 }}>
          EventManager is a platform dedicated to bringing communities together by making it easy to discover, join, and celebrate events of all kinds. Our mission is to empower people to connect, share, and create memorable experiences.
        </Typography>
      </Box>
    </Box>
  );
}

export default About;