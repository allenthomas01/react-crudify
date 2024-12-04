import React from "react";
import {
  TextField,
  Grid,
  Typography,
  Box,
  Button,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import { Formik, Form } from "formik";
import * as Yup from "yup";

const API_URL = import.meta.env.VITE_API_URL;
const TOKEN = import.meta.env.VITE_TOKEN;

import { useNavigate } from "react-router-dom"; 

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Enter a valid email"),
  phone: Yup.string().matches(/^\d{10}$/, "Enter a valid phone number"),
  password: Yup.string()
    .min(6, "Atleast 6 characters is required")
    .required("password is required"),
  admin: Yup.object().shape({
    name: Yup.string().required("full name is required"),
    gender: Yup.string().required("gender is required"),
  }),
  roleID: Yup.string().required("Role is required"),
});

const CreateUser: React.FC = () => {
  const navigate = useNavigate(); 
  const initialValues = {
    email: "",
    phone: "",
    password: "",
    admin: { name: "", gender: "" },
    roleID: "",
  };

  const handleSubmit = async (
    values: typeof initialValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      const response = await axios.post(
        `${API_URL}/user`,
        {
          email: values.email,
          phone: values.phone,
          password: values.password,
          name: values.admin.name,
          gender: values.admin.gender,
          roleID: values.roleID,
        },
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );

      alert("User created successfully!");
      console.log(response.data);

      resetForm();
      navigate("/user");

    } catch (error) {
      console.error("Failed to create user:", error);
      alert("Failed to create user. Please try again.");
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, values, handleChange }) => (
        <Form>
          <Box
            sx={{
              width: "100%",
              mx: "8rem",
              boxSizing: "border-box",
            }}
          >
            <Typography variant="h5" mb={2}>
              Create User
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="admin.name"
                  value={values.admin.name}
                  onChange={handleChange}
                  error={touched.admin?.name && Boolean(errors.admin?.name)}
                  helperText={touched.admin?.name && errors.admin?.name}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  name="phone"
                  type="tel"
                  value={values.phone}
                  onChange={handleChange}
                  error={touched.phone && Boolean(errors.phone)}
                  helperText={touched.phone && errors.phone}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Role"
                  name="roleID"
                  select
                  value={values.roleID}
                  onChange={handleChange}
                  error={touched.roleID && Boolean(errors.roleID)}
                  helperText={touched.roleID && errors.roleID}
                >
                  <MenuItem value="8">Staff</MenuItem>
                  <MenuItem value="7">Manager</MenuItem>
                  <MenuItem value="4">Admin</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Gender"
                  name="admin.gender"
                  select
                  value={values.admin.gender}
                  onChange={handleChange}
                  error={touched.admin?.gender && Boolean(errors.admin?.gender)}
                  helperText={touched.admin?.gender && errors.admin?.gender}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </TextField>
              </Grid>
            </Grid>

            <Box mt={2} textAlign={"right"}>
              <Button type="submit" variant="contained" color="primary">
                Save
              </Button>
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default CreateUser;
