import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from 'react-router-dom';
import '../components/login.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';

// Yup schema
const validationSchema = Yup.object({
  emailAddress: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
  .min(6, 'Too Short!')
     .max(12, 'Too Long!')
    .required('Password is required')
});

function Login() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      emailAddress: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async values => {
      let result = await fetch("http://localhost:8080/ems/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const text = await result.text();
      if (result.status === 200) {
        alert(text); // Show success message
        navigate('/dashboard');
      } else {
        alert(text); // Show error message from backend
      }
    },
  });

  return (
    <Box
      className="login-container"
      sx={{ maxWidth: 400, mx: 'auto', mt: 8, p: 3, boxShadow: 3, borderRadius: 2, bgcolor: 'background.paper' }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Event Manager Login
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          label="Email"
          name="emailAddress"
          type="email"
          value={formik.values.emailAddress}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          fullWidth
          margin="normal"
          error={formik.touched.emailAddress && Boolean(formik.errors.emailAddress)}
          helperText={formik.touched.emailAddress && formik.errors.emailAddress}
          required
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          fullWidth
          margin="normal"
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Login
        </Button>
        <Link to="/signup">Signup</Link>
      </form>
    </Box>
  );
}

export default Login;