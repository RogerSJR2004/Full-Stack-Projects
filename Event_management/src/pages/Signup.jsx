import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useNavigate, Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import * as Yup from "yup";
import Select from '@mui/material/Select';
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import '../components/auth-dark.css';

const validationSchema = Yup.object({
  fullName: Yup.string().required("Name is required"),
  emailAddress: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  mobile: Yup.string().required("Mobile number is required"),
  occupation: Yup.string().required("Occupation is required"),
  gender: Yup.string().required("Gender is required"),
  dob: Yup.date().required("Date of Birth is required"),
  college: Yup.string().required("College is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

function Signup() {
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const genderOptions = [
    { label: 'Male', value: 1 },
    { label: 'Female', value: 2 }
  ];
  const occupationOptions = ['Student', 'Professional', 'Other'];

  const formik = useFormik({
    initialValues: {
      fullName: "",
      emailAddress: "",
      password: "",
      mobile: "",
      occupation: "",
      gender: "",
      dob: "",
      college: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setSubmitError("");
      setIsSubmitting(true);
      const payload = {
        ...values,
      };
      try {
        let result = await fetch("http://localhost:8080/ems/v1/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        if (result.status === 201) {
          alert(`Signup successful for ${values.fullName}`);
          navigate('/login');
        } else {
          let errorMsg = "Signup failed";
          try {
            const errorData = await result.json();
            errorMsg = errorData.message || errorMsg;
          } catch {
            errorMsg = await result.text();
          }
          setSubmitError(errorMsg);
        }
      } catch (err) {
        setSubmitError("Network error. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <Box className="auth-bg-root">
      <Box className="auth-glass-card">
        <Box className="auth-icon-wrapper">
          <PersonAddAlt1OutlinedIcon className="auth-icon" />
        </Box>
        <Typography variant="h4" className="auth-title" gutterBottom>
          Create Account
        </Typography>
        <Typography variant="subtitle1" className="auth-subtitle" gutterBottom>
          Sign up to get started
        </Typography>
        <form onSubmit={formik.handleSubmit} autoComplete="off">
          <TextField
            label="Name"
            name="fullName"
            type="text"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
            margin="normal"
            error={formik.touched.fullName && Boolean(formik.errors.fullName)}
            helperText={formik.touched.fullName && formik.errors.fullName}
            required
            className="auth-input"
            autoComplete="off"
          />
          <TextField
            label="Mobile Number"
            name="mobile"
            type="text"
            value={formik.values.mobile}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
            margin="normal"
            error={formik.touched.mobile && Boolean(formik.errors.mobile)}
            helperText={formik.touched.mobile && formik.errors.mobile}
            required
            className="auth-input"
            autoComplete="off"
          />
          <FormControl fullWidth margin="normal" error={formik.touched.occupation && Boolean(formik.errors.occupation)} required className="auth-input">
            <InputLabel id="occupation-label">Occupation</InputLabel>
            <Select
              labelId="occupation-label"
              id="occupation"
              name="occupation"
              value={formik.values.occupation || ''}
              label="Occupation"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              {occupationOptions.map((option) => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </Select>
            {formik.touched.occupation && formik.errors.occupation && (
              <Typography variant="caption" color="error">{formik.errors.occupation}</Typography>
            )}
          </FormControl>
          <FormControl fullWidth margin="normal" error={formik.touched.gender && Boolean(formik.errors.gender)} required className="auth-input">
            <InputLabel id="gender-label">Gender</InputLabel>
            <Select
              labelId="gender-label"
              id="gender"
              name="gender"
              value={formik.values.gender || ''}
              label="Gender"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              {genderOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
              ))}
            </Select>
            {formik.touched.gender && formik.errors.gender && (
              <Typography variant="caption" color="error">{formik.errors.gender}</Typography>
            )}
          </FormControl>
          <TextField
            label="Date of Birth"
            name="dob"
            type="date"
            value={formik.values.dob || ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            error={formik.touched.dob && Boolean(formik.errors.dob)}
            helperText={formik.touched.dob && formik.errors.dob}
            required
            className="auth-input"
            autoComplete="off"
          />
          <TextField
            label="College Name"
            name="college"
            type="text"
            value={formik.values.college}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
            margin="normal"
            error={formik.touched.college && Boolean(formik.errors.college)}
            helperText={formik.touched.college && formik.errors.college}
            required
            className="auth-input"
            autoComplete="off"
          />
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
            className="auth-input"
            autoComplete="off"
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
            className="auth-input"
            autoComplete="off"
          />
          {submitError && (
            <Typography color="error" align="center" sx={{ mt: 1 }}>
              {submitError}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className="auth-btn"
            sx={{ mt: 2 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing up...' : 'Signup'}
          </Button>
          <Typography variant="body2" align="center" className="auth-link-text">
            Already have an account? <Link to="/login" className="auth-link">Login</Link>
          </Typography>
        </form>
      </Box>
    </Box>
  );
}

export default Signup;
