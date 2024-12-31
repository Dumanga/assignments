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
} from "@mui/material";

export default function Assignment11() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");
  const [logged, setLogged] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    setMessage("");
  }, [email, password]);

  // check if there is a token in the local storage when reloading the page, 
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      setLogged(true);
      fetchUserDetails(storedToken);
    }
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    setMessage("");
    try {
      const response = await axios.post("https://auth.dnjs.lk/api/login", {
        email,
        password,
      });
      setToken(response.data.access_token);
      localStorage.setItem("token", response.data.access_token);
      setLogged(true);
      setEmail("");
      setPassword("");
      fetchUserDetails(response.data.access_token);
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

  const fetchUserDetails = async (accessToken) => {
    try {
      const response = await axios.get("https://auth.dnjs.lk/api/user", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setUserDetails(response.data);
    } catch (err) {
      console.error("Failed to fetch user details:", err);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Box textAlign="center">
        <Typography variant="h4"  mb={2} >
          Assignment 11
        </Typography>
        {logged ? (
          <Typography variant="h5" color="primary">
            Home Page - User Details
          </Typography>
        ) : (
          <Typography variant="h5" color="primary">
            Login Page - Email & Password
          </Typography>
        )}
      </Box>

      {logged ? (
        <>
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
                  <Typography variant="h6"  mb={4} >
                    {userDetails.name}
                  </Typography>
                  <Typography variant="body1">
                    Email: {userDetails.email}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ID: {userDetails.id}
                  </Typography>
                </CardContent>
                <Divider sx={{ my: 2 }} />
                <CardActions>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                      setLogged(false);
                      localStorage.removeItem("token");
                      setUserDetails(null);
                    }}
                  >
                    Logout
                  </Button>
                </CardActions>
              </Card>
            ) : (
              <CircularProgress />
            )}
          </Box>
        </>
      ) : (
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
      )}
    </Container>
  );
}
