import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

// Yup schema
const validationSchema = Yup.object({

    name: Yup.string()
    .name('Invalid name'),

    
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
   
  });