import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

interface User {
  id: string;
  userID: string;
  fullName: string;
  email: string;
  phone: string;
}

const ViewUserDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams(); 
  const [user, setUser] = useState<User | null>(null);

  const API_URL = import.meta.env.VITE_API_URL;
  const TOKEN = import.meta.env.VITE_TOKEN;

  const fetchUser = async () => {
    try {
      const response = await axios({
        method: "get",
        url: `${API_URL}/${id}`,
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        }
      });
      setUser(response.data.data); 
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  const handleEditClick = () => {
    if (user) {
      navigate("/edit-user", { state: user });
    }
  };

  if (!user) {
    return null;
  }

  return (
    <Box
      sx={{
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 2,
      }}
    >
      <Card
        sx={{
          width: "50%",
          boxShadow: 3,
          borderRadius: 2,
          padding: 2,
          position: "relative",
        }}
      >
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
          <Typography variant="h4" gutterBottom textAlign="center">
            User Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="subtitle1">
                <strong>ID:</strong> {user.userID || "N/A"}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">
                <strong>Name:</strong> {user.fullName || "N/A"}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">
                <strong>Email:</strong> {user.email || "N/A"}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">
                <strong>Phone:</strong> {user.phone || "N/A"}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ViewUserDetails;
