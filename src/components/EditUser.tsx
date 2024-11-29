import React, { useState, useEffect } from "react";
import { TextField, Grid, Typography, Box, Button, MenuItem } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
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

  const [formData, setFormData] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = import.meta.env.VITE_API_URL;
  const TOKEN = import.meta.env.VITE_TOKEN;

  // Fetch user details
  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });

      const user = response.data.data; // Access the "data" field from the response object

      setFormData({
        email: user.email || "",
        phone: user.phone || "",
        admin: {
          name: user.admin?.name || "",
          gender: user.admin?.gender || "",
        },
        userRole: user.userRole || [],
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
    setFormData((prev) =>
      prev
        ? {
            ...prev,
            [name]: value,
          }
        : null
    );
  };

  // Handle nested admin field changes
  const handleAdminChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) =>
      prev
        ? {
            ...prev,
            admin: {
              ...prev.admin,
              [name]: value,
            },
          }
        : null
    );
  };

  // Handle role selection
  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prev) =>
      prev
        ? {
            ...prev,
            userRole: [
              {
                role: {
                  id: value,
                  name: "", // Name is optional here since the backend identifies by ID
                },
              },
            ],
          }
        : null
    );
  };

  // Submit updated user details
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      const payload = {
        email: formData?.email,
        phone: formData?.phone,
        admin: {
          name: formData?.admin.name,
          gender: formData?.admin.gender,
        },
        userRole: formData?.userRole.map((roleObj) => ({
          role: {
            id: roleObj.role.id,
          },
        })),
      };

      await axios.put(`${API_URL}/${id}`, payload, {
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

  useEffect(() => {
    if (id) fetchData();
  }, [id]);

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!formData) {
    return <Typography>Error: No user data available.</Typography>;
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
            name="name"
            value={formData.admin.name}
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
            label="Gender"
            name="gender"
            select
            value={formData.admin.gender}
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
            value={formData.userRole[0]?.role.id || ""}
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