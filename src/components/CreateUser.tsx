import React, { useState } from "react";
import { TextField, Grid, Typography, Box, Button, MenuItem } from "@mui/material";
import axios from "axios";

interface User {
  email: string;
  phone: string;
  password: string;
  admin: {
    name: string;
    gender: string;
  };
  roleID: string; // Backend expects roleID directly
}

const API_URL = import.meta.env.VITE_API_URL;
const TOKEN = import.meta.env.VITE_TOKEN;

const CreateUser: React.FC = () => {
  const [userData, setUserData] = useState<User>({
    email: "",
    phone: "",
    password: "",
    admin: { name: "", gender: "" },
    roleID: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === "name" || name === "gender") {
      setUserData((prev) => ({
        ...prev,
        admin: { ...prev.admin, [name]: value },
      }));
    } else {
      setUserData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async () => {
    // Validate required fields
    if (
      !userData.email ||
      !userData.phone ||
      !userData.password ||
      !userData.admin.name ||
      !userData.admin.gender ||
      !userData.roleID
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}`,
        {
          email: userData.email,
          phone: userData.phone,
          password: userData.password,
          name: userData.admin.name, // Flattened for the backend
          gender: userData.admin.gender,
          roleID: userData.roleID,
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

      // Reset form
      setUserData({
        email: "",
        phone: "",
        password: "",
        admin: { name: "", gender: "" },
        roleID: "",
      });
    } catch (error) {
      console.error("Failed to create user:", error);
      alert("Failed to create user. Please try again.");
    }
  };

  return (
    <Box
      component="form"
      sx={{
        width: "100%",
        px: "8rem",
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
            name="name"
            value={userData.admin.name}
            onChange={handleInputChange}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={userData.email}
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
            value={userData.phone}
            onChange={handleInputChange}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={userData.password}
            onChange={handleInputChange}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Role"
            name="roleID"
            select
            value={userData.roleID}
            onChange={handleInputChange}
            required
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
            name="gender"
            select
            value={userData.admin.gender}
            onChange={handleInputChange}
            required
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </TextField>
        </Grid>
      </Grid>

      <Box mt={2} textAlign="right">
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default CreateUser;
