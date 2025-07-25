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
import '../components/auth-dark.css';

const team = [
  { name: 'Priya Sharma', role: 'Founder & CEO', avatar: 'https://randomuser.me/api/portraits/women/68.jpg' },
  { name: 'Rahul Desai', role: 'Lead Developer', avatar: 'https://randomuser.me/api/portraits/men/65.jpg' },
  { name: 'Aisha Khan', role: 'Community Manager', avatar: 'https://randomuser.me/api/portraits/women/65.jpg' },
];

function About() {
  return (
    <Box className="app-bg-root" sx={{ minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box sx={{
        py: { xs: 8, md: 12 },
        px: { xs: 2, md: 4 },
        textAlign: 'center',
        background: 'linear-gradient(135deg, rgba(123, 182, 255, 0.10) 0%, rgba(224, 231, 255, 0.05) 100%)',
        mb: 6,
        borderRadius: '0 0 2rem 2rem',
        boxShadow: '0 8px 32px rgba(123, 182, 255, 0.08)'
      }}>
        <EventAvailableIcon sx={{ fontSize: 80, color: '#7bb6ff', mb: 3 }} />
        <Typography variant="h2" className="app-title" sx={{ fontWeight: 900, color: '#fff', mb: 2, fontSize: { xs: '2.2rem', md: '3.2rem' } }}>
          About EventManager
        </Typography>
        <Typography variant="h5" className="app-subtitle" sx={{ color: '#7bb6ff', mb: 2, fontWeight: 600 }}>
          Connecting people through events
        </Typography>
        <Typography variant="body1" sx={{ color: '#b0b7c3', maxWidth: 700, mx: 'auto', mb: 4 }}>
          EventManager is a platform dedicated to bringing communities together by making it easy to discover, join, and celebrate events of all kinds. Our mission is to empower people to connect, share, and create memorable experiences.
        </Typography>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: { xs: 6, md: 8 }, px: { xs: 2, md: 4 }, maxWidth: 1100, mx: 'auto', mb: 6 }}>
        <Typography variant="h3" className="app-title" sx={{ mb: 5, textAlign: 'center', fontWeight: 700, color: '#fff', fontSize: { xs: '2rem', md: '2.5rem' } }}>
          Why Choose EventManager?
        </Typography>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} justifyContent="center" alignItems="stretch">
          <Box sx={{ flex: 1, minWidth: 220, p: 4, borderRadius: 3, background: 'rgba(36,41,54,0.6)', boxShadow: 3, transition: 'all 0.3s', '&:hover': { transform: 'translateY(-8px)', boxShadow: '0 20px 40px rgba(123, 182, 255, 0.15)', borderColor: 'rgba(123, 182, 255, 0.3)' } }}>
            <EventAvailableIcon sx={{ fontSize: 48, color: '#7bb6ff', mb: 1 }} />
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: '#fff' }}>
              Effortless Event Discovery
            </Typography>
            <Typography variant="body2" sx={{ color: '#b0b7c3' }}>
              Browse and find events that match your interests, from local meetups to global conferences, all in one place.
            </Typography>
          </Box>
          <Box sx={{ flex: 1, minWidth: 220, p: 4, borderRadius: 3, background: 'rgba(36,41,54,0.6)', boxShadow: 3, transition: 'all 0.3s', '&:hover': { transform: 'translateY(-8px)', boxShadow: '0 20px 40px rgba(123, 182, 255, 0.15)', borderColor: 'rgba(123, 182, 255, 0.3)' } }}>
            <EmojiEventsIcon sx={{ fontSize: 48, color: '#7bb6ff', mb: 1 }} />
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: '#fff' }}>
              Seamless Participation
            </Typography>
            <Typography variant="body2" sx={{ color: '#b0b7c3' }}>
              Join events with a single click, receive timely updates, and never miss out on the experiences that matter to you.
            </Typography>
          </Box>
          <Box sx={{ flex: 1, minWidth: 220, p: 4, borderRadius: 3, background: 'rgba(36,41,54,0.6)', boxShadow: 3, transition: 'all 0.3s', '&:hover': { transform: 'translateY(-8px)', boxShadow: '0 20px 40px rgba(123, 182, 255, 0.15)', borderColor: 'rgba(123, 182, 255, 0.3)' } }}>
            <EventAvailableIcon sx={{ fontSize: 48, color: '#7bb6ff', mb: 1 }} />
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: '#fff' }}>
              Empowering Organizers
            </Typography>
            <Typography variant="body2" sx={{ color: '#b0b7c3' }}>
              Create, manage, and promote your own events with powerful tools designed for organizers of all sizes.
            </Typography>
          </Box>
        </Stack>
      </Box>

      {/* Team Section */}
      <Box sx={{ py: { xs: 6, md: 8 }, px: { xs: 2, md: 4 }, maxWidth: 900, mx: 'auto', mb: 6 }}>
        <Typography variant="h3" className="app-title" sx={{ mb: 5, textAlign: 'center', fontWeight: 700, color: '#fff', fontSize: { xs: '2rem', md: '2.5rem' } }}>
          Meet Our Team
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={4} justifyContent="center" alignItems="center">
          {team.map((member) => (
            <Box
              key={member.name}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                p: 4,
                borderRadius: 3,
                background: 'rgba(36,41,54,0.6)',
                boxShadow: 3,
                minWidth: 200,
                transition: 'all 0.3s',
                '&:hover': { transform: 'translateY(-8px)', boxShadow: '0 20px 40px rgba(123, 182, 255, 0.15)', borderColor: 'rgba(123, 182, 255, 0.3)' }
              }}
            >
              <Avatar
                src={member.avatar}
                alt={member.name}
                sx={{ width: 80, height: 80, mb: 2, border: '3px solid #7bb6ff' }}
              />
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#fff' }}>
                {member.name}
              </Typography>
              <Typography variant="body2" sx={{ color: '#b0b7c3', mb: 1 }}>
                {member.role}
              </Typography>
              <Stack direction="row" spacing={1}>
                <Button size="small" sx={{ minWidth: 0, p: 0.5, color: '#7bb6ff' }} href="https://twitter.com/" target="_blank" rel="noopener">
                  <TwitterIcon fontSize="small" />
                </Button>
                <Button size="small" sx={{ minWidth: 0, p: 0.5, color: '#7bb6ff' }} href="https://linkedin.com/" target="_blank" rel="noopener">
                  <LinkedInIcon fontSize="small" />
                </Button>
                <Button size="small" sx={{ minWidth: 0, p: 0.5, color: '#7bb6ff' }} href="https://github.com/" target="_blank" rel="noopener">
                  <GitHubIcon fontSize="small" />
                </Button>
              </Stack>
            </Box>
          ))}
        </Stack>
      </Box>

      {/* Call to Action Section */}
      <Box sx={{ py: { xs: 6, md: 8 }, px: { xs: 2, md: 4 }, textAlign: 'center', maxWidth: 700, mx: 'auto', mb: 6, background: 'linear-gradient(135deg, rgba(123, 182, 255, 0.10) 0%, rgba(224, 231, 255, 0.05) 100%)', borderRadius: 4, boxShadow: 2 }}>
        <Typography variant="h3" className="app-title" sx={{ mb: 3, fontWeight: 700, color: '#fff', fontSize: { xs: '2rem', md: '2.5rem' } }}>
          Ready to join the community?
        </Typography>
        <Typography variant="body1" sx={{ color: '#b0b7c3', mb: 3 }}>
          Sign up today and start discovering, joining, or hosting amazing events. Be part of a growing network that celebrates connection and collaboration!
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          href="/signup"
          className="app-btn"
          sx={{ fontWeight: 700, px: 5, py: 1.5, fontSize: '1.1rem', borderRadius: 3, boxShadow: '0 8px 32px rgba(123, 182, 255, 0.3)', '&:hover': { boxShadow: '0 12px 40px rgba(123, 182, 255, 0.4)', transform: 'translateY(-2px)' } }}
        >
          Get Started
        </Button>
      </Box>

      {/* Values Section */}
      <Box sx={{ py: { xs: 6, md: 8 }, px: { xs: 2, md: 4 }, maxWidth: 900, mx: 'auto', mb: 6 }}>
        <Typography variant="h3" className="app-title" sx={{ mb: 5, textAlign: 'center', fontWeight: 700, color: '#fff', fontSize: { xs: '2rem', md: '2.5rem' } }}>
          Our Core Values
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={4} justifyContent="center" alignItems="stretch">
          <Box sx={{ flex: 1, minWidth: 180, p: 4, borderRadius: 3, background: 'rgba(36,41,54,0.6)', boxShadow: 3, transition: 'all 0.3s', '&:hover': { transform: 'translateY(-8px)', boxShadow: '0 20px 40px rgba(123, 182, 255, 0.15)', borderColor: 'rgba(123, 182, 255, 0.3)' } }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: '#fff' }}>
              Inclusivity
            </Typography>
            <Typography variant="body2" sx={{ color: '#b0b7c3' }}>
              We believe everyone should have access to meaningful events and opportunities to connect.
            </Typography>
          </Box>
          <Box sx={{ flex: 1, minWidth: 180, p: 4, borderRadius: 3, background: 'rgba(36,41,54,0.6)', boxShadow: 3, transition: 'all 0.3s', '&:hover': { transform: 'translateY(-8px)', boxShadow: '0 20px 40px rgba(123, 182, 255, 0.15)', borderColor: 'rgba(123, 182, 255, 0.3)' } }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: '#fff' }}>
              Innovation
            </Typography>
            <Typography variant="body2" sx={{ color: '#b0b7c3' }}>
              We strive to provide the best tools and experiences for both attendees and organizers.
            </Typography>
          </Box>
          <Box sx={{ flex: 1, minWidth: 180, p: 4, borderRadius: 3, background: 'rgba(36,41,54,0.6)', boxShadow: 3, transition: 'all 0.3s', '&:hover': { transform: 'translateY(-8px)', boxShadow: '0 20px 40px rgba(123, 182, 255, 0.15)', borderColor: 'rgba(123, 182, 255, 0.3)' } }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: '#fff' }}>
              Community
            </Typography>
            <Typography variant="body2" sx={{ color: '#b0b7c3' }}>
              Our platform is built to foster genuine connections and lasting relationships.
            </Typography>
          </Box>
        </Stack>
      </Box>

      {/* FAQ Section */}
      <Box sx={{ py: { xs: 6, md: 8 }, px: { xs: 2, md: 4 }, maxWidth: 800, mx: 'auto', mb: 6, background: 'rgba(36,41,54,0.7)', borderRadius: 4, boxShadow: 2 }}>
        <Typography variant="h3" className="app-title" sx={{ mb: 5, textAlign: 'center', fontWeight: 700, color: '#fff', fontSize: { xs: '2rem', md: '2.5rem' } }}>
          Frequently Asked Questions
        </Typography>
        <Stack spacing={4}>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#7bb6ff', mb: 1 }}>
              How do I create an event?
            </Typography>
            <Typography variant="body2" sx={{ color: '#b0b7c3' }}>
              Simply sign up for an organizer account, click on "Add Event" in your dashboard, and fill in the event details. Your event will be visible to the community once approved.
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#7bb6ff', mb: 1 }}>
              Is EventManager free to use?
            </Typography>
            <Typography variant="body2" sx={{ color: '#b0b7c3' }}>
              Yes! Browsing and joining events is free. Organizers can also create events at no cost. We may offer premium features in the future.
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#7bb6ff', mb: 1 }}>
              Can I join events virtually?
            </Typography>
            <Typography variant="body2" sx={{ color: '#b0b7c3' }}>
              Absolutely! Many events offer virtual participation options. Look for the "Online" tag or check the event details for a video link.
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}

export default About;