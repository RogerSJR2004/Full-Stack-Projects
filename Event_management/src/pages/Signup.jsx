import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
// import SelectField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import "../components/login.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import Select from '@mui/material/Select';
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";


// Yup validation schema
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
    <Box
      className="login-container"
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 8,
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
        bgcolor: "background.paper",
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Event Manager Signup
      </Typography>
      <form onSubmit={formik.handleSubmit}>
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
        />
        <FormControl fullWidth margin="normal" error={formik.touched.occupation && Boolean(formik.errors.occupation)} required>
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
        <FormControl fullWidth margin="normal" error={formik.touched.gender && Boolean(formik.errors.gender)} required>
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
          sx={{ mt: 2 }}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Signing up...' : 'Signup'}
        </Button>
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Already have an account? <Link to="/login">Login</Link>
        </Typography>
      </form>
    </Box>
  );
}

export default Signup;
