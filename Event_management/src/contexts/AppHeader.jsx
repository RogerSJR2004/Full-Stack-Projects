import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';


function AppHeader() {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();


  const handleLogout = () => {
    logout();
    navigate('/');
  };


  return (
    <AppBar >
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Event Manager
        </Typography>


       
        {!isAuthenticated &&
        <>
        <Button color="inherit" component={Link} to="/">Home</Button>
            <Button color="inherit" component={Link} to="/featured">Featured</Button>
            <Button color="inherit" component={Link} to="/about">About</Button>
            <Button color="inherit" component={Link} to="/contact">Contact</Button>
            <Button color="inherit" component={Link} to="/login">Login</Button>


        </>
       
        }


        {isAuthenticated && (
          <>
            <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>
            <Button color="inherit" component={Link} to="/addevent">Add Event</Button>
            <Button color="inherit" component={Link} to="/events">Events</Button>
            <Button color="inherit" component={Link} to="/admin">Admin Panel</Button>

           
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
           <Typography sx={{ ml: 2 }}>{user?.data.emailAddress}</Typography>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}


export default AppHeader;
