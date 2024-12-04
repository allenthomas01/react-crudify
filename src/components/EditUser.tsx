import React, { useState, useEffect } from "react";
import { TextField, Grid, Typography, Box, Button, MenuItem } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import {Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";

interface User {
  email: string;
  phone: string;
  admin: {
    name: string;
    gender: string;
  };
  userRole: {
    role: {
      id: string;
      name: string;
    };
  }[];
}

const EditUser: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // const [values, setFormData] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const[initialValues,setInitialValues]=useState({
    email:"",
    phone:"",
    admin:{name:"",gender:""},
    userRole:[{role:{id:""}}],
  });

  const API_URL = import.meta.env.VITE_API_URL;
  const TOKEN = import.meta.env.VITE_TOKEN;

  useEffect(()=>{
  // Fetch user details
  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/user/${id}`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });

      const user = response.data.data; 

      setInitialValues({
        email: user.email || "",
        phone: user.phone || "",
        admin: {
          name: user.admin?.name || "",
          gender: user.admin?.gender || "",
        },
        userRole: user.userRole || [{role:{id:""}}],
      });
    } catch (err) {
      setError("Failed to fetch user data. Please try again.");
      console.error("Error fetching user:", err);
    } finally {
      setIsLoading(false);
    }
  };

  if(id){
    fetchData();
  }
},[id]);





  // Submit updated user details
  const handleSubmit = async (values:typeof initialValues) => {
  
    try {
      setIsLoading(true);

      const payload = {
        email: values?.email,
        phone: values?.phone,
        admin: {
          name: values?.admin.name,
          gender: values?.admin.gender,
        },
        userRole: values?.userRole.map((roleObj) => ({
          role: {
            id: roleObj.role.id,
          },
        })),
      };

      await axios.put(`${API_URL}/user/${id}`, payload, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
      });

      navigate("/", { state: { message: "User updated successfully" } });
    } catch (err) {
      setError("Failed to update user data. Please try again.");
      console.error("Error updating user:", err);
    } finally {
      setIsLoading(false);
    }
  };

 

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  // if (!values) {
  //   return <Typography>Error: No user data available.</Typography>;
  // }

  return (
    <Box
      component="form"
      sx={{
        width: "100%",
        px: "8rem",
        boxSizing: "border-box",
      }}
      onSubmit={handleSubmit}
    >
      <Typography variant="h5" mb={2}>
        Edit User
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Full Name"
            name="name"
            value={values.admin.name}
            onChange={handleAdminChange}
            required
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleInputChange}
            required
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Phone"
            name="phone"
            type="tel"
            value={values.phone}
            onChange={handleInputChange}
            required
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Gender"
            name="gender"
            select
            value={values.admin.gender}
            onChange={handleAdminChange}
            required
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Role"
            name="role"
            select
            value={values.userRole[0]?.role.id || ""}
            onChange={handleRoleChange}
            required
          >
            <MenuItem value="4">Reseller</MenuItem>
            <MenuItem value="7">Manager</MenuItem>
            <MenuItem value="8">Staff</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" color="primary" type="submit">
            Save Changes
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EditUser;