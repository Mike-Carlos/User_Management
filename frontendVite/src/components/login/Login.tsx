/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
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
import './login.css';
import Logo from '../../assets/logo.png'
import { useDispatch } from "react-redux";
import { useState } from "react";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import {  IconButton, Toolbar, useMediaQuery } from "@mui/material";
import './login.css';
import { RootState } from "../../redux/store/store";
import { useSelector } from "react-redux";
import { clearError } from "../../redux/state/userState";
import { login } from "../../redux/saga/sessionSaga";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useNavigate } from 'react-router-dom';


// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Login() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [errorIcon, setErrorIcon] = useState<JSX.Element>();
  const [helperText, setHelperText] = useState("");

  const errorMessage = useSelector((state: RootState) => state.sessionReducer.error);
  const [error, setErrorMessage] = React.useState<string | undefined>("");

  const navigate = useNavigate();

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(login({ username, password }));
    dispatch(clearError());
  };

  

  return (

 
    <ThemeProvider theme={defaultTheme}>
       
      <Container component="main" maxWidth="xs"
      sx={{
        display:"flex",
        marginTop:"15vh",
        marginLeft: { xs: 0, sm: "100vh" }, // Adjust the margin for different screen sizes
    "@media (max-width: 600px)": { // Media query for small screens (xs)
      marginLeft: 0, // Reset margin for extra small screens
    }
      }} >
        
        <CssBaseline />
       
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Card variant="outlined"  >
          
            {" "}
            {/* Added Card component with outlined variant */}
            <CardContent
              sx={{
                background: "white",
                width: "60vh",
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
