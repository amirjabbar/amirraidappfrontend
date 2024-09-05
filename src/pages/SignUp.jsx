import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Link } from "react-router-dom";
import ProgressBar from "../components/Progressbar/ProgressBar";

import Loader from "../../src/assets/Loader.gif";
import { retry } from "@reduxjs/toolkit/query";

const defaultTheme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(0);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [llmOption, setLlmOption] = useState("");
  // const [link, setLink] = useState("");
  // const [files, setFiles] = useState(null);
  const [baselineFile, setBaselineFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [submitEnabled, setSubmitEnabled] = useState(false);

  const steps = ["Basic Information", "LLM Selection", "Upload Test Data"];
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setBaselineFile(file);
    setIsLoading(true);
    setSubmitEnabled(false);

    // Simulate a delay of 5 seconds before enabling the submit button
    setTimeout(() => {
      setIsLoading(false);
      setSubmitEnabled(true);
    }, 5000);
  };

  const TogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleNextStep = async () => {
    if (step === 1) {
      setIsLoading(true);
      let intervalId;

      intervalId = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress >= 100) {
            clearInterval(intervalId);
            setIsLoading(false);
            setStep((prevStep) => prevStep + 1);
            return 100;
          }
          const diff = Math.random() * 10;
          return Math.min(oldProgress + diff, 100);
        });
      }, 500);
    } else if (step === 2) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        navigate("/Login");
      }, 3000); // Simulate 3 seconds of loading
    } else {
      setStep((prevStep) => prevStep + 1);
    }
  };

  const handlePreviousStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Log the state data to debug
    console.log("Form Data:");
    console.log("UserName:", userName);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("LLM Option:", llmOption);
    console.log("Baseline File:", baselineFile);

    try {
      const formData = new FormData();
      formData.append("userName", userName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("llmOption", llmOption);
      if (baselineFile) formData.append("baselineFile", baselineFile);

      // Log FormData for debugging
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

      const response = await axios.post(
        "http://localhost:3200/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        alert("Registered successfully");
        setTimeout(() => {
          navigate("/Login");
        }, 3000);
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.error || "Unable to register");
      } else if (error.request) {
        alert("Network error. Please try again.");
      } else {
        alert("An error occurred. Please try again.");
      }
    }
  };

  const isBasicInfoValid = () => {
    return userName && email && password;
  };

  const isAdditionalInfoValid = () => {
    return llmOption;
  };

  const testData = () => {
    return baselineFile;
  };
  const isNextButtonDisabled = () => {
    if (step === 0) {
      return !isBasicInfoValid();
    }
    if (step === 1) {
      return !isAdditionalInfoValid();
    }
    if (step === 2) {
      return testData();
    }
    return false;
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container
        component="main"
        maxWidth="s"
        width="400px"
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
          <Stepper activeStep={step} sx={{ mb: 3 }} style={{ color: "#fff" }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel sx={{ color: "#fff" }}>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Typography
            component="h1"
            variant="h5"
            sx={{ color: "#fff" }}
            style={{ color: "#fff" }}
          >
            {step === 0 ? "Sign Up" : "Additional Information"}
          </Typography>

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3, width: "100%" }}
          >
            {step === 0 && (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    name="Name"
                    required
                    fullWidth
                    id="Name"
                    autoComplete="current-Name"
                    label="Company Name"
                    autoFocus
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "#fff" },
                        "&:hover fieldset": { borderColor: "#fff" },
                        "&.Mui-focused fieldset": { borderColor: "#fff" },
                      },
                      "& .MuiInputLabel-root": {
                        color: "#fff",
                        "&.Mui-focused": { color: "#fff" },
                      },
                      "& .MuiInputBase-input": {
                        color: "#fff",
                        "&:-webkit-autofill": {
                          WebkitBoxShadow: "0 0 0 1000px #252a40 inset",
                          WebkitTextFillColor: "#fff",
                        },
                        "&:-webkit-autofill::first-line": {
                          color: "#fff",
                        },
                      },
                      "& .MuiOutlinedInput-input::placeholder": {
                        color: "#fff",
                      },
                      "& .MuiFormHelperText-root": { color: "#fff" },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="current-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "#fff" },
                        "&:hover fieldset": { borderColor: "#fff" },
                        "&.Mui-focused fieldset": { borderColor: "#fff" },
                      },
                      "& .MuiInputLabel-root": {
                        color: "#fff",
                        "&.Mui-focused": { color: "#fff" },
                      },
                      "& .MuiInputBase-input": {
                        color: "#fff",
                        "&:-webkit-autofill": {
                          WebkitBoxShadow: "0 0 0 1000px #252a40 inset",
                          WebkitTextFillColor: "#fff",
                        },
                        "&:-webkit-autofill::first-line": {
                          color: "#fff",
                        },
                      },
                      "& .MuiOutlinedInput-input::placeholder": {
                        color: "#fff",
                      },
                      "& .MuiFormHelperText-root": { color: "#fff" },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "#fff" },
                        "&:hover fieldset": { borderColor: "#fff" },
                        "&.Mui-focused fieldset": { borderColor: "#fff" },
                      },
                      "& .MuiInputLabel-root": {
                        color: "#fff",
                        "&.Mui-focused": { color: "#fff" },
                      },
                      "& .MuiInputBase-input": {
                        color: "#fff",
                        "&:-webkit-autofill": {
                          WebkitBoxShadow: "0 0 0 1000px #252a40 inset",
                          WebkitTextFillColor: "#fff",
                        },
                        "&:-webkit-autofill::first-line": {
                          color: "#fff",
                        },
                      },
                      "& .MuiOutlinedInput-input::placeholder": {
                        color: "#fff",
                      },
                      "& .MuiFormHelperText-root": { color: "#fff" },
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={TogglePassword}
                            edge="end"
                            sx={{ color: "#fff" }}
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            )}
            {step === 1 && (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    select
                    fullWidth
                    label="Select LLM Option"
                    value={llmOption}
                    onChange={(e) => setLlmOption(e.target.value)}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "#fff" },
                        "&:hover fieldset": { borderColor: "#fff" },
                        "&.Mui-focused fieldset": { borderColor: "#fff" },
                      },
                      "& .MuiInputLabel-root": {
                        color: "#fff",
                        "&.Mui-focused": { color: "#fff" },
                      },
                      "& .MuiInputBase-input": {
                        color: "#fff",
                      },
                    }}
                  >
                    <MenuItem value="option1">LLM 1</MenuItem>
                    <MenuItem value="option2">LLM 2</MenuItem>
                    <MenuItem value="option3">LLM 3</MenuItem>
                  </TextField>
                </Grid>
                {llmOption && isLoading && (
                  <Grid item xs={12} style={{ marginTop: "2rem" }}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="body1" sx={{ color: "#fff", mb: 2 }}>
                        Establishing baseline...
                      </Typography>
                      {/* New ProgressBar */}
                      <ProgressBar intervalTime={500} resetTime={2000} />
                      <img
                        src={Loader}
                        alt="Loading..."
                        style={{
                          width: "50px",
                          height: "50px",
                          marginTop: "1rem",
                        }}
                      />
                    </Box>
                  </Grid>
                )}

                <Grid item xs={12}>
                  <Button
                    fullWidth
                    onClick={handleNextStep}
                    disabled={isNextButtonDisabled()}
                    sx={{
                      mt: 3,
                      mb: 2,
                      background:
                        "linear-gradient(90deg, #7f00ff 0%, #e100ff 100%)",
                      color: "white",
                      "&:hover": {
                        background:
                          "linear-gradient(90deg, #6a00ff 0%, #d100ff 100%)",
                      },
                      borderRadius: "8px",
                    }}
                  >
                    Next
                  </Button>
                  <Button
                    fullWidth
                    onClick={handlePreviousStep}
                    sx={{
                      mb: 2,
                      background:
                        "linear-gradient(90deg, #7f00ff 0%, #e100ff 100%)",
                      color: "white",
                      "&:hover": {
                        background:
                          "linear-gradient(90deg, #6a00ff 0%, #d100ff 100%)",
                      },
                      borderRadius: "8px",
                    }}
                  >
                    Back
                  </Button>
                </Grid>
              </Grid>
            )}

            {step === 2 && (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Upload Test Data"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      startAdornment: !baselineFile && (
                        <InputAdornment position="start">
                          <Button
                            component="label"
                            sx={{
                              padding: "0 1rem",
                              background: "#7f00ff",
                              color: "white",
                              borderRadius: "8px",
                              "&:hover": {
                                background: "#6a00ff",
                              },
                            }}
                          >
                            Upload
                            <input
                              type="file"
                              hidden
                              onChange={(e) => handleFileUpload(e)}
                            />
                          </Button>
                        </InputAdornment>
                      ),
                      readOnly: true,
                      endAdornment: baselineFile && (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="remove file"
                            onClick={() => setBaselineFile(null)}
                            sx={{ color: "#fff" }}
                          >
                            ✖
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    value={baselineFile ? baselineFile.name : ""}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "#fff" },
                        "&:hover fieldset": { borderColor: "#fff" },
                        "&.Mui-focused fieldset": { borderColor: "#fff" },
                      },
                      "& .MuiInputLabel-root": {
                        color: "#fff",
                        "&.Mui-focused": { color: "#fff" },
                      },
                      "& .MuiInputBase-input": {
                        color: "#fff",
                      },
                    }}
                  />
                </Grid>

                {baselineFile && isLoading && (
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        mt: 3,
                      }}
                    >
                      <Typography
                        variant="body1"
                        sx={{ color: "#fff", mt: 2, fontSize: "16px" }}
                      >
                        Processing test data...
                      </Typography>
                      <img
                        src={Loader}
                        alt="Processing..."
                        style={{
                          width: "50px",
                          height: "50px",
                          marginLeft: "10px",
                        }}
                      />
                    </Box>
                  </Grid>
                )}

                <Grid item xs={12}>
                  <Button
                    fullWidth
                    onClick={handlePreviousStep}
                    sx={{
                      mt: 3,
                      mb: 2,
                      background:
                        "linear-gradient(90deg, #7f00ff 0%, #e100ff 100%)",
                      color: "white",
                      "&:hover": {
                        background:
                          "linear-gradient(90deg, #6a00ff 0%, #d100ff 100%)",
                      },
                      borderRadius: "8px",
                    }}
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    fullWidth
                    disabled={!submitEnabled} // Disable the submit button initially
                    sx={{
                      mb: 2,
                      background:
                        "linear-gradient(90deg, #7f00ff 0%, #e100ff 100%)",
                      color: "white",
                      "&:hover": {
                        background:
                          "linear-gradient(90deg, #6a00ff 0%, #d100ff 100%)",
                      },
                      borderRadius: "8px",
                    }}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            )}

            <Box mt={3}>
              {step === 0 && (
                <Button
                  type="button"
                  fullWidth
                  onClick={handleNextStep}
                  disabled={isNextButtonDisabled()}
                  sx={{
                    mt: 3,
                    mb: 2,
                    background:
                      "linear-gradient(90deg, #7f00ff 0%, #e100ff 100%)",
                    color: "white",
                    "&:hover": {
                      background:
                        "linear-gradient(90deg, #6a00ff 0%, #d100ff 100%)",
                    },
                    borderRadius: "8px",
                  }}
                >
                  Next
                </Button>
              )}

              <Link
                to="/Login"
                variant="body2"
                style={{ color: "#fff", textDecoration: "none" }}
              >
                {"Already have an account? Sign in"}
              </Link>
            </Box>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
