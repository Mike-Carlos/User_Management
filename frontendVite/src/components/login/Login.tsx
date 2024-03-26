/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Logo from '../../assets/logo.png';
import { useDispatch } from "react-redux";
import { useState } from "react";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import {  IconButton, Toolbar, useMediaQuery } from "@mui/material";
import { RootState } from "../../redux/store/store";
import { useSelector } from "react-redux";
import { clearError } from "../../redux/state/userState";
import { login } from "../../redux/saga/sessionSaga";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useNavigate } from 'react-router-dom';
import logoBlue from './../../assets/logoBlue.png';


const defaultTheme = createTheme();

export default function Login() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [errorIcon, setErrorIcon] = useState<JSX.Element>();
  const [helperText, setHelperText] = useState("");
  const [error, setError] = useState<string | any>(); // State for error message

  const errorMessage = useSelector((state: RootState) => state.sessionReducer.error);

  const navigate = useNavigate();

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
  
    dispatch(login({ username, password }));
    dispatch(clearError());
  };

  // Update the error state when errorMessage changes
  React.useEffect(() => {
    return setError(errorMessage);
  }, [errorMessage]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs"
      sx={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center", // Center items horizontally
    justifyContent: "center", // Center items vertically
    height: "80vh", // Set height to full viewport height
  }}>
        <CssBaseline />
        <img src={logoBlue} alt="" 
        style={{height: "110px",
        width: "400px",
        marginBottom: 30
      }}
        />
        <Box
          sx={{
            opacity: 0.9,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
   
          }}
        >
          <Card variant="outlined" sx={{
            background:"#25476A"
          }}>
            {" "}
            <CardContent
              sx={{
                background: "#FAF9F6",
                width: "40vh",
                height: "50vh",
                marginTop: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginLeft: "auto"
              }} 
            >
              <Avatar sx={{ m: 2, bgcolor: "#25476A" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in 
              </Typography>
              <Box
                component="form"
                onSubmit={handleLogin}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Enter Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  error={!isValid}
                  InputProps={{
                    endAdornment: errorIcon,
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={!isValid}
                  InputProps={{
                    endAdornment: errorIcon,
                  }}
                />
                {error && (
                  <Typography variant="body2" color="error">
                    {error}
                  </Typography>
                )}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 ,background:"#25476A"}}
                >
                  <Typography color="white">Sign In</Typography>
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
