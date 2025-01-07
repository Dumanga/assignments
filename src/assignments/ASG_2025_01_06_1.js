import { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Avatar,
  Card,
  CardContent,
  CardActions,
  CircularProgress,
  Divider,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginScreen({ setLogged }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);

  useEffect(() => {
    setMessage("");
  }, [email, password]);

  const handleSubmit = async () => {
    setLoading(true);
    setMessage("");
    try {
      const response = await axios.post("https://auth.dnjs.lk/api/login", {
        email,
        password,
      });
      const token = response.data.access_token;

      if (keepLoggedIn) {
        localStorage.setItem("token", token);
      } else {
        sessionStorage.setItem("token", token);
      }

      setLogged(true);
    } catch (err) {
      setMessage(
        err.response
          ? JSON.stringify(err.response.data.error.message)
          : "An error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box mt={3}>
      <TextField
        fullWidth
        label="Email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Password"
        type="password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ mb: 2 }}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={keepLoggedIn}
            onChange={(e) => setKeepLoggedIn(e.target.checked)}
          />
        }
        label="Keep me logged in"
      />
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={loading || !email || !password}
      >
        {loading ? <CircularProgress size={24} /> : "Submit"}
      </Button>
      {message && (
        <Box mt={2} textAlign="center">
          <Typography variant="body2" color="error">
            {message}
          </Typography>
        </Box>
      )}
    </Box>
  );
}

function ProfileScreen({ setLogged }) {
  const [userDetails, setUserDetails] = useState(null);
  const [editMode, setEditMode] = useState(false); // go between profile and edit options area
  const [editNameandDesMode, setEditNameandDesMode] = useState(false); // for editing name and description
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
      fetchUserDetails(token);
    }
  }, []);

  const fetchUserDetails = async (token) => {
    try {
      const response = await axios.get("https://auth.dnjs.lk/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserDetails(response.data);
      setName(response.data.name);
      setDescription(response.data.description);
    } catch (err) {
      console.error("Failed to fetch user details:", err);
    }
  };

  const handleLogout = async () => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    try {
      await axios.post("https://auth.dnjs.lk/api/logout", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      setLogged(false);
    }
  };

  const handleSaveDetails = async () => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    setLoading(true);
    try {
      await axios.put(
        "https://auth.dnjs.lk/api/user",
        { name, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Details updated successfully");
      // setEditNameandDesMode(false); // go back to edit options view if needed
      fetchUserDetails(token); // Refresh user details to see the changes
      setLoading(false);
    } catch (err) {
      console.error("Failed to save user details:", err);
      toast.error("Failed to update details");
      setLoading(false);
    }
  };

  return (
    <Box mt={3} textAlign="center">
      <ToastContainer position="top-right" autoClose={3000} />
      {editNameandDesMode ? (
        // edit Name and Description view area
        <Box>
          <Typography variant="h5" mb={2}>
            Name and Description
          </Typography>
          <Typography variant="body1" mb={3}>
            Your name and a short description about you
          </Typography>
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ mb: 2 }}
            disabled={loading}
          />
          <TextField
            fullWidth
            label="Description"
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={3}
            sx={{ mb: 3 }}
            disabled={loading}
          />
          <Box display="flex" justifyContent="space-between">
            <Button
              variant="contained"
              color="primary"
              onClick={() => setEditNameandDesMode(false)} // Close without saving
              disabled={loading}
            >
              Close
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={handleSaveDetails} // Save details
              disabled={loading}
            >
              Save Details
            </Button>
          </Box>
        </Box>
      ) : editMode ? (
        // edit profile options list area
        <Box>
          <Typography variant="h5" mb={2}>
            Edit Profile
          </Typography>
          <Typography variant="body1" mb={3}>
            Update your details and security options
          </Typography>
          <Box mb={3}>
            <Button
              variant="text"
              color="primary"
              onClick={() => setEditNameandDesMode(true)} // edit name and description area
            >
              Update Name and Description
            </Button>
            <br />
            <Button variant="text" color="primary" disabled>
              Update or Remove Avatar
            </Button>
            <br />
            <Button variant="text" color="primary" disabled> 
              Change Password
            </Button>
            <br />
            <Button variant="text" color="primary" disabled>
              Change Email
            </Button>
          </Box>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setEditMode(false)} // go back to profile view
          >
            Go Back
          </Button>
        </Box>
      ) : (
        // Profile details view area
        <Box>
          <Typography variant="h6" mb={4} color="success.main">
            Hellow There! Welcome to your profile
          </Typography>
          {userDetails ? (
            <Card sx={{ mt: 3, p: 2, textAlign: "center" }}>
              <Avatar
                alt={userDetails.name}
                src={userDetails.avatar}
                sx={{ width: 100, height: 100, margin: "0 auto" }}
              />
              <CardContent>
                <Typography variant="h6" mb={4}>
                  {userDetails.name}
                </Typography>
                <Typography variant="body1">Description: {userDetails.description}</Typography>
                <Typography variant="body1">Email: {userDetails.email}</Typography>
                <Typography variant="body2" color="text.secondary">
                  ID: {userDetails.id}
                </Typography>
              </CardContent>
              <Divider sx={{ my: 2 }} />
              <CardActions>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setEditMode(true)} // switch to edit options
                >
                  Edit Profile
                </Button>
                <Button variant="contained" color="error" onClick={handleLogout}>
                  Logout
                </Button>
              </CardActions>
            </Card>
          ) : (
            <CircularProgress />
          )}
        </Box>
      )}
    </Box>
  );
}


export default function Assignment14() {
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
      setLogged(true);
    }
  }, []);

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Box textAlign="center">
        <Typography variant="h4" mb={2}>
          Assignment 14
        </Typography>
        {logged ? (
          <Typography variant="h5" color="primary">
            Home Page - User Details 
          </Typography>
        ) : (
          <Typography variant="h5" color="primary">
            Login Page - User Authentication With Editing Options
          </Typography>
        )}
      </Box>
      {logged ? (
        <ProfileScreen setLogged={setLogged} />
      ) : (
        <LoginScreen setLogged={setLogged} />
      )}
    </Container>
  );
}
