import React, { useState, useEffect } from "react";
import { TextField, Grid, Typography, Box, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

interface User {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  role: string;
  gender: string;
}

const EditUser: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState<User>({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    role: "",
    gender: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_URL = import.meta.env.VITE_API_URL;
  const TOKEN = import.meta.env.VITE_API_TOKEN; // Fix the token variable

  // Fetch user details for editing
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });

      const user = response.data;
      setFormData({
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        password: user.password,
        role: user.role,
        gender: user.gender,
      });
    } catch (err) {
      setError("Failed to fetch user data. Please try again.");
      console.error("Error fetching user:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Submit updated user details
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.put(
        `${API_URL}/user/${id}`,
        { ...formData },
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );

      console.log("User updated successfully:", response.data);
      navigate("/", { state: { message: "User updated successfully" } });
    } catch (err) {
      setError("Failed to update user data. Please try again.");
      console.error("Error updating user:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchData();
  }, [id]);

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

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
