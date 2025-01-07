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

  return (
    <Box mt={3} textAlign="center">
      <Typography variant="h6" mb={4} color="success.main">
        Successfully Logged In!
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
            <Typography variant="body1">Email: {userDetails.email}</Typography>
            <Typography variant="body2" color="text.secondary">
              ID: {userDetails.id}
            </Typography>
          </CardContent>
          <Divider sx={{ my: 2 }} />
          <CardActions>
            <Button variant="contained" color="error" onClick={handleLogout}>
              Logout
            </Button>
          </CardActions>
        </Card>
      ) : (
        <CircularProgress />
      )}
    </Box>
  );
}

export default function Assignment13() {
  const [logged, setLogged] = useState(false);

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Box textAlign="center">
        <Typography variant="h4" mb={2}>
          Assignment 13
        </Typography>
        {logged ? (
          <Typography variant="h5" color="primary">
            Home Page - User Details
          </Typography>
        ) : (
          <Typography variant="h5" color="primary">
            Login Page - SessionStorage & LocalStorage
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
