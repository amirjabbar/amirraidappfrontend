import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link } from "react-router-dom";
import { setLoggedIn } from "../Reducer/Authslice";

const defaultTheme = createTheme();

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const TogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      let loginData = {
        email,
        password,
      };
      const response = await axios.post(
        "http://localhost:3200/login",
        loginData
      );
      sessionStorage.setItem("token", response.data.token);
      dispatch(setLoggedIn());
      sessionStorage.setItem("isLoggedIn", "true");
      alert("Login successful");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Unable to login");
    }
    setEmail("");
    setPassword("");
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            justifyContent: "center",
            padding: "2rem",
            minHeight: "450px",
            borderRadius: "8px",
            boxShadow: 3,
          }}
          className="flex flex-col w-[100%] text-white bg-[#252a40] rounded-[30px] gap-2 px-[25px] py-[10px] border-2 border-new"
        >
          <Typography component="h1" variant="h5" sx={{ color: "#fff" }}>
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1, width: "100%" }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="off"
              autoFocus
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#fff",
                  },
                  "&:hover fieldset": {
                    borderColor: "#fff",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#fff",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#fff",
                  "&.Mui-focused": {
                    color: "#fff",
                  },
                },
                "& .MuiInputBase-input": {
                  color: "#fff",
                  "&:-webkit-autofill": {
                    WebkitBoxShadow: "0 0 0 1000px #252a40 inset", // Match this color to your input field background
                    WebkitTextFillColor: "#fff", // Keep the text color white
                  },
                  "&:-webkit-autofill::first-line": {
                    color: "#fff", // Ensures the first line of text is white
                  },
                },
                "& .MuiOutlinedInput-input::placeholder": {
                  color: "#fff",
                },
                "& .MuiFormHelperText-root": {
                  color: "#fff",
                },
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#fff",
                  },
                  "&:hover fieldset": {
                    borderColor: "#fff",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#fff",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#fff",
                  "&.Mui-focused": {
                    color: "#fff",
                  },
                },
                "& .MuiInputBase-input": {
                  color: "#fff",
                  "&:-webkit-autofill": {
                    WebkitBoxShadow: "0 0 0 1000px #252a40 inset", // Match this color to your input field background
                    WebkitTextFillColor: "#fff", // Keep the text color white
                  },
                  "&:-webkit-autofill::first-line": {
                    color: "#fff", // Ensures the first line of text is white
                  },
                },
                "& .MuiOutlinedInput-input::placeholder": {
                  color: "#fff",
                },
                "& .MuiFormHelperText-root": {
                  color: "#fff",
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={TogglePassword}
                      edge="end"
                      sx={{ color: "#fff" }} // Set the color of the icon to white
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              color="primary"
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                background: "linear-gradient(90deg, #7f00ff 0%, #e100ff 100%)",
                color: "white",
                "&:hover": {
                  background:
                    "linear-gradient(90deg, #6a00ff 0%, #d100ff 100%)",
                },
                borderRadius: "8px",
              }}
            >
              Sign In
            </Button>

            <Link
              to="/Register"
              style={{ color: "#fff", textDecoration: "none" }}
            >
              {"Don't have an account? Sign up"}
            </Link>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignIn;
