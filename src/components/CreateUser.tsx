import React from "react";
import { TextField, Grid, Typography, Box, Button } from "@mui/material";
import { MenuItem, SelectChangeEvent } from "@mui/material"; 
import axios from "axios";

interface User {
  name: string;
  gender: string;
  roleID: string;
  phone: string;
  email: string;
  userType: string;
  password: string;
}

const API_URL = import.meta.env.VITE_API_URL;
const TOKEN = import.meta.env.VITE_TOKEN;

console.log("token is", TOKEN);

const CreateUser: React.FC = () => {
  const [userData, setUserData] = React.useState<User>({
    name: "",
    gender: "",
    phone: "",
    email: "",
    roleID: "",
    userType: "",
    password: "",
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSave = async () => {
    try {
      const response = await axios({
        method: "post",
        url: `${API_URL}`,
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
        data: userData,
      });

      alert("User created successfully!");
      console.log(response.data);

      // Reset form 
      setUserData({
        name: "",
        gender: "",
        phone: "",
        roleID: "adfsfdsf", // reset to default value
        email: "",
        userType: "admin",
        password: "",
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
            value={userData.name}
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
            onChange={handleSelectChange}
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
            value={userData.gender}
            onChange={handleSelectChange}
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
