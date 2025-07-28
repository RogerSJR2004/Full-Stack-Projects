import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, TextField, Typography, InputAdornment, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
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
  const [showForgot, setShowForgot] = React.useState(false);
  const [forgotEmail, setForgotEmail] = React.useState('');
  const [forgotPassword, setForgotPassword] = React.useState('');
  const [forgotLoading, setForgotLoading] = React.useState(false);
  const [forgotError, setForgotError] = React.useState('');
  const [forgotSuccess, setForgotSuccess] = React.useState('');
  const [showForgotPassword, setShowForgotPassword] = React.useState(false);
  const handleLogin = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post('http://localhost:8080/ems/v1/login', values);
      alert('Login Successful');
      // Store JWT and user info in localStorage
      if (response.data && response.data.jwt) {
        localStorage.setItem('Token', response.data.jwt);
        localStorage.setItem('userId', response.data.user);
        localStorage.setItem('emailAddress', response.data.emailAddress);
        localStorage.setItem('role', response.data.role);
      }
      navigate('/dashboard');
    } catch (error) {
      alert('Login Failed: ' + (error.response?.data || error.message));
    } finally {
      setSubmitting(false);
    }
  };

//   if (response.status === 200) {
//     const{jwt} = XPathResult.data;
//     localStorage.setItem('jwt', jwt);
//           navigate('/dashboard');
// } else {
//   alert('Invalid Credentials');
// }
// } catch (error) {
// alert('Login Failed');
// }
// }

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
              <Box sx={{ mt: 1, mb: 2, textAlign: 'right' }}>
                <Typography
                  variant="body2"
                  sx={{ cursor: 'pointer', color: '#1976d2', textDecoration: 'underline', display: 'inline-block' }}
                  onClick={() => setShowForgot(true)}
                  tabIndex={0}
                  role="button"
                >
                  Forgot password?
                </Typography>
              </Box>
              <Dialog open={Boolean(showForgot)} onClose={() => setShowForgot(false)}>
                <DialogTitle>Reset Password</DialogTitle>
                <DialogContent>
                  <Box component="form" onSubmit={async (e) => {
                    e.preventDefault();
                    setForgotLoading(true);
                    setForgotError('');
                    setForgotSuccess('');
                    try {
                      const res = await fetch('http://localhost:8080/ems/v1/updatepassword', {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          emailAddress: forgotEmail,
                          password: forgotPassword
                        })
                      });
                      if (!res.ok) {
                        const msg = await res.text();
                        throw new Error(msg || 'Failed to update password');
                      }
                      setForgotSuccess('Password updated successfully. Please login with your new password.');
                      setForgotEmail('');
                      setForgotPassword('');
                    } catch (err) {
                      setForgotError(err.message || 'Error updating password');
                    } finally {
                      setForgotLoading(false);
                    }
                  }} sx={{ mt: 1, minWidth: 320 }}>
                    <TextField
                      label="Email Address"
                      type="email"
                      fullWidth
                      required
                      margin="dense"
                      value={forgotEmail}
                      onChange={e => setForgotEmail(e.target.value)}
                    />
                    <TextField
                      label="New Password"
                      type={showForgotPassword ? 'text' : 'password'}
                      fullWidth
                      required
                      margin="dense"
                      value={forgotPassword}
                      onChange={e => setForgotPassword(e.target.value)}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => setShowForgotPassword((show) => !show)}
                              edge="end"
                              size="small"
                              tabIndex={-1}
                            >
                              {showForgotPassword ? <span role="img" aria-label="hide">🙈</span> : <span role="img" aria-label="show">👁️</span>}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    {forgotError && (
                      <Typography color="error" sx={{ mt: 1, fontSize: 14 }}>{forgotError}</Typography>
                    )}
                    {forgotSuccess && (
                      <Typography color="success.main" sx={{ mt: 1, fontSize: 14 }}>{forgotSuccess}</Typography>
                    )}
                    <DialogActions sx={{ px: 0, pt: 2 }}>
                      <Button onClick={() => setShowForgot(false)} disabled={forgotLoading}>Cancel</Button>
                      <Button type="submit" variant="contained" disabled={forgotLoading}>
                        {forgotLoading ? 'Updating...' : 'Update Password'}
                      </Button>
                    </DialogActions>
                  </Box>
                </DialogContent>
              </Dialog>
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