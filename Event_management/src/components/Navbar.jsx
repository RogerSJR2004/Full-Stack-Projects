import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import '../components/auth-dark.css';

function Navbar() {
  return (
    <AppBar position="static" className="app-navbar">
      <Toolbar>
        <Typography variant="h6" component={RouterLink} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit', fontWeight: 700 }}>
          EventManager
        </Typography>
        <Box>
          <Button component={RouterLink} to="/">Home</Button>
          <Button component={RouterLink} to="/events">Events</Button>
          <Button component={RouterLink} to="/about">About</Button>
          <Button component={RouterLink} to="/contact">Contact</Button>
          <Button component={RouterLink} to="/login">Login</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar; 