import React from "react";
import { TextField, Grid, Typography, Box, Button } from "@mui/material";
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import axios from "axios";

interface User {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  role: string;
  gender: string;
}

const API_URL = import.meta.env.VITE_API_URL;
const TOKEN = import.meta.env.VITE_API_TOKEN;
console.log(API_URL)

const CreateUser: React.FC = () => {
  const [userData, setUserData] = React.useState<User>({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    role: "",
    gender: "",
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
        url: API_URL,
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
        data: userData, 
      });

      alert("User data created successfully");
      console.log(response.data);

      
      setUserData({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        role: "",
        gender: "",
      });
    } catch (error) {
      console.error("Could not save:", error);
      alert("Failed to save user data. Please try again.");
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
            name="fullName" 
            value={userData.fullName}
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
          <FormControl fullWidth required>
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              labelId="role-label"
              id="role-select"
              name="role" 
              value={userData.role}
              onChange={handleSelectChange} 
            >
              <MenuItem value={"admin"}>Admin</MenuItem>
              <MenuItem value={"editor"}>Editor</MenuItem>
              <MenuItem value={"viewer"}>Viewer</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required>
            <InputLabel id="gender-label">Gender</InputLabel>
            <Select
              labelId="gender-label"
              id="gender-select"
              name="gender" 
              value={userData.gender}
              onChange={handleSelectChange}
            >
              <MenuItem value={"male"}>Male</MenuItem>
              <MenuItem value={"female"}>Female</MenuItem>
              <MenuItem value={"other"}>Other</MenuItem>
            </Select>
          </FormControl>
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
