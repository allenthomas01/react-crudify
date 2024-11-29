import React from "react";
import { TextField, Grid, Typography, Box, Button, MenuItem } from "@mui/material";
import axios from "axios";

interface User {
  id: string;
  email: string;
  phone: string;
  password: string;
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

const API_URL = import.meta.env.VITE_API_URL;
const TOKEN = import.meta.env.VITE_TOKEN;

const CreateUser: React.FC = () => {
  const [userData, setUserData] = React.useState<User>({
    id: "",
    email: "",
    phone: "",
    password: "",
    admin: {
      name: "",
      gender: "",
    },
    userRole: [
      {
        role: {
          id: "",
          name: "",
        },
      },
    ],
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    // Handle nested updates for `admin`
    if (name === "name" || name === "gender") {
      setUserData((prev) => ({
        ...prev,
        admin: {
          ...prev.admin,
          [name]: value,
        },
      }));
    } else {
      setUserData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleRoleChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const { value } = event.target as { value: string };
    setUserData((prev) => ({
      ...prev,
      userRole: [
        {
          role: {
            id: value,
            name: "", // Name can be set dynamically if needed
          },
        },
      ],
    }));
  };

  const handleSave = async () => {
    console.log("User data being sent:", userData);

    const payload = {
      admin: userData.admin,
      email: userData.email,
      phone: userData.phone,
      password: userData.password,
      userRole: userData.userRole,
    };

    try {
      const response = await axios.post(API_URL, payload, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
      });

      alert("User created successfully!");
      console.log("Response data:", response.data);

      setUserData({
        id: "",
        email: "",
        phone: "",
        password: "",
        admin: {
          name: "",
          gender: "",
        },
        userRole: [
          {
            role: {
              id: "",
              name: "",
            },
          },
        ],
      });
    } catch (error) {
      console.error("Failed to create user:", error);
      alert("Failed to create user. Please check your input and try again.");
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
            value={userData.userRole[0].role.id}
            onChange={handleRoleChange}
            required
          >
            <MenuItem value="4">Reseller</MenuItem>
            <MenuItem value="7">Manager</MenuItem>
            <MenuItem value="8">Staff</MenuItem>
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
