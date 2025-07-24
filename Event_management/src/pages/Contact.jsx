import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import '../components/auth-dark.css';

const socials = [
  { icon: <TwitterIcon />, label: 'Twitter', url: 'https://twitter.com/' },
  { icon: <LinkedInIcon />, label: 'LinkedIn', url: 'https://linkedin.com/' },
  { icon: <GitHubIcon />, label: 'GitHub', url: 'https://github.com/' },
];

export default function Contact() {
    return (
    <Box className="app-bg-root">
      <Box className="app-glass-section" sx={{ width: '100%', minHeight: '80vh', py: 6, px: { xs: 2, md: 8 } }}>
        <Typography variant="h2" className="app-title" align="center" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="h6" align="center" className="app-subtitle" sx={{ mb: 4 }}>
          We'd love to hear from you! Fill out the form below or reach us directly.
        </Typography>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={6} justifyContent="center" alignItems="flex-start" sx={{ maxWidth: 1100, mx: 'auto' }}>
          {/* Contact Form */}
          <Box sx={{ flex: 1, p: 4, borderRadius: 4, background: 'rgba(36,41,54,0.92)', minWidth: 320 }}>
            <form className="contact-form" onSubmit={e => { e.preventDefault(); alert('Message sent!'); }}>
              <Stack spacing={3}>
                <TextField label="Your Name" name="name" fullWidth required className="auth-input" />
                <TextField label="Your Email" name="email" type="email" fullWidth required className="auth-input" />
                <TextField label="Your Message" name="message" multiline rows={4} fullWidth required className="auth-input" />
                <Button type="submit" variant="contained" className="app-btn" size="large">
                  Send Message
                </Button>
              </Stack>
            </form>
          </Box>
          {/* Contact Info */}
          <Box className="contact-info" sx={{ flex: 1, minWidth: 280, mt: { xs: 4, md: 0 } }}>
            <Typography variant="h4" className="app-section-title" sx={{ mb: 2 }}>
              Other Ways to Reach Us
            </Typography>
            <Stack spacing={2}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <EmailIcon sx={{ color: '#7bb6ff' }} />
                <Typography variant="body1">
                  <a href="mailto:info@eventmanager.com" className="auth-link">info@eventmanager.com</a>
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={2}>
                <PhoneIcon sx={{ color: '#7bb6ff' }} />
                <Typography variant="body1">
                  <a href="tel:+1234567890" className="auth-link">+1 234 567 890</a>
                </Typography>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={2}>
                <LocationOnIcon sx={{ color: '#7bb6ff' }} />
                <Typography variant="body1">
                  123 Main Street, Thoothukudi, India
                </Typography>
              </Stack>
            </Stack>
            <Typography variant="h5" className="app-section-title" sx={{ mt: 4, mb: 2 }}>
              Connect With Us
            </Typography>
            <Stack direction="row" spacing={2}>
              {socials.map((social, idx) => (
                <Button key={idx} variant="outlined" className="app-btn-outline" startIcon={social.icon} href={social.url} target="_blank" rel="noopener">
                  {social.label}
                </Button>
              ))}
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Box>
    );
  }