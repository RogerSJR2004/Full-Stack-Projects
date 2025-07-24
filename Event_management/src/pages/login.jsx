import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, TextField, Typography, InputAdornment, IconButton } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import '../components/auth-dark.css';

const validationSchema = Yup.object({
  emailAddress: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post('http://localhost:8080/ems/v1/login', values);
      alert('Login Successful');
      navigate('/dashboard');
    } catch (error) {
      alert('Login Failed: ' + (error.response?.data || error.message));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box className="auth-bg-root">
      <Box className="auth-glass-card">
        <Box className="auth-icon-wrapper">
          <LockOutlinedIcon className="auth-icon" />
        </Box>
        <Typography variant="h4" className="auth-title" gutterBottom>
          Welcome Back
        </Typography>
        <Typography variant="subtitle1" className="auth-subtitle" gutterBottom>
          Sign in to your account
        </Typography>
        <Formik
          initialValues={{ emailAddress: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {({ handleChange, handleBlur, values, errors, touched, isSubmitting }) => (
            <Form autoComplete="off">
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
                className="auth-input"
                margin="normal"
                autoComplete="off"
              />
              <TextField
                fullWidth
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                className="auth-input"
                margin="normal"
                autoComplete="off"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword((show) => !show)}
                        edge="end"
                        size="small"
                        tabIndex={-1}
                      >
                        {showPassword ? <span role="img" aria-label="hide">🙈</span> : <span role="img" aria-label="show">👁️</span>}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className="auth-btn"
                disabled={isSubmitting}
              >
                Login
              </Button>
              <Typography variant="body2" align="center" className="auth-link-text">
                Not having account?{' '}
                <Link to="/signup" className="auth-link">Signup here</Link>
              </Typography>
              <Typography variant="body2" align="center" className="auth-link-text">
                <Link to="/" className="auth-link">← Back to Home</Link>
              </Typography>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
} 