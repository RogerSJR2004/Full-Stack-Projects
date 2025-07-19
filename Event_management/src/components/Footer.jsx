import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function Footer() {
  return (
    <Box component="footer" sx={{
      width: '100%',
      py: 2,
      px: 1,
      mt: 'auto',
      background: 'linear-gradient(90deg, #a1c4fd 0%, #c2e9fb 100%)',
      textAlign: 'center',
      position: 'fixed',
      left: 0,
      bottom: 0,
      zIndex: 1201
    }}>
      <Typography variant="body2" color="text.secondary">
        © {new Date().getFullYear()} EventManager. All rights reserved.
      </Typography>
    </Box>
  );
}

export default Footer; 