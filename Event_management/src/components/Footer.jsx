import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import '../components/auth-dark.css';

function Footer() {
  return (
    <Box component="footer" className="app-footer" sx={{ position: 'relative', pb: { xs: 7, md: 0 } }}>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={6} justifyContent="space-between" alignItems="flex-start" sx={{ maxWidth: 1200, mx: 'auto', width: '100%', py: 3, px: 2 }}>
        {/* About Section */}
        <Box sx={{ flex: 1, minWidth: 200, mb: { xs: 2, md: 0 } }}>
          <Typography variant="h6" sx={{ color: '#7bb6ff', fontWeight: 800, mb: 1 }}>
            EventManager
          </Typography>
          <Typography variant="body2" sx={{ color: '#b0b7c3', mb: 1 }}>
            Empowering communities to connect, share, and celebrate through events.
          </Typography>
        </Box>
        {/* Quick Links */}
        <Box sx={{ flex: 1, minWidth: 160, mb: { xs: 2, md: 0 } }}>
          <Typography variant="subtitle1" sx={{ color: '#e3e9f7', fontWeight: 700, mb: 1 }}>
            Quick Links
          </Typography>
          <Stack spacing={0.5}>
            <Link href="/" className="auth-link" underline="none">Home</Link>
            <Link href="/events" className="auth-link" underline="none">Events</Link>
            <Link href="/about" className="auth-link" underline="none">About</Link>
            <Link href="/contact" className="auth-link" underline="none">Contact</Link>
            <Link href="/login" className="auth-link" underline="none">Login</Link>
          </Stack>
        </Box>
        {/* Contact Info */}
        <Box sx={{ flex: 1, minWidth: 200, mb: { xs: 2, md: 0 } }}>
          <Typography variant="subtitle1" sx={{ color: '#e3e9f7', fontWeight: 700, mb: 1 }}>
            Contact
          </Typography>
          <Stack spacing={1}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <EmailIcon sx={{ color: '#7bb6ff' }} fontSize="small" />
              <Typography variant="body2" sx={{ color: '#b0b7c3' }}>info@eventmanager.com</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <PhoneIcon sx={{ color: '#7bb6ff' }} fontSize="small" />
              <Typography variant="body2" sx={{ color: '#b0b7c3' }}>+1 234 567 890</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <LocationOnIcon sx={{ color: '#7bb6ff' }} fontSize="small" />
              <Typography variant="body2" sx={{ color: '#b0b7c3' }}>123 Main Street, Thoothukudi, India</Typography>
            </Stack>
          </Stack>
        </Box>
        {/* Social Media */}
        <Box sx={{ flex: 1, minWidth: 160 }}>
          <Typography variant="subtitle1" sx={{ color: '#e3e9f7', fontWeight: 700, mb: 1 }}>
            Connect With Us
          </Typography>
          <Stack direction="row" spacing={2}>
            <Link href="https://twitter.com/" target="_blank" rel="noopener" className="auth-link" underline="none">
              <TwitterIcon sx={{ color: '#7bb6ff', fontSize: 28 }} />
            </Link>
            <Link href="https://linkedin.com/" target="_blank" rel="noopener" className="auth-link" underline="none">
              <LinkedInIcon sx={{ color: '#7bb6ff', fontSize: 28 }} />
            </Link>
            <Link href="https://github.com/" target="_blank" rel="noopener" className="auth-link" underline="none">
              <GitHubIcon sx={{ color: '#7bb6ff', fontSize: 28 }} />
            </Link>
          </Stack>
        </Box>
      </Stack>
      <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.08)', mt: 2, pt: 2, textAlign: 'center' }}>
        <Typography variant="body2" sx={{ color: '#b0b7c3' }}>
          © {new Date().getFullYear()} EventManager. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}

export default Footer; 