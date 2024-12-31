import { useEffect, useState } from "react";
import axios from "axios";

export default function Assignment10() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");
  const [logged, setLogged] = useState(false);

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
      console.log(response);
      setToken(response.data.access_token);
      localStorage.setItem("token", token);     
      setLogged(true);
      setEmail("");
      setPassword("");
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
    <div style={{ marginLeft: "16px" }}>
      <h1>Assignment 10</h1>
      <h1>Login Page - email & password</h1>
      {logged ? (
        <>
          <h2>Successfully logged in!</h2>
          <h3>Access Token: {token}</h3>
          <button onClick={() => {
            setLogged(false);
            localStorage.removeItem("token");
          }}>Logout</button>
        </>
      ) : (
        <>
          {/* <h3>Sample email : niketh.minsara12@gmail.com || Sample Pw: yourPass@123</h3> */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ marginBottom: "16px" }}
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginBottom: "16px" }}
          />
          <br />
          <button
            onClick={handleSubmit}
            disabled={loading || !email || !password}
          >
            {loading ? "Loading..." : "Submit"}
          </button>
          <br />
          <br />
          <br />
          <br />
          {message && (
            <>
              <hr />
              <div
                style={{ color: "red" }}
              >
                {message}
              </div>
              <hr />
            </>
          )}
        </>
      )}
    </div>
  );
}
