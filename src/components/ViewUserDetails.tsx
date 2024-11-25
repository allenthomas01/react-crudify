import React from 'react'
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import { useLocation } from "react-router-dom";

import { useNavigate } from "react-router-dom";

const ViewUserDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state;

  const handleEditClick = () => {
    navigate("/edit-user", { state: user });
  };

  return (
    <Box
      sx={{
        width: "100vw",
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
      }}
    >
      <Card sx={{ width: "100%", position: "relative" }}>
        <IconButton
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            color: "white",
            backgroundColor: "green",
          }}
          onClick={handleEditClick}
        >
          <EditIcon />
        </IconButton>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            User Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="subtitle1">
                <strong>ID:</strong> {user?.userID || "N/A"}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">
                <strong>Name:</strong> {user?.fullName || "N/A"}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">
                <strong>Email:</strong> {user?.email || "N/A"}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">
                <strong>Phone:</strong> {user?.phone || "N/A"}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ViewUserDetails;
