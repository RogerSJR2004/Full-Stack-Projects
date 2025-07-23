import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
} from '@mui/material';

//  Validation Schema using Yup
const validationSchema = Yup.object({
  emailAddress: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});



const styles = {
  container: {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3f3f3',
  },
  paper: {
    padding: '30px',
    width: '350px',
    borderRadius: '8px',
    backgroundColor: '#fff',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    fontWeight: 600,
  },
  button: {
    marginTop: '16px',
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#1976d2',
    color: 'white',
  },
};


export default function Login() {

  const handleLogin = async (values, { setSubmitting }) => {
  try {
    const response = await axios.post('http://localhost:8080/ems/v1/login', values);
    console.log('Login Success:', response.data);
    alert('Login Successful');

    
    
    navigate('/dashboard');

  } catch (error) {
    console.error('Login Error:', error.response?.data || error.message);
    alert('Login Failed: ' + (error.response?.data || error.message));
  } finally {
    setSubmitting(false);
  }
};
  const navigate = useNavigate();


  return (
    <Formik
      initialValues={{ emailAddress: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={handleLogin}
    >
      {({ handleChange, handleBlur, values, errors, touched }) => (
        <Box style={styles.container}>
          <Paper elevation={3} style={styles.paper}>
            <Typography variant="h5" style={styles.title}>
              Login
            </Typography>

            <Form>
              <TextField
                fullWidth
                label="Email"
                name="emailAddress"
                type="email"
                value={values.emailAddress}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.emailAddress && Boolean(errors.emailAddress)}
                helperText={touched.emailAddress && errors.emailAddress}
                style={{ marginBottom: '16px' }}
              />

              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                style={{ marginBottom: '8px' }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                style={styles.button}
              >
                Login
              </Button>
               <Typography variant="body2" sx={{ mt: 2 }}>
                Not having account?{' '}
                <Link to="/signup" style={{ color: 'blue' }}>
                  Signup here
                </Link>
              </Typography>

              <Typography variant="body2" sx={{ mt: 1 }}>
                <Link to="/" style={{ color: '#007BFF', textDecoration: 'none' }}>
                  ← Back to Home
                </Link>
              </Typography>
            </Form>
             
          </Paper>
        </Box>
      )}
    </Formik>
  );
} 