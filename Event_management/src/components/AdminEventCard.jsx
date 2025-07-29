import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import PeopleIcon from '@mui/icons-material/People';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import VisibilityIcon from '@mui/icons-material/Visibility';
import '../components/auth-dark.css';

export default function AdminEventCard({ event, onClick, onEdit, onViewEnrollments }) {
  const imageUrl = event.event_image_link || event.image || event.imageUrl || '/static/images/cards/contemplative-reptile.jpg';
  
  const formatDate = (dateString) => {
    if (!dateString) return 'TBD';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const getStatusColor = (status) => {
    return status === 1 ? 'success' : 'default';
  };

  const getStatusText = (status) => {
    return status === 1 ? 'Active' : 'Inactive';
  };

  const isUpcoming = () => {
    if (!event.event_date) return false;
    const eventDate = new Date(event.event_date);
    const now = new Date();
    return eventDate >= now;
  };

  return (
    <Card 
      className="event-card" 
      sx={{ 
        maxWidth: 400, 
        mb: 3, 
        borderRadius: 3, 
        boxShadow: 6, 
        background: 'rgba(36,41,54,0.92) !important', 
        color: '#e3e9f7', 
        border: '1.5px solid rgba(255,255,255,0.06)', 
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        '&:hover': { 
          transform: 'translateY(-8px)', 
          boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
          borderColor: 'rgba(123, 182, 255, 0.3)'
        } 
      }}
      onClick={onClick}
    >
      <CardMedia
        component="img"
        alt={event.event_name || 'Event image'}
        height="200"
        image={imageUrl}
        sx={{ objectFit: 'cover' }}
      />
      
      <CardContent sx={{ p: 3 }}>
        {/* Event Title and Status */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography 
            gutterBottom 
            variant="h5" 
            component="div" 
            sx={{ 
              color: '#7bb6ff', 
              fontWeight: 700,
              flex: 1,
              mr: 2
            }}
          >
            {event.event_name}
          </Typography>
          <Chip 
            label={getStatusText(event.status)} 
            color={getStatusColor(event.status)}
            size="small"
            sx={{ 
              fontWeight: 600,
              minWidth: 60
            }}
          />
        </Box>

        {/* Event Details Grid */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <CalendarTodayIcon sx={{ color: '#7bb6ff', fontSize: 18, mr: 1 }} />
              <Typography variant="body2" sx={{ color: '#b0b7c3' }}>
                {formatDate(event.event_date)}
              </Typography>
            </Box>
          </Grid>
          
          {event.event_location && (
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <LocationOnIcon sx={{ color: '#7bb6ff', fontSize: 18, mr: 1 }} />
                <Typography variant="body2" sx={{ color: '#b0b7c3' }}>
                  {event.event_location}
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>

        {/* Event Description */}
        <Typography 
          variant="body2" 
          sx={{ 
            color: '#e3e9f7',
            mb: 2,
            lineHeight: 1.6,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {event.event_description || 'No description available'}
        </Typography>

        {/* Event Status Indicators */}
        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <Chip 
            label={isUpcoming() ? 'Upcoming' : 'Past'} 
            color={isUpcoming() ? 'primary' : 'default'}
            size="small"
            sx={{ 
              fontWeight: 600,
              background: isUpcoming() ? 'rgba(123, 182, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)',
              color: isUpcoming() ? '#7bb6ff' : '#b0b7c3'
            }}
          />
          {event.event_link && (
            <Chip 
              label="Has Link" 
              color="info"
              size="small"
              sx={{ 
                fontWeight: 600,
                background: 'rgba(33, 150, 243, 0.2)',
                color: '#2196f3'
              }}
            />
          )}
        </Box>
      </CardContent>

      <CardActions sx={{ p: 3, pt: 0 }}>
        <Box sx={{ display: 'flex', gap: 1, width: '100%' }}>
          <Tooltip title="View Details">
            <Button 
              size="small" 
              variant="outlined"
              startIcon={<VisibilityIcon />}
              sx={{ 
                fontWeight: 700, 
                borderRadius: 2, 
                px: 2, 
                py: 1,
                borderColor: 'rgba(123, 182, 255, 0.5)',
                color: '#7bb6ff',
                '&:hover': {
                  borderColor: '#7bb6ff',
                  background: 'rgba(123, 182, 255, 0.1)'
                }
              }}
              onClick={(e) => {
                e.stopPropagation();
                onClick(event);
              }}
            >
              View
            </Button>
          </Tooltip>
          
          <Tooltip title="View Enrollments">
            <Button 
              size="small" 
              variant="outlined"
              startIcon={<PeopleIcon />}
              sx={{ 
                fontWeight: 700, 
                borderRadius: 2, 
                px: 2, 
                py: 1,
                borderColor: 'rgba(76, 175, 80, 0.5)',
                color: '#4caf50',
                '&:hover': {
                  borderColor: '#4caf50',
                  background: 'rgba(76, 175, 80, 0.1)'
                }
              }}
              onClick={(e) => {
                e.stopPropagation();
                onViewEnrollments && onViewEnrollments(event);
              }}
            >
              Enrollments
            </Button>
          </Tooltip>
          
          <Tooltip title="Edit Event">
            <IconButton 
              size="small"
              sx={{ 
                color: '#ff9800',
                border: '1px solid rgba(255, 152, 0, 0.5)',
                '&:hover': {
                  background: 'rgba(255, 152, 0, 0.1)',
                  borderColor: '#ff9800'
                }
              }}
              onClick={(e) => {
                e.stopPropagation();
                onEdit && onEdit(event);
              }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </CardActions>
    </Card>
  );
} 