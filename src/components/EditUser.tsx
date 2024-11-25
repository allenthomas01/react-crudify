import React, { useState } from "react";
import { TextField, Grid, Typography, Box, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

interface User {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  role: string;
  gender: string;
}

const EditUser: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state as User | undefined;

  const [formData, setFormData] = useState<User>({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    password: user?.password || "", 
    role: user?.role || "",
    gender: user?.gender || "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Updated User Data:", formData);

    
    navigate("/view-user", { state: formData }); 
  };

  return (
    <Box
      component="form"
      sx={{
        width: "100%",
        px: "8rem",
        boxSizing: "border-box",
      }}
      onSubmit={handleFormSubmit}
    >
      <Typography variant="h5" mb={2}>
        Edit User
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Full Name"
            name="fullName"
            value={formData.fullName}
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
            value={formData.email}
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
            value={formData.phone}
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
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Role"
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            required
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Gender"
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            required
          />
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
