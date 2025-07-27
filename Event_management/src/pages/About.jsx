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
    <Box className="app-bg-root" sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #232a36 0%, #7bb6ff11 100%)' }}>
      {/* Hero Section */}
      <Box sx={{
        py: { xs: 8, md: 12 },
        px: { xs: 2, md: 4 },
        textAlign: 'center',
        background: 'rgba(36,41,54,0.55)',
        mb: 6,
        borderRadius: '0 0 2rem 2rem',
        boxShadow: '0 8px 32px rgba(123, 182, 255, 0.13)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Animated background shapes */}
        <Box sx={{ position: 'absolute', top: -60, left: -60, width: 180, height: 180, background: 'radial-gradient(circle, #7bb6ff33 0%, transparent 70%)', borderRadius: '50%', zIndex: 0 }} />
        <Box sx={{ position: 'absolute', bottom: -40, right: -40, width: 120, height: 120, background: 'radial-gradient(circle, #7bb6ff22 0%, transparent 70%)', borderRadius: '50%', zIndex: 0 }} />
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <EventAvailableIcon sx={{ fontSize: 80, color: '#7bb6ff', mb: 3 }} />
          <Typography variant="h2" className="app-title" sx={{ fontWeight: 900, mb: 2, fontSize: { xs: '2.2rem', md: '3.2rem' }, background: 'linear-gradient(90deg, #fff 30%, #7bb6ff 90%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: 2 }}>
            About EventManager
          </Typography>
          <Typography variant="h5" className="app-subtitle" sx={{ color: '#7bb6ff', mb: 2, fontWeight: 700, letterSpacing: 1 }}>
            Connecting people through events
          </Typography>
          <Typography variant="body1" sx={{ color: '#b0b7c3', maxWidth: 700, mx: 'auto', mb: 4, fontWeight: 500, fontSize: '1.15rem' }}>
            EventManager is a platform dedicated to bringing communities together by making it easy to discover, join, and celebrate events of all kinds. Our mission is to empower people to connect, share, and create memorable experiences.
          </Typography>
        </Box>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: { xs: 6, md: 8 }, px: { xs: 2, md: 4 }, maxWidth: 1100, mx: 'auto', mb: 6 }}>
        <Typography variant="h3" className="app-title" sx={{ mb: 5, textAlign: 'center', fontWeight: 700, fontSize: { xs: '2rem', md: '2.5rem' }, letterSpacing: 1.5, background: 'linear-gradient(90deg, #7bb6ff 0%, #e0e7ff 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Why Choose EventManager?
        </Typography>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} justifyContent="center" alignItems="stretch">
          {[{
            icon: <EventAvailableIcon sx={{ fontSize: 48, color: '#7bb6ff', mb: 1 }} />,
            title: 'Effortless Event Discovery',
            desc: 'Browse and find events that match your interests, from local meetups to global conferences, all in one place.'
          }, {
            icon: <EmojiEventsIcon sx={{ fontSize: 48, color: '#7bb6ff', mb: 1 }} />,
            title: 'Seamless Participation',
            desc: 'Join events with a single click, receive timely updates, and never miss out on the experiences that matter to you.'
          }, {
            icon: <EventAvailableIcon sx={{ fontSize: 48, color: '#7bb6ff', mb: 1 }} />,
            title: 'Empowering Organizers',
            desc: 'Create, manage, and promote your own events with powerful tools designed for organizers of all sizes.'
          }].map((f, i) => (
            <Box key={i} sx={{ flex: 1, minWidth: 220, p: 4, borderRadius: 4, background: 'rgba(36,41,54,0.45)', boxShadow: 4, position: 'relative', transition: 'all 0.35s cubic-bezier(.23,1,.32,1)', overflow: 'visible', '&:before': { content: '""', display: 'block', position: 'absolute', top: 0, left: 0, width: '100%', height: 6, background: 'linear-gradient(90deg, #7bb6ff 0%, #e0e7ff 100%)', zIndex: 1 }, '&:hover': { transform: 'translateY(-12px) scale(1.04)', boxShadow: '0 20px 48px 0 rgba(123,182,255,0.25)', borderColor: 'rgba(123, 182, 255, 0.35)' } }}>
              <Box sx={{ position: 'relative', zIndex: 2 }}>{f.icon}</Box>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 1, background: 'linear-gradient(90deg, #7bb6ff 0%, #e0e7ff 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: 1.2, fontSize: '1.15rem' }}>
                {f.title}
              </Typography>
              <Typography variant="body2" sx={{ color: '#b0b7c3', fontWeight: 500 }}>
                {f.desc}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Box>

      {/* Team Section */}
      <Box sx={{ py: { xs: 6, md: 8 }, px: { xs: 2, md: 4 }, maxWidth: 900, mx: 'auto', mb: 6 }}>
        <Typography variant="h3" className="app-title" sx={{ mb: 5, textAlign: 'center', fontWeight: 700, fontSize: { xs: '2rem', md: '2.5rem' }, letterSpacing: 1.5, background: 'linear-gradient(90deg, #7bb6ff 0%, #e0e7ff 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
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
                borderRadius: 4,
                background: 'rgba(36,41,54,0.45)',
                boxShadow: 4,
                minWidth: 200,
                position: 'relative',
                transition: 'all 0.35s cubic-bezier(.23,1,.32,1)',
                '&:hover': { transform: 'translateY(-12px) scale(1.04)', boxShadow: '0 20px 48px 0 rgba(123,182,255,0.25)', borderColor: 'rgba(123, 182, 255, 0.35)' }
              }}
            >
              <Avatar
                src={member.avatar}
                alt={member.name}
                sx={{ width: 90, height: 90, mb: 2, border: '3px solid #7bb6ff', boxShadow: '0 0 24px #7bb6ff55' }}
              />
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#fff', letterSpacing: 1 }}>
                {member.name}
              </Typography>
              <Typography variant="body2" sx={{ color: '#b0b7c3', mb: 1, fontWeight: 600 }}>
                {member.role}
              </Typography>
              <Stack direction="row" spacing={1}>
                <Button size="small" sx={{ minWidth: 0, p: 0.5, color: '#7bb6ff', transition: 'color 0.2s', '&:hover': { color: '#fff', background: '#7bb6ff' } }} href="https://twitter.com/" target="_blank" rel="noopener">
                  <TwitterIcon fontSize="small" />
                </Button>
                <Button size="small" sx={{ minWidth: 0, p: 0.5, color: '#7bb6ff', transition: 'color 0.2s', '&:hover': { color: '#fff', background: '#7bb6ff' } }} href="https://linkedin.com/" target="_blank" rel="noopener">
                  <LinkedInIcon fontSize="small" />
                </Button>
                <Button size="small" sx={{ minWidth: 0, p: 0.5, color: '#7bb6ff', transition: 'color 0.2s', '&:hover': { color: '#fff', background: '#7bb6ff' } }} href="https://github.com/" target="_blank" rel="noopener">
                  <GitHubIcon fontSize="small" />
                </Button>
              </Stack>
            </Box>
          ))}
        </Stack>
      </Box>

      {/* Call to Action Section */}
      <Box sx={{ py: { xs: 6, md: 8 }, px: { xs: 2, md: 4 }, textAlign: 'center', maxWidth: 700, mx: 'auto', mb: 6, background: 'linear-gradient(90deg, #7bb6ff 0%, #e0e7ff 100%)', borderRadius: 4, boxShadow: 4, position: 'relative', overflow: 'hidden' }}>
        <Box sx={{ position: 'absolute', top: -30, left: -30, width: 120, height: 120, background: 'radial-gradient(circle, #7bb6ff33 0%, transparent 70%)', borderRadius: '50%', zIndex: 0 }} />
        <Box sx={{ position: 'absolute', bottom: -30, right: -30, width: 120, height: 120, background: 'radial-gradient(circle, #e0e7ff66 0%, transparent 70%)', borderRadius: '50%', zIndex: 0 }} />
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Typography variant="h3" className="app-title" sx={{ mb: 3, fontWeight: 900, color: '#232a36', fontSize: { xs: '2rem', md: '2.5rem' }, letterSpacing: 1 }}>
            Ready to join the community?
          </Typography>
          <Typography variant="body1" sx={{ color: '#232a36', mb: 3, fontWeight: 600 }}>
            Sign up today and start discovering, joining, or hosting amazing events. Be part of a growing network that celebrates connection and collaboration!
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            href="/signup"
            className="app-btn"
            sx={{ fontWeight: 700, px: 5, py: 1.5, fontSize: '1.1rem', borderRadius: 3, background: '#232a36', color: '#7bb6ff', boxShadow: '0 8px 32px #232a3644', '&:hover': { background: '#7bb6ff', color: '#232a36', boxShadow: '0 12px 40px #7bb6ff33', transform: 'translateY(-2px)' } }}
          >
            Get Started
          </Button>
        </Box>
      </Box>

      {/* Values Section */}
      <Box sx={{ py: { xs: 6, md: 8 }, px: { xs: 2, md: 4 }, maxWidth: 900, mx: 'auto', mb: 6 }}>
        <Typography variant="h3" className="app-title" sx={{ mb: 5, textAlign: 'center', fontWeight: 700, fontSize: { xs: '2rem', md: '2.5rem' }, letterSpacing: 1.5, background: 'linear-gradient(90deg, #7bb6ff 0%, #e0e7ff 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Our Core Values
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={4} justifyContent="center" alignItems="stretch">
          {[{
            title: 'Inclusivity',
            desc: 'We believe everyone should have access to meaningful events and opportunities to connect.'
          }, {
            title: 'Innovation',
            desc: 'We strive to provide the best tools and experiences for both attendees and organizers.'
          }, {
            title: 'Community',
            desc: 'Our platform is built to foster genuine connections and lasting relationships.'
          }].map((v, i) => (
            <Box key={i} sx={{ flex: 1, minWidth: 180, p: 4, borderRadius: 4, background: 'rgba(36,41,54,0.45)', boxShadow: 4, position: 'relative', transition: 'all 0.35s cubic-bezier(.23,1,.32,1)', overflow: 'visible', '&:before': { content: '""', display: 'block', position: 'absolute', top: 0, left: 0, width: '100%', height: 6, background: 'linear-gradient(90deg, #7bb6ff 0%, #e0e7ff 100%)', zIndex: 1 }, '&:hover': { transform: 'translateY(-12px) scale(1.04)', boxShadow: '0 20px 48px 0 rgba(123,182,255,0.25)', borderColor: 'rgba(123, 182, 255, 0.35)' } }}>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 1, background: 'linear-gradient(90deg, #7bb6ff 0%, #e0e7ff 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: 1.2, fontSize: '1.15rem' }}>
                {v.title}
              </Typography>
              <Typography variant="body2" sx={{ color: '#b0b7c3', fontWeight: 500 }}>
                {v.desc}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Box>

      {/* FAQ Section */}
      <Box sx={{ py: { xs: 6, md: 8 }, px: { xs: 2, md: 4 }, maxWidth: 800, mx: 'auto', mb: 6, background: 'rgba(36,41,54,0.7)', borderRadius: 4, boxShadow: 4, border: '1.5px solid #7bb6ff33' }}>
        <Typography variant="h3" className="app-title" sx={{ mb: 5, textAlign: 'center', fontWeight: 700, fontSize: { xs: '2rem', md: '2.5rem' }, letterSpacing: 1.5, background: 'linear-gradient(90deg, #7bb6ff 0%, #e0e7ff 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Frequently Asked Questions
        </Typography>
        <Stack spacing={4}>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#7bb6ff', mb: 1, letterSpacing: 1 }}>
              How do I create an event?
            </Typography>
            <Typography variant="body2" sx={{ color: '#b0b7c3', fontWeight: 500 }}>
              Simply sign up for an organizer account, click on "Add Event" in your dashboard, and fill in the event details. Your event will be visible to the community once approved.
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#7bb6ff', mb: 1, letterSpacing: 1 }}>
              Is EventManager free to use?
            </Typography>
            <Typography variant="body2" sx={{ color: '#b0b7c3', fontWeight: 500 }}>
              Yes! Browsing and joining events is free. Organizers can also create events at no cost. We may offer premium features in the future.
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#7bb6ff', mb: 1, letterSpacing: 1 }}>
              Can I join events virtually?
            </Typography>
            <Typography variant="body2" sx={{ color: '#b0b7c3', fontWeight: 500 }}>
              Absolutely! Many events offer virtual participation options. Look for the "Online" tag or check the event details for a video link.
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}

export default About;