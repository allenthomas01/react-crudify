import React from "react";
import { TextField, Grid, Typography, Box } from "@mui/material";


const CreateUser: React.FC = () => {


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
            required
          />
        </Grid>

        
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            required
          />
        </Grid>


        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Phone"
            name="phone"
            type="phone"

            required
          />
        </Grid>

  
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            required
          />
        </Grid>

      
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Role"
            name="role"
            type="role"
            required
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Gender"
            name="gender"
            type="gender"
            required
          />
        </Grid>
        
      </Grid>
    </Box>
  );
};

export default CreateUser;
