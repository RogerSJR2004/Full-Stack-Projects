import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
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
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  mobile: Yup.number().required("Mobile number is required"),
  occupation: Yup.string().required("Occupation is required"),
  gender: Yup.string().required("Gender is required"),
  dob: Yup.date().required("Date of Birth is required"),
  college: Yup.string().required("College is required"),
  password: Yup.string()
    .min(6, "Too Short!")
    .max(12, "Too Long!")
    .required("Password is required"),
});



const handleChange = (event) => {
  setAge(event.target.value);
};


function Signup() {


  const genderOptions =['Male', 'Female'];
  const occupationOptions = ['Student', 'Professional', 'Other'];

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Signup Logic
      alert(`Signed up as ${values.name} (${values.email})`);
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
          name="name"
          type="text"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          fullWidth
          margin="normal"
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
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
              <MenuItem key={option} value={option}>{option}</MenuItem>
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
          name="email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          fullWidth
          margin="normal"
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
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

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Signup
        </Button>
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Already have an account? <Link to="/login">Login</Link>
        </Typography>
      </form>
    </Box>
  );
}

export default Signup;
