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
import '../components/Contact.css';

const socials = [
  { icon: <TwitterIcon />, label: 'Twitter', url: 'https://twitter.com/' },
  { icon: <LinkedInIcon />, label: 'LinkedIn', url: 'https://linkedin.com/' },
  { icon: <GitHubIcon />, label: 'GitHub', url: 'https://github.com/' },
];

export default function Contact() {
    return (
    <Box className="contact-bg" sx={{ width: '100%', minHeight: '100vh', py: 6, px: { xs: 2, md: 8 }, background: 'linear-gradient(120deg, #e0eafc 0%, #cfdef3 100%)' }}>
      <Typography variant="h2" className="contact-title" align="center" gutterBottom sx={{ fontWeight: 900, color: 'primary.main', mb: 2 }}>
        Contact Us
      </Typography>
      <Typography variant="h6" align="center" className="contact-description" sx={{ color: '#263238', fontWeight: 500, mb: 4 }}>
        We'd love to hear from you! Fill out the form below or reach us directly.
      </Typography>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={6} justifyContent="center" alignItems="flex-start" sx={{ maxWidth: 1100, mx: 'auto' }}>
        {/* Contact Form */}
        <Paper elevation={4} sx={{ flex: 1, p: 4, borderRadius: 4, background: '#fff', minWidth: 320 }}>
          <form className="contact-form" onSubmit={e => { e.preventDefault(); alert('Message sent!'); }}>
            <Stack spacing={3}>
              <TextField label="Your Name" name="name" fullWidth required />
              <TextField label="Your Email" name="email" type="email" fullWidth required />
              <TextField label="Your Message" name="message" multiline rows={4} fullWidth required />
              <Button type="submit" variant="contained" color="primary" size="large" className="contact-button" sx={{ fontWeight: 700, borderRadius: 3 }}>
                Send Message
              </Button>
            </Stack>
          </form>
        </Paper>
        {/* Contact Info */}
        <Box className="contact-info" sx={{ flex: 1, minWidth: 280, mt: { xs: 4, md: 0 } }}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main', mb: 2 }}>
            Other Ways to Reach Us
          </Typography>
          <Stack spacing={2}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <EmailIcon color="primary" />
              <Typography variant="body1">
                <a href="mailto:info@eventmanager.com" className="contact-link">info@eventmanager.com</a>
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={2}>
              <PhoneIcon color="primary" />
              <Typography variant="body1">
                <a href="tel:+1234567890" className="contact-link">+1 234 567 890</a>
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={2}>
              <LocationOnIcon color="primary" />
              <Typography variant="body1">
                123 Main Street, Thoothukudi, India
              </Typography>
            </Stack>
          </Stack>
          <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main', mt: 4, mb: 2 }}>
            Connect With Us
          </Typography>
          <Stack direction="row" spacing={2}>
            {socials.map((social, idx) => (
              <Button key={idx} variant="outlined" color="primary" startIcon={social.icon} href={social.url} target="_blank" rel="noopener" sx={{ fontWeight: 600 }}>
                {social.label}
              </Button>
            ))}
          </Stack>
        </Box>
      </Stack>
    </Box>
    );
  }